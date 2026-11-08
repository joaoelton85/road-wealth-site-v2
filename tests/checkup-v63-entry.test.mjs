import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync("src/pages/patrimonio.astro","utf8");
const home=readFileSync("src/pages/index.astro","utf8");
const css=readFileSync("src/styles/revision-63.css","utf8");
const flow=page.slice(page.indexOf('<section class="section checkup-section"'),page.indexOf('<section class="section section--coffee cta-final"'));

test("abertura é única, editorial e sem resultados na página",()=>{
  assert.equal((flow.match(/CHECK-UP ROAD/g)||[]).length,1);
  assert.equal((flow.match(/<h2>/g)||[]).length,1);
  assert.equal((flow.match(/id="open-checkup"/g)||[]).length,1);
  assert.match(flow,/Responda a 16 perguntas/);
  assert.match(flow,/análise será enviada por e-mail/);
  assert.doesNotMatch(flow,/checkup-invite|id="checkup-intro"|id="start-checkup"|checkup-meta|checkup-area-card/);
  assert(flow.indexOf('id="open-checkup"')<flow.indexOf('id="checkup"'));
});
test("escolha de perfil precede o fluxo de perguntas",()=>{
  assert.match(page,/function openCheckup\(\)\s*\{[\s\S]*?checkupStep=0/);
  assert.match(page,/qs\('#checkup-profile'\)\.hidden=false/);
  assert.match(page,/qs\('#checkup-flow'\)\.hidden=false/);
  assert.match(page,/begin-profile-checkup/);
  assert.match(page,/renderCheckup\(\)/);
  assert.doesNotMatch(page,/id="result"|scoreboard-grid|renderStepResult/);
  assert.match(page,/Concluir e receber por e-mail/);
  assert.match(page,/qs\('#open-checkup'\)\?\.addEventListener\('click'/);
});
test("Home tem acesso único ao Check-up sem caixa duplicada",()=>{
  assert.equal((home.match(/href="\/patrimonio\/#checkup-road"/g)||[]).length,1);
  assert.match(home,/href="\/patrimonio\/#checkup-road"[^>]*>Check-up ROAD<\/a>/);
  assert.doesNotMatch(home,/road-home-checkup-access|road-home-checkup-eyebrow/);
  assert.match(home,/road-home-how-link/);
  assert.match(home,/Conheça a ROAD/);
});
test("primeira tela mobile mantém espaço para o CTA",()=>{
  assert.match(css,/#checkup-road \.checkup-entry h2/);
  assert.match(css,/#checkup-road \.checkup-entry \.btn/);
  assert.match(css,/#checkup-road\.section/);
  assert.match(css,/scroll-margin-top:calc\(var\(--sticky-top\) \+ 14px\)/);
});
