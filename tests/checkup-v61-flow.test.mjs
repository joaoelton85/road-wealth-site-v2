import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateCheckup, ROAD_AREAS } from "../src/checkup-report.js";

const page=readFileSync("src/pages/patrimonio.astro","utf8");
const style=readFileSync("src/styles/revision-61.css","utf8");
const footer=readFileSync("src/components/Footer.astro","utf8");
const logo=readFileSync("public/assets/road-logo-cafe-email.png");
const all=(value)=>Object.fromEntries(ROAD_AREAS.flatMap(a=>Array.from({length:4},(_,i)=>[a.key+"-"+i,value])));

test("site solicita e-mail apenas ao terminar o questionário, sem resultados parciais",()=>{
  assert.match(page,/road:checkup-finished/);
  assert.match(page,/Receba sua análise por e-mail/);
  assert.match(page,/data-value="naosei"/);
  assert.doesNotMatch(page,/function renderStepResult|function renderScore|scoreboard-grid|id="result"/);
  assert.doesNotMatch(page,/id="open-checkup-email"|Receber pelo WhatsApp/);
  assert.match(page,/const answers=\{\}/);
});
test("logo do e-mail é o PNG oficial completo e não uma reconstrução de texto",()=>{
  assert(logo.byteLength>1000);
  assert.deepEqual([...logo.subarray(0,8)],[137,80,78,71,13,10,26,10]);
  assert(logo.readUInt32BE(16)>100);
  assert(logo.readUInt32BE(20)>=300);
});
test("contato e rodapé preservam canais e alinhamento da base",()=>{
  assert.match(page,/road-contact-channels/);
  assert.match(style,/flex-wrap:nowrap/);
  assert.match(footer,/footer-right/);
  assert.match(style,/grid-template-areas:"brand legal right"/);
  assert.match(style,/grid-area:legal!important/);
  assert.match(style,/align-self:end!important/);
  assert.match(footer,/Política de Privacidade/);
  assert.match(footer,/@road.wealth/);
});
test("a escala de quatro respostas conserva a pontuação por área",()=>{
  for(const [answer,score] of [["sim",12],["parcial",8],["nao",4],["naosei",0]]){
    const r=evaluateCheckup(all(answer));
    assert(r);
    assert(r.areas.every(a=>a.points===score));
  }
});
