import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const css=read("src/styles/road-desktop-typography-v65-6-3.css");
const layout=read("src/layouts/BaseLayout.astro");
const pkg=JSON.parse(read("package.json"));
test("tipografia anterior restaurada só nos destinos solicitados",()=>{
  assert.match(css,/@media\(min-width:1001px\)/);
  assert.match(css,/\.site-header \.nav-main > a/);
  assert.match(css,/\.market-ticker-row--desktop \.market-ticker-label/);
  assert.match(css,/\.road-highlights__label \.road-highlights__label-text/);
  assert.doesNotMatch(css,/\\.road-highlights__slide-copy|font-size:clamp\\(17px,1\\.42vw,19px\\)/);
  assert.doesNotMatch(css,/(?:\.tradingview-widget-container|\.road-tv-theme|\.market-ticker-viewport|\.ticker-placeholder)\s*\{/);
});
test("fontes com aliases locais não alteram os nomes de fontes no legado",()=>{
  assert.match(css,/font-family:"ROAD Montserrat Menu"/);
  assert.doesNotMatch(css,/font-family:"ROAD Inter Destaques"/);
  assert.match(css,/@fontsource\/montserrat\/files\/montserrat-latin-500-normal\.woff2/);
  assert.doesNotMatch(css,/@fontsource\\/inter/);
  assert.ok(pkg.dependencies["@fontsource/montserrat"]);
  assert.ok(!pkg.dependencies["@fontsource/inter"]);
  assert.match(layout,/road-typography-v65-5\.css/);
  assert.match(layout,/road-mobile-fit-v65-6-2\.css/);
  assert.match(layout,/road-desktop-typography-v65-6-3\.css/);
  assert.match(layout,/B3 · 15 min de atraso/);
  assert.match(layout,/const BUILD_VERSION = "65\.6\.4"/);
});
test("conteúdo dos destaques e navegação não é reescrito",()=>{
  const slides=read("src/components/RoadHighlights.astro");
  const head=read("src/components/Header.astro");
  assert.equal((slides.match(/data-highlight-slide(?=\s|>)/g)||[]).length,4);
  for(const label of ["a-road","investimentos","patrimonio","conhecimento"]){
    assert.match(head,new RegExp('data-road-nav="'+label+'"'));
  }
});
