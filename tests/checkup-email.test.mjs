import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";
import {readFileSync} from "node:fs";
import { ROAD_CHECKUP_PROFILES, ROAD_CHECKUP_AREA_ORDER } from "../src/checkup-profiles.js";

function answers(value="sim",profile="familiar") {
  const conf=ROAD_CHECKUP_PROFILES[profile];
  return Object.fromEntries(ROAD_CHECKUP_AREA_ORDER.flatMap(area=>
    conf.areas[area].questions.map((_,i)=>[area+"-"+i,value])));
}
const validPayload=(profile="familiar")=>({
  email:"teste@example.com",consent:true,profile,answers:answers("sim",profile),turnstileToken:"mock-token"
});
const makeRequest=(payload,origin="https://roadwealth.com.br")=>
  new Request("https://roadwealth.com.br/api/checkup-email",{
    method:"POST",headers:{"Origin":origin,"Content-Type":"application/json"},body:JSON.stringify(payload)
  });
async function exercise(payload,opts={}){
  const oldFetch=globalThis.fetch;
  const sent=[];
  globalThis.fetch=async()=>new Response(JSON.stringify({
    success:opts.turnstileSuccess!==false,
    hostname:opts.hostname||"roadwealth.com.br",
    action:opts.action||"road_checkup_email"
  }),{headers:{"Content-Type":"application/json"}});
  const env={
    EMAIL:{send:async(message)=>{sent.push(message);if ((opts.failCustomer && sent.length === 1) || (opts.failInternal && message.to === "contato@roadwealth.com.br")) throw Object.assign(new Error("Simulated send failure"),{code:"TEST_FAILURE"});return {messageId:"test-message"}}},
    TURNSTILE_SECRET_KEY:"test-secret",TURNSTILE_SITE_KEY:"test-sitekey",
    CHECKUP_EMAIL_RATE_LIMIT:{limit:async()=>({success:opts.allowRate!==false})}
  };
  try{
    const response=await worker.fetch(makeRequest(payload,opts.origin),env);
    return {status:response.status,body:await response.json(),sent};
  } finally{globalThis.fetch=oldFetch;}
}
test("PF: envia o resumo com áreas e perfil corretos",async()=>{
  const out=await exercise(validPayload());
  assert.equal(out.status,202);
  assert.equal(out.sent.length,2);
  const msg=out.sent[0];
  assert.equal(msg.to,"teste@example.com");
  assert.match(msg.text,/Investimentos: Bem estruturado/);
  assert.match(msg.text,/Capital: Bem estruturado/);
  assert.match(msg.text,/Planejamento: Bem estruturado/);
  assert.match(msg.text,/Patrimonial \/ Familiar/);
  assert.match(msg.html,/Percurso: Patrimonial \/ Familiar/);
  assert.doesNotMatch(msg.text,/Estratégia:|Decisões:/);
  assert.doesNotMatch(msg.text,/mock-token/);
});
test("ROAD recebe o mesmo diagnóstico completo, com o PDF e identificação",async()=>{
  const payload={...validPayload(),name:"Ana Ribeiro",phone:"(42) 99999-9999",contactConsent:false,marketingConsent:false};
  const out=await exercise(payload);
  assert.equal(out.status,202);
  assert.equal(out.sent.length,2,"Um e-mail para o visitante e uma cópia interna");
  const [customer, internal]=out.sent;
  assert.equal(customer.to,"teste@example.com");
  assert.equal(internal.to,"contato@roadwealth.com.br");
  assert.match(internal.subject,/Diagnóstico completo.*Patrimonial \/ Familiar.*teste@example.com/);
  assert.match(internal.text,/Ana Ribeiro/);
  assert.match(internal.text,/\(42\) 99999-9999/);
  assert.match(internal.text,/Contato sobre o resultado: NÃO/);
  assert.match(internal.text,/Comunicações gerais: NÃO/);
  assert(internal.text.includes(customer.text),"Relatório textual deve estar completo");
  assert(internal.html.includes("Seu mapa patrimonial"));
  assert(internal.html.includes("Ana Ribeiro"));
  assert(internal.html.includes("Diagnóstico completo"));
  assert(internal.html.includes("Converse com a ROAD") || internal.html.includes("Conversar com a ROAD"));
  assert.equal(customer.attachments.length,1);
  assert.equal(internal.attachments.length,1);
  assert.equal(internal.attachments[0].filename,customer.attachments[0].filename);
  assert.deepEqual(internal.attachments[0].content, customer.attachments[0].content);
  assert.equal(internal.attachments[0].type,"application/pdf");
});
test("Não envia cópia interna se o envio ao cliente falhar",async()=>{
  const out=await exercise(validPayload(),{failCustomer:true});
  assert.equal(out.status,503);
  assert.equal(out.sent.length,1);
  assert.equal(out.sent[0].to,"teste@example.com");
});
test("Falha na cópia interna não altera sucesso do cliente nem provoca reenvio",async()=>{
  const out=await exercise(validPayload(),{failInternal:true});
  assert.equal(out.status,202);
  assert.equal(out.sent.length,2);
  assert.equal(out.sent[0].to,"teste@example.com");
});
test("Sem aceite de contato ou marketing, o diagnóstico ainda chega à ROAD",async()=>{
  const out=await exercise({...validPayload("empresarial"),contactConsent:false,marketingConsent:false});
  assert.equal(out.status,202);
  assert.equal(out.sent[1].to,"contato@roadwealth.com.br");
  assert.match(out.sent[1].subject,/Empresarial \/ Agro/);
  assert.match(out.sent[1].text,/Comunicações gerais: NÃO/);
});
test("Política e formulário informam claramente que ROAD recebe cópia",()=>{
  const path=new URL("../src/pages/patrimonio.astro",import.meta.url);
  const policy=new URL("../src/pages/privacidade.astro",import.meta.url);
  const form=readFileSync(path,"utf8");
  const privacy=readFileSync(policy,"utf8");
  assert.match(form,/ROAD também receberá uma cópia do diagnóstico/);
  assert.doesNotMatch(form,/enviado exclusivamente/);
  assert.match(privacy,/cópia integral do mesmo diagnóstico e PDF/);
  assert.match(privacy,/Receber o resultado não autoriza/);
  assert.match(privacy,/sem cópia de valores fiscais/);
});
test("Empresarial / Agro: envia seu próprio perfil",async()=>{
  const out=await exercise(validPayload("empresarial"));
  assert.equal(out.status,202);
  assert.match(out.sent[0].text,/PERCURSO: Empresarial \/ Agro/);
  assert.match(out.sent[0].html,/Planejamento/);
});
test("sem autorização expressa não envia",async()=>{
  const out=await exercise({...validPayload(),consent:false});
  assert.equal(out.status,400);assert.equal(out.sent.length,0);
});
test("respostas incompletas e misturadas não são aceitas",async()=>{
  const partial=await exercise({...validPayload(),answers:{"investments-0":"sim"}});
  assert.equal(partial.status,400);
  const bad=await exercise({...validPayload(),profile:"empresarial"});
  assert.equal(bad.status,400);
  const invalid=await exercise({...validPayload(),profile:"outro"});
  assert.equal(invalid.status,400);
});
test("origem não autorizada é recusada",async()=>{
  const out=await exercise(validPayload(),{origin:"https://desconhecido.example"});
  assert.equal(out.status,403);
});
test("email inválido é recusado",async()=>{
  const out=await exercise({...validPayload(),email:"nome\r\nbcc:invalido@example.com"});
  assert.equal(out.status,400);
});
test("falha no Turnstile impede envio",async()=>{
  assert.equal((await exercise(validPayload(),{turnstileSuccess:false})).status,403);
  assert.equal((await exercise(validPayload(),{action:"another_action"})).status,403);
  assert.equal((await exercise(validPayload(),{hostname:"outro.example"})).status,403);
});
test("rate limit impede envio repetido",async()=>{
  const out=await exercise(validPayload(),{allowRate:false});
  assert.equal(out.status,429);
  assert.equal(out.sent.length,0);
});
test("pontuações seguem as faixas nos dois percursos",async()=>{
  for(const profile of ["familiar","empresarial"]){
    const out=await exercise({...validPayload(profile),answers:answers("parcial",profile)});
    assert.equal(out.status,202);
    assert.match(out.sent[0].text,/Investimentos: Em desenvolvimento/);
    assert.match(out.sent[0].text,/Legado: Em desenvolvimento/);
  }
});
test("endpoint de configuração expõe apenas a chave pública",async()=>{
  const response=await worker.fetch(new Request("https://roadwealth.com.br/api/checkup-config"),{
    EMAIL:{},TURNSTILE_SITE_KEY:"key_public",TURNSTILE_SECRET_KEY:"key_secret"
  });
  assert.equal(response.status,200);
  const body=await response.json();
  assert.deepEqual(body,{enabled:true,siteKey:"key_public"});
  assert.doesNotMatch(JSON.stringify(body),/key_secret/);
});
