import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import worker from "../src/worker.js";
import { evaluateCheckup } from "../src/checkup-report.js";
import { ROAD_CHECKUP_PROFILES, ROAD_CHECKUP_AREA_ORDER } from "../src/checkup-profiles.js";

const read=p=>readFileSync(p,"utf8");
const answers=(value="sim",profile="familiar")=>Object.fromEntries(
  ROAD_CHECKUP_AREA_ORDER.flatMap(area=>
    ROAD_CHECKUP_PROFILES[profile].areas[area].questions.map((_,i)=>[area+"-"+i,value])));
async function emailFor(sample,profile="familiar") {
  const oldFetch=globalThis.fetch;
  const sent=[];
  globalThis.fetch=async()=>new Response(JSON.stringify({
    success:true,hostname:"roadwealth.com.br",action:"road_checkup_email",
  }),{headers:{"Content-Type":"application/json"}});
  try {
    const request=new Request("https://roadwealth.com.br/api/checkup-email",{
      method:"POST",headers:{"Origin":"https://roadwealth.com.br","Content-Type":"application/json"},
      body:JSON.stringify({email:"visual@example.com",consent:true,profile,answers:sample,turnstileToken:"mock"}),
    });
    const response=await worker.fetch(request,{
      EMAIL:{send:async message=>{sent.push(message)}},
      TURNSTILE_SECRET_KEY:"secret",CHECKUP_EMAIL_RATE_LIMIT:{limit:async()=>({success:true})}
    });
    assert.equal(response.status,202);
    assert.equal(sent.length,1);
    return sent[0];
  }finally{globalThis.fetch=oldFetch;}
}
test("barras de marca oferecem 13 posições de nota",()=>{
  for(let i=0;i<=12;i++){
    const path="public/assets/checkup-bar-"+i+".png";
    assert(existsSync(path),path);
    const bytes=readFileSync(path);
    assert.deepEqual([...bytes.subarray(0,8)],[137,80,78,71,13,10,26,10]);
    assert(bytes.length>400);
  }
});
test("HTML usa PNG de barra normalizada e avaliação textual",async()=>{
  const v=answers("sim");
  v["investments-0"]="nao";v["legacy-0"]="parcial";v["capital-0"]="naosei";
  const msg=await emailFor(v);
  const r=evaluateCheckup(v,"familiar");
  for(const area of r.areas){
    assert.match(msg.html,new RegExp("checkup-bar-"+Math.round(area.points)+"\\.png"));
    assert.match(msg.text,new RegExp(area.label+": "+area.statusLabel));
  }
  assert.match(msg.html,/alt="Posição indicativa de/);
});
test("fontes e fallback do Outlook e Gmail são preservados",async()=>{
  const msg=await emailFor(answers());
  for(const token of [/fonts\.googleapis\.com\/css2/,/@import url/,/font-family:Questrial,Century Gothic/,
    /font-family:Montserrat,Arial/,/font-family:Inter,Arial/,/if mso/]){
    assert.match(msg.html,token);
  }
});
test("marca e rodapé do e-mail são preservados",async()=>{
  const msg=await emailFor(answers("nao"));
  assert.match(msg.html,/road-logo-cafe-email\.png" width="70" height="109"/);
  assert.match(msg.html,/roadwealth\.com\.br/);
  assert.match(msg.html,/Instagram @road\.wealth/);
  assert.match(msg.html,/Seu patrimônio, seu caminho, seu legado/);
});
test("recomendações não repetem o mesmo título",()=>{
  const v=answers("sim");
  for(const k of ["investments-1","investments-3","planning-3","planning-4","capital-0"])v[k]="nao";
  const r=evaluateCheckup(v,"familiar");
  assert.equal(r.priorities.length,2);
  assert.notEqual(r.priorities[0].title,r.priorities[1].title);
});
test("protocolo de 12 ou mais respostas 'Não sei' permanece",()=>{
  const v=answers("sim");const keys=Object.keys(v);
  for(let i=0;i<11;i++)v[keys[i]]="naosei";
  assert.equal(evaluateCheckup(v,"familiar").limited,false);
  v[keys[11]]="naosei";
  const r=evaluateCheckup(v,"familiar");
  assert.equal(r.limited,true);
  assert.match(r.priorities[1].detail,/Você já indicou/);
});
test("Home mantém acesso único ao Check-up e navegação",()=>{
  const home=read("src/pages/index.astro");
  assert.match(home,/class="actions"/);
  assert.match(home,/href="\/patrimonio\/#checkup-road"/);
  assert.doesNotMatch(home,/road-home-checkup-access/);
  assert.doesNotMatch(home,/road-home-how-link/);
  assert.match(home,/Conheça a ROAD/);
  assert(home.indexOf("Conheça a ROAD") < home.indexOf("Fazer Check-up Financeiro"));
  assert(home.indexOf("home-institutions") < home.indexOf("home-areas"));
  assert(home.indexOf("home-areas") < home.indexOf("home-planning"));
  const layout=read("src/layouts/BaseLayout.astro");
  assert.match(layout,/RoadHighlights/);
  assert.match(layout,/isHome && <RoadHighlights/);
});
test("mobile: rodapé legal e Check-up são preservados",()=>{
  const styles=read("src/styles/revision-62.css");
  const layout=read("src/layouts/BaseLayout.astro");
  const footer=read("src/components/Footer.astro");
  assert.match(styles,/#checkup-road\.section/);
  assert.match(styles,/scroll-margin-top:0!important/);
  assert.match(styles,/\.footer-link-short\{display:inline!important\}/);
  assert.match(layout,/import "\.\.\/styles\/revision-62\.css"/);
  assert.match(footer,/footer-link-full/);
  assert.match(footer,/footer-link-short/);
});
