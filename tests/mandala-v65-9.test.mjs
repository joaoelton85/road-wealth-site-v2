import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import sharp from "sharp";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const component = read("src/components/RoadMandala.astro");
const master = read("public/assets/road-mandala-master-1254.svg");

test("a mandala publicada é uma imagem única e usa fontes responsivas", () => {
  assert(component.includes('src="/assets/road-mandala-master-1254.webp"'));
  assert(component.includes("1254w"));
  assert(component.includes("2508w"));
  assert(component.includes('width="1254"'));
  assert(component.includes('height="1254"'));
  assert(component.includes('loading="lazy"'));
  for(const unexpected of ["<svg", "<rect", "road-areas-approved", "road-mandala-names", "radialGradient"])
    assert(!component.includes(unexpected),"Remendo encontrado: "+unexpected);
  const css=read("src/styles/global.css");
  assert(css.includes(".road-mandala-art>img{display:block;width:100%;height:100%;object-fit:contain}"));
});

test("mestre vetorial mantém opacidade aprovada e textos unificados", () => {
  assert(master.includes('opacity=".60" preserveAspectRatio'));
  assert.equal(master.split("<rect").length-1,1);
  assert.equal(master.split("<image").length-1,1);
  assert.equal(master.split("<text").length-1,13);
  for(const label of ["INVESTIMENTOS","LEGADO","CAPITAL","PLANEJAMENTO"])
    assert(master.includes(">"+label+"</text>"));
});

test("exportações WebP preservam resolução e são menores que os PNGs", async() => {
  for(const size of [1254,2508]) {
    const file="public/assets/road-mandala-master-"+size+".webp";
    const original="public/assets/road-mandala-master-"+size+".png";
    const webp=await sharp(new URL("../"+file,import.meta.url).pathname).metadata();
    assert.equal(webp.format,"webp");
    assert.equal(webp.width,size);
    assert.equal(webp.height,size);
    assert(statSync(new URL("../"+file,import.meta.url)).size<statSync(new URL("../"+original,import.meta.url)).size);
  }
});
