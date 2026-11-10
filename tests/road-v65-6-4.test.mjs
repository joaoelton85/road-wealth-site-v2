import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,statSync} from "node:fs";
import sharp from "sharp";

const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const master="public/assets/road-mandala-master-1254.svg";
const png="public/assets/road-mandala-master-1254.png";
const svg=read(master);

test("a mandala foi reconstruída integralmente, sem remendos e na matriz de 1254 px",()=>{
  assert.match(svg,/width="1254" height="1254" viewBox="0 0 1254 1254"/);
  assert.match(svg,/INVESTIMENTOS/);
  assert.match(svg,/LEGADO/);
  assert.match(svg,/PLANEJAMENTO/);
  assert.match(svg,/CAPITAL<\/text>/);
  assert.doesNotMatch(svg,/ESTRATÉGIA|DECISÕES/);
  assert.match(svg,/font-family:Montserrat,Arial,sans-serif/);
  assert.match(svg,/data:image\/png;base64,/);
  assert.doesNotMatch(svg,/data:font|@font-face/);
  assert.equal((svg.match(/<rect\b/g)||[]).length,1,"apenas o fundo, sem retângulos de correção");
  assert.equal((svg.match(/<image\b/g)||[]).length,1,"um único símbolo central original");
  assert.equal((svg.match(/<text\b/g)||[]).length,13);
});
test("matriz exportada em PNG original sem redução prévia",async()=>{
  const meta=await sharp(new URL("../"+png,import.meta.url).pathname).metadata();
  assert.equal(meta.width,1254);
  assert.equal(meta.height,1254);
  assert.equal(meta.format,"png");
  assert.ok(statSync(new URL("../"+png,import.meta.url)).size>100000);
});
test("matriz aprovada em peça única substitui a anterior sem remendos",()=>{
  const component=read("src/components/RoadMandala.astro");
  assert.ok(component.includes("road-mandala-master-1254.webp"));
  assert.ok(component.includes("road-mandala-master-2508.webp"));
  assert.ok(!component.includes("road-areas-approved.webp"));
  assert.ok(!component.includes("road-mandala-names"));
  assert.ok(!component.includes("<svg"));
});

test("Destaques: remover aumento sem desfazer a Montserrat no menu e rótulos",()=>{
  const css=read("src/styles/road-desktop-typography-v65-6-3.css");
  assert.match(css,/ROAD Montserrat Menu/);
  assert.ok(!css.includes("ROAD Inter Destaques"));
  assert.ok(!css.includes("font-size:clamp(17px"));
  assert.ok(!css.includes(".road-highlights__slide-copy"));
  const c=read("src/components/RoadHighlights.astro");
  assert.match(c,/Como está seu planejamento financeiro/);
});
