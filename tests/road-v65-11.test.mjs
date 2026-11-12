import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const css=read("src/styles/road-top-content-desktop-v65-11.css");
const layout=read("src/layouts/BaseLayout.astro");
const ticker=read("src/components/MarketTicker.astro");
const highlights=read("src/components/RoadHighlights.astro");

test("V65.11 desloca apenas conteúdo, não rótulos, no Desktop >1000",()=>{
  assert.match(css,/@media\s*\(min-width:\s*1001px\)/);
  assert.match(css,/--road-content-desktop-start:/);
  assert.match(css,/68px \+ 14px/);
  assert.match(css,/\.market-ticker-row--desktop \.market-ticker-track/);
  assert.match(css,/\.road-highlights__stage > \.road-highlights__slide/);
  assert.doesNotMatch(css,/\.road-highlights__label\s*\{|\.market-ticker-label\s*\{|\.market-ticker-viewport\s*\{|iframe|tradingview-widget-container\s*\{/);
  assert(layout.includes('import "../styles/road-top-content-desktop-v65-11.css";'));
  assert(layout.indexOf("road-top-content-desktop-v65-11.css")>layout.indexOf("road-footer-desktop-v65-8.css"));
  assert(ticker.includes('BMFBOVESPA:IBOV'));
  assert(ticker.includes('BMFBOVESPA:DI1F2030'));
  assert(highlights.includes("road-highlights__pager"));
  assert(layout.includes("B3 · 15 min de atraso"));
});
