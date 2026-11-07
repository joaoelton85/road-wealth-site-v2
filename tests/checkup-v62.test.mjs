import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import worker from "../src/worker.js";
import { ROAD_AREAS, evaluateCheckup } from "../src/checkup-report.js";

const read = p=>readFileSync(p,"utf8");
const answers = (value="sim")=>Object.fromEntries(
  ROAD_AREAS.flatMap(area=>Array.from({length:4},(_,i)=>[area.key+"-"+i,value])));
async function emailFor(sample) {
  const oldFetch=globalThis.fetch;
  const sent=[];
  globalThis.fetch=async()=>new Response(JSON.stringify({
    success:true,hostname:"roadwealth.com.br",action:"road_checkup_email",
  }),{headers:{"Content-Type":"application/json"}});
  try {
    const request=new Request("https://roadwealth.com.br/api/checkup-email",{
      method:"POST",
      headers:{"Origin":"https://roadwealth.com.br","Content-Type":"application/json"},
      body:JSON.stringify({email:"visual@example.com",consent:true,answers:sample,turnstileToken:"mock"}),
    });
    const response=await worker.fetch(request,{
      EMAIL:{send:async message=>{sent.push(message)}},
      TURNSTILE_SECRET_KEY:"secret",
      CHECKUP_EMAIL_RATE_LIMIT:{limit:async()=>({success:true})},
    });
    assert.equal(response.status,202);
    assert.equal(sent.length,1);
    return sent[0];
  } finally {globalThis.fetch=oldFetch}
}

test("barras são PNGs de marca, 13 opções estáticas, não fundos CSS descartáveis",()=>{
  for(let i=0;i<=12;i++){
    const path="public/assets/checkup-bar-"+i+".png";
    assert(existsSync(path),path);
    const bytes=readFileSync(path);
    assert.deepEqual([...bytes.subarray(0,8)],[137,80,78,71,13,10,26,10]);
    assert(bytes.length>400);
  }
});

test("HTML envia PNG de barra conforme a nota, mantendo avaliação textual",async()=>{
  const v=answers("sim");
  v["investments-0"]="nao";
  v["legacy-0"]="parcial";
  v["strategy-0"]="naosei";
  const msg=await emailFor(v);
  const r=evaluateCheckup(v);
  for(const area of r.areas){
    assert.match(msg.html,new RegExp("checkup-bar-"+area.points+"\\.png"));
    assert.match(msg.text,new RegExp(area.label+": "+area.statusLabel));
  }
  assert.match(msg.html,/alt="Posição indicativa de/);
  assert.doesNotMatch(msg.html,/font-size:1px;line-height:1px/);
});

test("fontes do site são carregadas quando possível, mantendo fallback em Outlook/Gmail",async()=>{
  const msg=await emailFor(answers("sim"));
  assert.match(msg.html,/fonts\.googleapis\.com\/css2/);
  assert.match(msg.html,/@import url/);
  assert.match(msg.html,/font-family:Questrial,Century Gothic,Trebuchet MS,Arial,sans-serif/);
  assert.match(msg.html,/font-family:Montserrat,Arial,Helvetica,sans-serif/);
  assert.match(msg.html,/font-family:Inter,Arial,Helvetica,sans-serif/);
  assert.match(msg.html,/font-size:30px/);
  assert.match(msg.html,/font-size:20px/);
  assert.match(msg.html,/font-size:15px/);
  assert.match(msg.html,/if mso/);
});

test("a marca original, menor, compartilha uma linha com lema e canais",async()=>{
  const msg=await emailFor(answers("nao"));
  assert.match(msg.html,/road-logo-cafe-email\.png" width="64" height="109"/);
  assert.match(msg.html,/roadwealth\.com\.br/);
  assert.match(msg.html,/Instagram @road\.wealth/);
  assert.match(msg.html,/Seu patrimônio, seu legado, seu caminho/);
  assert.doesNotMatch(msg.html,/alt="ROAD Wealth"[^>]*width="90"/);
  assert.match(msg.html,/border:1px solid #483A2F/);
  assert.match(msg.html,/color:#483A2F;text-decoration:underline/);
});

test("duas interpretações não repetem a mesma tese sobre decisões integradas",()=>{
  const v=answers("sim");
  for(const k of ["investments-1","investments-3","decisions-0","decisions-2","decisions-3","strategy-1"])
    v[k]="nao";
  const r=evaluateCheckup(v);
  assert.equal(r.priorities.length,2);
  const overlap=r.priorities.filter(x=>
    /risco de uma decisão nem sempre aparece isoladamente|boa decisão precisa considerar o patrimônio inteiro/i.test(x.title));
  assert.equal(overlap.length,1,r.priorities.map(x=>x.title).join(" / "));
  assert.notEqual(r.priorities[0].title,r.priorities[1].title);
});

test("protocolo 'Não sei' permanece restrito a 12 ou mais respostas",()=>{
  const v=answers("sim");
  const keys=Object.keys(v);
  for(let i=0;i<11;i++)v[keys[i]]="naosei";
  assert.equal(evaluateCheckup(v).limited,false);
  v[keys[11]]="naosei";
  const r=evaluateCheckup(v);
  assert.equal(r.limited,true);
  assert.match(r.priorities[1].detail,/Você já indicou/);
});

test("Home prioriza o Check-up sem balão solto, preservando Destaques e navegação",()=>{
  const home=read("src/pages/index.astro");
  assert.match(home,/class="actions"[\\s\\S]*href="\/patrimonio\/#checkup-road"/);
  assert.doesNotMatch(home,/road-home-checkup-access/);
  assert.match(home,/road-home-how-link/);
  assert.match(home,/Conheça a ROAD/);
  const layout=read("src/layouts/BaseLayout.astro");
  assert.match(layout,/RoadHighlights/);
  assert.match(layout,/isHome && <RoadHighlights/);
});
test("mobile: Check-up sem deslocamento e rodapé legal compacto preservado",()=>{
  const styles=read("src/styles/revision-62.css");
  const layout=read("src/layouts/BaseLayout.astro");
  const footer=read("src/components/Footer.astro");
  assert.match(styles,/#checkup-road\.section/);
  assert.match(styles,/scroll-margin-top:0!important/);
  assert.match(styles,/\.footer-link-short\{display:inline!important\}/);
  assert.match(styles,/road-mobile-reading-zone/);
  assert.match(layout,/import "\.\.\/styles\/revision-62\.css"/);
  assert.match(layout,/window\.__roadMobileReadingBound/);
  assert.match(footer,/footer-link-full/);
  assert.match(footer,/footer-link-short/);
  assert.match(footer,/https:\/\/www\.instagram\.com\/road\.wealth/);
});
