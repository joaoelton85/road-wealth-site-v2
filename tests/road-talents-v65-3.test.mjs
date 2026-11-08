import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Script} from "node:vm";
import worker from "../src/worker.js";
import {
  parseTalentSubmission,talentInternalEmail,talentAcknowledgementEmail,saveTalent
} from "../src/road-talents.js";

const valid={
  name:"Ana Souza",
  email:"ANA@EXAMPLE.COM",
  phone:"(42) 99999-8888",
  linkedIn:"https://www.linkedin.com/in/ana-souza/",
  marketExperience:"sim",
  clientPortfolio:"sim",
  custodyRange:"de_20_a_50",
  interestArea:"investimentos",
  story:"Atuo no relacionamento com investidores e quero conhecer a ROAD.",
  consent:true,
  turnstileToken:"mock-token"
};

async function exercise(payload=valid,opts={}){
  const priorFetch=globalThis.fetch;
  const mail=[],dbCalls=[],persist=[];
  globalThis.fetch=async()=>new Response(JSON.stringify({
    success:opts.turnstile!==false,
    hostname:opts.hostname||"roadwealth.com.br",
    action:opts.action||"road_talent_apply"
  }),{headers:{"Content-Type":"application/json"}});
  const db={prepare(sql){return{bind(...params){return{
    async run(){dbCalls.push({sql,params});return{success:true};},
    async first(){return{id:"candidate-test"};}
  };}}}};
  const env={
    EMAIL:{send:async msg=>{
      if(opts.internalFailure && msg.to==="contato@roadwealth.com.br")throw Object.assign(new Error("failed"),{code:"TEST_INTERNAL"});
      if(opts.ackFailure && msg.to!=="contato@roadwealth.com.br")throw Object.assign(new Error("failed"),{code:"TEST_ACK"});
      mail.push(msg);return{messageId:"ok"};
    }},
    TURNSTILE_SECRET_KEY:"secret",TURNSTILE_SITE_KEY:"public",
    CHECKUP_EMAIL_RATE_LIMIT:{limit:async()=>({success:opts.allowRate!==false})},
    ...(opts.db===true?{TALENTS_DB:db}:{})
  };
  const request=new Request("https://roadwealth.com.br/api/talent-apply",{
    method:"POST",
    headers:{"Origin":opts.origin||"https://roadwealth.com.br","Content-Type":"application/json"},
    body:JSON.stringify(payload)
  });
  try{
    const response=await worker.fetch(request,env,{waitUntil:p=>persist.push(p)});
    await Promise.all(persist);
    return {status:response.status,data:await response.json(),mail,dbCalls};
  } finally{
    globalThis.fetch=priorFetch;
  }
}

test("valida campos obrigatórios, normaliza email, guarda opt-in profissional específico",()=>{
  const talent=parseTalentSubmission(valid);
  assert.ok(talent);
  assert.equal(talent.email,"ana@example.com");
  assert.equal(talent.interestArea,"investimentos");
  assert.equal(talent.consent,true);
  assert.equal(parseTalentSubmission({...valid,consent:false}),null);
  assert.equal(parseTalentSubmission({...valid,phone:"000"}),null);
  assert.equal(parseTalentSubmission({...valid,story:"Curto"}),null);
  assert.equal(parseTalentSubmission({...valid,linkedIn:"https://linkedin.com.evil.invalid/in/ana"}),null);
  assert.equal(parseTalentSubmission({...valid,linkedIn:"http://www.linkedin.com/in/ana"}),null);
  assert.equal(parseTalentSubmission({...valid,interestArea:"__proto__"}),null);
  assert.equal(parseTalentSubmission({...valid,clientPortfolio:"nao",custodyRange:"de_50_a_100"}),null);
  assert.ok(parseTalentSubmission({...valid,clientPortfolio:"nao",custodyRange:"nao_se_aplica",linkedIn:""}));
});
test("entrega primeiro a ROAD e depois confirma ao profissional com a marca oficial",async()=>{
  const out=await exercise();
  assert.equal(out.status,202);
  assert.equal(out.mail.length,2);
  assert.equal(out.mail[0].to,"contato@roadwealth.com.br");
  assert.equal(out.mail[0].replyTo,"ana@example.com");
  assert.match(out.mail[0].text,/R\$ 20 a 50 milhões/);
  assert.match(out.mail[0].text,/Investimentos/);
  assert.equal(out.mail[1].to,"ana@example.com");
  assert.match(out.mail[1].subject,/Recebemos sua apresentação/);
  assert.match(out.mail[1].html,/road-logo-cafe-email.png/);
  assert.match(out.data.message,/Enviamos uma confirmação/);
});
test("não anuncia recebimento se o envio interno falhou",async()=>{
  const out=await exercise(valid,{internalFailure:true});
  assert.equal(out.status,503);
  assert.equal(out.mail.length,0);
  assert.match(out.data.error,/Não foi possível receber/);
});
test("inscrição recebida mesmo quando falha confirmação secundária",async()=>{
  const out=await exercise(valid,{ackFailure:true});
  assert.equal(out.status,202);
  assert.equal(out.mail.length,1);
  assert.match(out.data.message,/não pôde ser enviada/);
});
test("separa banco de talentos do LEADS_DB e registra sem apagar status",async()=>{
  const out=await exercise(valid,{db:true});
  assert.equal(out.status,202);
  assert.equal(out.dbCalls.length,2);
  assert.match(out.dbCalls[0].sql,/INSERT INTO road_talent_candidates/);
  assert.match(out.dbCalls[0].sql,/ON CONFLICT\(email\) DO UPDATE/);
  assert.doesNotMatch(out.dbCalls[0].sql,/\bstatus=excluded/);
  assert.match(out.dbCalls[1].sql,/road_talent_events/);
  assert.ok(out.dbCalls[0].params.includes("ana@example.com"));
  assert.ok(out.dbCalls[0].params.includes(valid.story));
});
test("sem TALENTS_DB a apresentação é acolhida por e-mail sem alegar persistência",async()=>{
  const out=await exercise();
  assert.equal(out.status,202);
  assert.equal(out.dbCalls.length,0);
  assert.equal(out.mail[0].to,"contato@roadwealth.com.br");
  assert.equal(await saveTalent({},parseTalentSubmission(valid)),false);
});
test("segurança: Turnstile, rate-limit, origem, consentimento e corpo validados",async()=>{
  assert.equal((await exercise(valid,{turnstile:false})).status,403);
  assert.equal((await exercise(valid,{action:"road_checkup_email"})).status,403);
  assert.equal((await exercise(valid,{hostname:"dominio.example"})).status,403);
  assert.equal((await exercise(valid,{allowRate:false})).status,429);
  assert.equal((await exercise(valid,{origin:"https://example.com"})).status,403);
  assert.equal((await exercise({...valid,consent:false})).status,400);
  assert.equal((await exercise({...valid,story:"a".repeat(9000)})).status,413);
});
test("mensagem externa escapa HTML fornecido pelo visitante",()=>{
  const talent=parseTalentSubmission({...valid,name:"Ana <script>alert(1)</script>"});
  assert.ok(talent);
  const mail=talentAcknowledgementEmail(talent);
  assert.doesNotMatch(mail.html,/<script>alert/);
  assert.match(mail.html,/&lt;script&gt;/);
  assert.match(talentInternalEmail(talent).text,/FAÇA PARTE/);
});
test("endpoints de configuração e caminho desconhecido não expõem dados",async()=>{
  const env={EMAIL:{},TURNSTILE_SITE_KEY:"site",TURNSTILE_SECRET_KEY:"secret",CHECKUP_EMAIL_RATE_LIMIT:{}};
  const out=await worker.fetch(new Request("https://roadwealth.com.br/api/talents-config"),env);
  assert.equal(out.status,200);
  assert.deepEqual(await out.json(),{enabled:true,siteKey:"site"});
});
test("formulário e script inline são válidos e não interrompem o preenchimento",()=>{
  const page=readFileSync(new URL("../src/pages/a-road.astro",import.meta.url),"utf8");
  const start=page.indexOf("<script is:inline>");
  const end=page.indexOf("</script>",start);
  assert.ok(start>=0 && end>start);
  assert.doesNotThrow(()=>new Script(page.slice(start+"<script is:inline>".length,end)));
  assert.match(page,/id="road-career-form"/);
  assert.match(page,/id="road-career-turnstile"/);
  assert.match(page,/id="road-career-submit" type="submit"/);
  assert.match(page,/order\[active\]==='faca-parte'/);
  assert.doesNotMatch(page,/class="btn primary js-placeholder"/);
});
