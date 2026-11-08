import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";
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
    EMAIL:{send:async(message)=>{sent.push(message);return {messageId:"test-message"}}},
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
  assert.equal(out.sent.length,1);
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
