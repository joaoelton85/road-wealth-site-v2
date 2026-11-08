import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateCheckup } from "../src/checkup-report.js";
import { ROAD_CHECKUP_PROFILES, ROAD_CHECKUP_AREA_ORDER } from "../src/checkup-profiles.js";

const page=readFileSync("src/pages/patrimonio.astro","utf8");
const style=readFileSync("src/styles/revision-61.css","utf8");
const footer=readFileSync("src/components/Footer.astro","utf8");
const logo=readFileSync("public/assets/road-logo-cafe-email.png");
const all=(value,profile)=>Object.fromEntries(ROAD_CHECKUP_AREA_ORDER.flatMap(a=>
  ROAD_CHECKUP_PROFILES[profile].areas[a].questions.map((_,i)=>[a+"-"+i,value])));

test("site solicita perfil antes das perguntas e e-mail depois de concluí-las",()=>{
  assert.match(page,/road:checkup-finished/);
  assert.match(page,/road-checkup-profile/);
  assert.match(page,/begin-profile-checkup/);
  assert.match(page,/Receba sua análise por e-mail/);
  assert.match(page,/\['sim','Sim'\]/);
  assert.doesNotMatch(page,/function renderStepResult|function renderScore|scoreboard-grid|id="result"/);
  assert.match(page,/const answers=\{\}/);
});
test("logo no e-mail é o PNG oficial completo",()=>{
  assert(logo.byteLength>1000);
  assert.deepEqual([...logo.subarray(0,8)],[137,80,78,71,13,10,26,10]);
  assert(logo.readUInt32BE(16)>100);
  assert(logo.readUInt32BE(20)>=300);
});
test("contato e rodapé preservam canais e alinhamento",()=>{
  assert.match(page,/road-contact-channels/);
  assert.match(style,/flex-wrap:nowrap/);
  assert.match(footer,/footer-right/);
  assert.match(style,/grid-template-areas:"brand legal right"/);
  assert.match(style,/grid-area:legal!important/);
  assert.match(style,/align-self:end!important/);
  assert.match(footer,/Política de Privacidade/);
  assert.match(footer,/@road.wealth/);
});
test("escala normalizada conserva a pontuação por área",()=>{
  for(const profile of ["familiar","empresarial"]){
    for(const [answer,score] of [["sim",12],["parcial",8],["nao",4],["naosei",0]]){
      const r=evaluateCheckup(all(answer,profile),profile);
      assert(r);
      assert(r.areas.every(a=>a.points===score));
    }
  }
});
