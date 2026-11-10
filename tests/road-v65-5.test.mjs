import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync,statSync} from "node:fs";
import sharp from "sharp";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");

test("tipografia Questrial + Lato do Brandbook aplicada sem afetar a TradingView",()=>{
  const lay=read("src/layouts/BaseLayout.astro");
  const css=read("src/styles/road-typography-v65-5.css");
  assert.match(lay,/family=Lato:wght@300;400;700&family=Questrial/);
  assert.doesNotMatch(lay,/family=Inter|family=Montserrat/);
  assert.match(css,/--road-font-heading:"Questrial"/);
  assert.match(css,/--road-font-text:"Lato"/);
  assert.doesNotMatch(css,/market-ticker|road-tv-theme|TradingView.*font-family/);
  assert.match(lay,/B3 · 15 min de atraso/);
});
test("paleta central utiliza Cafe, Areia e complementares do Brandbook",()=>{
  const css=read("src/styles/global.css");
  for(const color of ["#483A2F","#F3ECE3","#43726B","#3A4950","#9B9B9B"])assert.ok(css.includes(color),color);
  assert.match(css,/Nunca aplicar estas cores para recolorir o logo/);
});
test("Open Graph e canonical mantidos com indexação liberada e sitemap automático",()=>{
  const lay=read("src/layouts/BaseLayout.astro");
  assert.match(lay,/property="og:image" content="https:\/\/roadwealth.com.br\/assets\/road-og.png"/);
  assert.match(lay,/property="og:description"/);
  assert.match(lay,/property="og:title"/);
  assert.match(lay,/name="twitter:card"/);
  assert.match(lay,/rel="canonical" href=\{socialUrl\}/);
  assert.match(lay,/rel="sitemap" type="application\/xml" href="\/sitemap-index\.xml"/);
  assert.doesNotMatch(lay,/<meta name="robots" content="noindex/);
  assert.equal(read("public/robots.txt").trim(),"User-agent: *\nAllow: /\nSitemap: https://roadwealth.com.br/sitemap-index.xml");
  assert.match(read("astro.config.mjs"),/integrations: \[/);
  assert.match(read("astro.config.mjs"),/sitemap\(\{/);
});
test("marcas locais, titularidade e mandala WebP",()=>{
  const institutions=read("src/components/InstitutionPlatforms.astro");
  assert.match(institutions,/const base = '\/assets\/platforms\//);
  assert.match(institutions,/As marcas exibidas pertencem aos respectivos titulares/);
  assert.ok(read("src/components/RoadMandala.astro").includes("road-mandala-master-1254.webp"));
  assert.ok(!read("src/components/RoadMandala.astro").includes("road-areas-approved.webp"));
});
test("imagens otimizadas sao PNG ou WebP reais e sao locais",async()=>{
  const pngs=[
    "public/assets/road-og.png",
    "public/assets/platforms/c6-bank.png",
    "public/assets/platforms/jpmorgan.png"
  ];
  for(const path of pngs){
    assert.ok(existsSync(path),"imagem não incluída no repositório: "+path);
    const meta=await sharp(path).metadata();
    assert.equal(meta.format,"png");
  }
  const og=await sharp("public/assets/road-og.png").metadata();
  assert.equal(og.width,1200);
  assert.equal(og.height,630);
  const webp="public/assets/road-mandala-master-1254.webp";
  assert.ok(existsSync(webp));
  const w=await sharp(webp).metadata();
  assert.equal(w.format,"webp");
  assert.equal(w.width,1254);
  assert.equal(w.height,1254);
  assert.ok(statSync(webp).size<statSync("public/assets/road-mandala-master-1254.png").size);
  assert.equal(existsSync("public/assets/road-areas-approved.png"),true,"PNG de referência preservado");
});
