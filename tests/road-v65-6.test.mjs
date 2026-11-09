import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";

const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const layout=read("src/layouts/BaseLayout.astro");
const bundle=read("src/styles/road-legacy-consolidated.css");

test("50 revisões CSS importadas por uma única folha na ordem original",()=>{
  assert.match(layout,/import "\.\.\/styles\/road-legacy-consolidated\.css";/);
  assert.doesNotMatch(layout,/import "\.\.\/styles\/(v\d|revision)[^"]*\.css";/);
  assert.match(layout,/import "\.\.\/styles\/global\.css";/);
  assert.match(layout,/import "\.\.\/styles\/road-typography-v65-5\.css";/);
  assert.match(bundle,/Ordem original preservada: 50 arquivos/);
  assert.equal((bundle.match(/\/\* === INÍCIO /g)||[]).length,50);
  assert.equal((bundle.match(/\/\* === FIM /g)||[]).length,50);
});
test("fontes de CSS são preservadas integralmente com checksum verificável",()=>{
  const source=bundle.match(/^ \* Fontes: (.*)$/m);
  const hash=bundle.match(/^ \* SHA256 das fontes: ([a-f0-9]{64})$/m);
  assert.ok(source&&hash);
  const names=source[1].split(", ");
  assert.equal(names.length,50);
  assert.equal(new Set(names).size,50);
  const sourceHash=createHash("sha256").update(names.map(name=>name+"\n"+read("src/styles/"+name)).join("\n")).digest("hex");
  assert.equal(sourceHash,hash[1]);
  let last=-1;
  for(const name of names){
    const position=bundle.indexOf("/* === INÍCIO "+name+" === */");
    assert.ok(position>last,"cascata fora de ordem: "+name);
    last=position;
  }
});
test("código TradingView, layout e indexação permanecem intactos",()=>{
  assert.match(read("src/components/MarketTicker.astro"),/tradingview/i);
  assert.match(layout,/B3 · 15 min de atraso/);
  assert.doesNotMatch(layout,/<meta name="robots" content="noindex/);
  assert.equal(read("public/robots.txt").trim(),"User-agent: *\nAllow: /\nSitemap: https://roadwealth.com.br/sitemap-index.xml");
});
