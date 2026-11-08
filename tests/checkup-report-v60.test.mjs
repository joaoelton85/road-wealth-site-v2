import test from "node:test";
import assert from "node:assert/strict";
import { evaluateCheckup, ROAD_AREAS, ROAD_TAGLINE } from "../src/checkup-report.js";
import { ROAD_CHECKUP_PROFILES, ROAD_CHECKUP_AREA_ORDER } from "../src/checkup-profiles.js";
import worker from "../src/worker.js";

function answers(value,profile="familiar") {
  const conf=ROAD_CHECKUP_PROFILES[profile];
  return Object.fromEntries(ROAD_CHECKUP_AREA_ORDER.flatMap(area=>
    conf.areas[area].questions.map((_,i)=>[area+"-"+i,value])));
}

test("os dois perfis têm 16 perguntas e quatro áreas",()=>{
  assert.equal(ROAD_AREAS.length,4);
  assert.deepEqual(ROAD_AREAS.map(a=>a.label),["Investimentos","Legado","Capital","Planejamento"]);
  for(const [profile,counts] of [["familiar",[4,5,2,5]],["empresarial",[4,4,4,4]]]){
    const r=evaluateCheckup(answers("sim",profile),profile);
    assert.deepEqual(r.areas.map(a=>a.questionCount),counts);
    assert.equal(r.areas.reduce((s,a)=>s+a.questionCount,0),16);
  }
});
test("escala normalizada 0 a 12 conserva classificações nos dois perfis",()=>{
  for(const profile of ["familiar","empresarial"]){
    for(const [answer,score,label] of [
      ["sim",12,"Bem estruturado"],
      ["parcial",8,"Em desenvolvimento"],
      ["nao",4,"Merece atenção"],
      ["naosei",0,"Merece atenção"]
    ]){
      const r=evaluateCheckup(answers(answer,profile),profile);
      assert.equal(r.areas.length,4);
      assert(r.areas.every(area=>area.points===score));
      assert(r.areas.every(area=>area.statusLabel===label));
      assert.equal(r.priorities.length,2);
    }
  }
});
test("respostas diferentes em áreas com 2 e 5 perguntas são ponderadas corretamente",()=>{
  const raw=answers("sim");
  raw["capital-0"]="nao";
  const result=evaluateCheckup(raw,"familiar");
  assert.equal(result.areas[2].points,8);
  assert.equal(result.areas[2].questionCount,2);
  assert.equal(result.areas[2].statusLabel,"Em desenvolvimento");
  raw["legacy-0"]="nao";
  const changed=evaluateCheckup(raw,"familiar");
  assert.equal(changed.areas[1].points,10.4);
  assert.equal(changed.areas[1].questionCount,5);
});
test("respostas devem corresponder exatamente ao perfil escolhido",()=>{
  const familiar=answers("sim","familiar");
  assert.equal(evaluateCheckup(familiar,"empresarial"),null);
  assert.equal(evaluateCheckup(familiar,"outro"),null);
  const incomplete={...familiar};delete incomplete["legacy-4"];
  assert.equal(evaluateCheckup(incomplete,"familiar"),null);
  const arbitrary={...familiar,"legacy-3":"talvez"};
  assert.equal(evaluateCheckup(arbitrary,"familiar"),null);
});
test("desconhecimento não representa ausência comprovada",()=>{
  const r=evaluateCheckup(answers("naosei"),"familiar");
  assert.equal(r.limited,true);
  assert.match(r.priorities[0].title,/simples/);
  assert.doesNotMatch(r.priorities[1].detail,/Você já indicou/);
});
test("resultados bem estruturados preservam convite de manutenção",()=>{
  const r=evaluateCheckup(answers("sim","empresarial"),"empresarial");
  assert.match(r.priorities[0].title,/estrutura coerente/);
  assert.match(ROAD_TAGLINE,/Seu patrimônio/);
});
test("protocolo de 12 respostas desconhecidas preservado",()=>{
  const raw=answers("sim");
  const keys=Object.keys(raw);
  for(let i=0;i<11;i++)raw[keys[i]]="naosei";
  const r11=evaluateCheckup(raw,"familiar");
  assert.equal(r11.unknownCount,11);assert.equal(r11.limited,false);
  raw[keys[11]]="naosei";
  const r12=evaluateCheckup(raw,"familiar");
  assert.equal(r12.unknownCount,12);assert.equal(r12.limited,true);
  assert.match(r12.priorities[1].detail,/Você já indicou/);
});
test("Capital aborda crédito sem presumir dívidas existentes",()=>{
  const raw=answers("sim","familiar");
  raw["capital-0"]="nao";
  const result=evaluateCheckup(raw,"familiar");
  assert(result.priorities.some(item=>/recursos próprios/.test(item.title)));
  assert(!result.priorities.some(item=>/inadimplente|dívidas existentes/.test(item.detail)));
});
test("Worker envia e-mail e PDF com os nomes novos",async()=>{
  const oldFetch=globalThis.fetch;
  const sent=[];
  globalThis.fetch=async()=>new Response(JSON.stringify({
    success:true,hostname:"roadwealth.com.br",action:"road_checkup_email"
  }),{headers:{"Content-Type":"application/json"}});
  try{
    const request=new Request("https://roadwealth.com.br/api/checkup-email",{
      method:"POST",headers:{"Origin":"https://roadwealth.com.br","Content-Type":"application/json"},
      body:JSON.stringify({email:"prospect@example.com",consent:true,profile:"familiar",answers:answers("parcial"),turnstileToken:"token-teste"})
    });
    const env={
      TURNSTILE_SECRET_KEY:"segredo-teste",
      EMAIL:{send:async message=>{sent.push(message)}},
      CHECKUP_EMAIL_RATE_LIMIT:{limit:async()=>({success:true})}
    };
    const response=await worker.fetch(request,env);
    assert.equal(response.status,202);
    const msg=sent[0];
    assert.match(msg.html,/checkup-bar-8\.png/);
    assert.match(msg.text,/Capital: Em desenvolvimento/);
    assert.match(msg.text,/Planejamento: Em desenvolvimento/);
    assert.match(msg.text,/Patrimonial \/ Familiar/);
    assert.match(msg.text,/PDF anexo/);
    assert.equal(msg.attachments.length,1);
    assert.equal(new TextDecoder().decode(msg.attachments[0].content.slice(0,5)),"%PDF-");
    assert.doesNotMatch(msg.html,/token-teste|segredo-teste/);
  }finally{globalThis.fetch=oldFetch;}
});
