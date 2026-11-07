import test from "node:test";
import assert from "node:assert/strict";
import { evaluateCheckup, ROAD_AREAS, ROAD_TAGLINE } from "../src/checkup-report.js";
import worker from "../src/worker.js";

function answers(value) {
  return Object.fromEntries(ROAD_AREAS.flatMap(area =>
    Array.from({length:4},(_,i)=>[area.key+"-"+i,value])));
}

test("Sim/Parcialmente/Não/Não sei recebem 3/2/1/0 e classificações previstas",()=>{
  for(const [answer,score,label] of [
    ["sim",12,"Bem estruturado"],
    ["parcial",8,"Em desenvolvimento"],
    ["nao",4,"Merece atenção"],
    ["naosei",0,"Merece atenção"]
  ]){
    const result=evaluateCheckup(answers(answer));
    assert.equal(result.areas.length,4);
    assert.equal(result.areas[0].label,"Investimentos");
    assert.equal(result.areas[0].points,score);
    assert.equal(result.areas[0].statusLabel,label);
    assert.equal(result.areas[0].percentage,score/12*100===100?100:Math.round(score/12*10000)/100);
    assert.equal(result.priorities.length,2);
  }
});
test("intervalos de classificação não deixam lacunas",()=>{
  for(let score=0;score<=12;score++){
    const raw=answers("naosei");
    for(let i=0;i<4;i++){raw["investments-"+i]=i<Math.floor(score/3)?"sim":"naosei";}
    const report=evaluateCheckup(raw);
    assert(report);
  }
});
test("lacuna de conhecimento gera recomendação de verificação, não presume ausência",()=>{
  const r=evaluateCheckup(answers("naosei"));
  assert.equal(r.limited,true);
  assert.match(r.priorities[0].title,/simples/);
});
test("se nenhuma lacuna declarada, recomenda manutenção e revisão",()=>{
  const r=evaluateCheckup(answers("sim"));
  assert.equal(r.priorities.length,2);
  assert.match(r.priorities[0].title,/estrutura coerente/);
});
test("16 respostas são obrigatórias e não permitem valores arbitrários",()=>{
  const raw=answers("sim");raw["legacy-2"]="talvez";
  assert.equal(evaluateCheckup(raw),null);
  delete raw["legacy-2"];
  assert.equal(evaluateCheckup(raw),null);
});
test("Worker envia resultado HTML com mapa, assinatura e links oficiais",async()=>{
  const fetchPrevious=globalThis.fetch;
  const sent=[];
  globalThis.fetch=async()=>new Response(JSON.stringify({
    success:true, hostname:"roadwealth.com.br", action:"road_checkup_email"
  }),{headers:{"Content-Type":"application/json"}});
  try{
    const request=new Request("https://roadwealth.com.br/api/checkup-email",{
      method:"POST",headers:{"Origin":"https://roadwealth.com.br","Content-Type":"application/json"},
      body:JSON.stringify({email:"prospect@example.com",consent:true,answers:answers("parcial"),turnstileToken:"token-teste"})
    });
    const env={
      TURNSTILE_SECRET_KEY:"segredo-teste",
      EMAIL:{send:async (message)=>{sent.push(message);return {messageId:"mock"}}},
      CHECKUP_EMAIL_RATE_LIMIT:{limit:async()=>({success:true})},
    };
    const response=await worker.fetch(request,env);
    assert.equal(response.status,202);
    assert.equal(sent.length,1);
    const msg=sent[0];
    assert.match(msg.html,/Seu mapa patrimonial/);
    assert.match(msg.html,/SITUAÇÃO ATUAL/);
    assert.match(msg.html,/checkup-bar-8\.png/);
    assert.match(msg.html,/assets\/road-logo-cafe-email.png/);
    assert.match(msg.html,/Instagram @road\.wealth/);
    assert.match(msg.html,/Montserrat,Arial/);
    assert.match(msg.text,/Legado: Em desenvolvimento/);
    assert.match(msg.text,/SUA ANÁLISE PATRIMONIAL/);
    assert.match(msg.text,/Seu patrimônio, seu legado, seu caminho/);
    assert.doesNotMatch(msg.html,/token-teste|segredo-teste/);
  } finally {globalThis.fetch=fetchPrevious;}
});

test("protocolo de desconhecimento começa em 12 respostas, não 11",()=>{
  const raw=answers("sim");
  const keys=Object.keys(raw);
  for(let i=0;i<11;i++)raw[keys[i]]="naosei";
  const r11=evaluateCheckup(raw);
  assert.equal(r11.unknownCount,11);
  assert.equal(r11.limited,false);
  raw[keys[11]]="naosei";
  const r12=evaluateCheckup(raw);
  assert.equal(r12.unknownCount,12);
  assert.equal(r12.limited,true);
  assert.match(r12.priorities[1].detail,/Você já indicou/);
});
test("protocolo especial sem respostas positivas não inventa estrutura",()=>{
  const r=evaluateCheckup(answers("naosei"));
  assert.equal(r.limited,true);
  assert.doesNotMatch(r.priorities[1].detail,/Você já indicou/);
});
test("liquidez trata da continuidade dos negócios sem alarmismo de venda",()=>{
  const raw=answers("sim");
  raw["strategy-1"]="nao";
  const r=evaluateCheckup(raw);
  assert(r.priorities.some(p=>/Liquidez também significa preservar escolhas/.test(p.title)));
  assert(r.priorities.some(p=>/continuidade dos negócios/.test(p.detail)));
  assert(!r.priorities.some(p=>/vendid[oa]|vender|venda em condições desfavoráveis/i.test(p.detail)));
});
test("relações entre sucessão e liquidez priorizam interpretação integrada",()=>{
  const raw=answers("sim");
  raw["legacy-1"]="nao";
  raw["strategy-1"]="nao";
  const r=evaluateCheckup(raw);
  assert(r.priorities.some(p=>/continuidade da família também depende de liquidez/.test(p.title)));
});
test("respostas negativas e desconhecimento não são tratados como sinônimos",()=>{
  const raw=answers("sim");
  raw["investments-0"]="naosei";
  const r=evaluateCheckup(raw);
  assert.equal(r.unknownCount,1);
  assert.equal(r.limited,false);
  assert(!r.priorities.some(p=>/inexistente|inadequada|comprovadamente/.test(p.detail)));
});
