import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";

function answers(value="sim") {
  const areas=["investments","legacy","strategy","decisions"];
  return Object.fromEntries(areas.flatMap(area=>
    Array.from({length:4},(_,i)=>[area+"-"+i,value])));
}
const validPayload=()=>({
  email:"teste@example.com",
  consent:true,
  answers:answers(),
  turnstileToken:"mock-token",
});
const makeRequest=(payload,origin="https://roadwealth.com.br")=>
  new Request("https://roadwealth.com.br/api/checkup-email",{
    method:"POST",
    headers:{"Origin":origin,"Content-Type":"application/json"},
    body:JSON.stringify(payload),
  });

async function exercise(payload,opts={}){
  const oldFetch=globalThis.fetch;
  const sent=[];
  globalThis.fetch=async()=>new Response(JSON.stringify({
    success:opts.turnstileSuccess!==false,
    hostname:opts.hostname||"roadwealth.com.br",
    action:opts.action||"road_checkup_email",
  }),{headers:{"Content-Type":"application/json"}});
  const env={
    EMAIL:{send:async(message)=>{sent.push(message);return {messageId:"test-message"}}},
    TURNSTILE_SECRET_KEY:"test-secret",
    TURNSTILE_SITE_KEY:"test-sitekey",
    CHECKUP_EMAIL_RATE_LIMIT:{limit:async()=>({success:opts.allowRate!==false})},
  };
  try{
    const response=await worker.fetch(makeRequest(payload,opts.origin),env);
    return {status:response.status,body:await response.json(),sent};
  } finally{
    globalThis.fetch=oldFetch;
  }
}

test("envio válido aceita solicitação e envia somente resumo",async()=>{
  const out=await exercise(validPayload());
  assert.equal(out.status,202);
  assert.equal(out.sent.length,1);
  assert.equal(out.sent[0].to,"teste@example.com");
  assert.match(out.sent[0].text,/Investimentos: Bem estruturado/);
  assert.match(out.sent[0].text,/Decisões: Bem estruturado/);
  assert.doesNotMatch(out.sent[0].text,/mock-token/);
});
test("sem autorização expressa não envia",async()=>{
  const out=await exercise({...validPayload(),consent:false});
  assert.equal(out.status,400);
  assert.equal(out.sent.length,0);
});
test("respostas incompletas são recusadas",async()=>{
  const out=await exercise({...validPayload(),answers:{"investments-0":"sim"}});
  assert.equal(out.status,400);
});
test("origem não autorizada é recusada",async()=>{
  const out=await exercise(validPayload(),{origin:"https://desconhecido.example"});
  assert.equal(out.status,403);
});
test("email inválido é recusado",async()=>{
  const out=await exercise({...validPayload(),email:"nome\r\nbcc:invalido@example.com"});
  assert.equal(out.status,400);
});
test("falha na verificação Turnstile bloqueia envio",async()=>{
  const out=await exercise(validPayload(),{turnstileSuccess:false});
  assert.equal(out.status,403);
});
test("ação de Turnstile diferente é recusada",async()=>{
  const out=await exercise(validPayload(),{action:"another_action"});
  assert.equal(out.status,403);
});
test("hostname inválido na verificação é recusado",async()=>{
  const out=await exercise(validPayload(),{hostname:"outro.example"});
  assert.equal(out.status,403);
});
test("rate limit impede envio repetido",async()=>{
  const out=await exercise(validPayload(),{allowRate:false});
  assert.equal(out.status,429);
  assert.equal(out.sent.length,0);
});
test("pontuações seguem as faixas definidas no Check-up",async()=>{
  const out=await exercise({...validPayload(),answers:answers("parcial")});
  assert.equal(out.status,202);
  assert.match(out.sent[0].text,/Investimentos: Em desenvolvimento/);
  assert.match(out.sent[0].text,/Legado: Em desenvolvimento/);
});
test("endpoint de configuração expõe apenas chave pública",async()=>{
  const response=await worker.fetch(new Request("https://roadwealth.com.br/api/checkup-config"),{
    EMAIL:{},TURNSTILE_SITE_KEY:"key_public",TURNSTILE_SECRET_KEY:"key_secret"
  });
  assert.equal(response.status,200);
  const body=await response.json();
  assert.deepEqual(body,{enabled:true,siteKey:"key_public"});
  assert.doesNotMatch(JSON.stringify(body),/key_secret/);
});
