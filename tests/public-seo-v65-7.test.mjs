import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {join} from "node:path";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");

test("robots.txt libera rastreamento e aponta o sitemap index da ROAD",()=>{
  assert.equal(read("public/robots.txt"),"User-agent: *\nAllow: /\nSitemap: https://roadwealth.com.br/sitemap-index.xml\n");
  assert.equal(existsSync("public/sitemap.xml"),false,"sitemap legado manual deve ser removido");
});

test("Astro usa domínio de produção e gera sitemap index",()=>{
  const config=read("astro.config.mjs");
  const pkg=JSON.parse(read("package.json"));
  assert.match(config,/site: 'https:\/\/roadwealth\.com\.br'/);
  assert.match(config,/import sitemap from '@astrojs\/sitemap'/);
  assert.match(config,/integrations: \[/);
  assert.match(config,/sitemap\(\{/);
  assert.equal(pkg.dependencies["@astrojs/sitemap"],"^3.7.4");
  assert.match(config,/404/);
});

test("layout compartilhado permite indexação e usa URLs canônicas do domínio oficial",()=>{
  const layout=read("src/layouts/BaseLayout.astro");
  assert.ok(!layout.includes("noindex"),"remover variável e marcação noindex do layout");
  assert.ok(!layout.includes("nofollow"),"remover bloqueio de links do layout");
  assert.match(layout,/rel="canonical" href=\{socialUrl\}/);
  assert.match(layout,/rel="sitemap" type="application\/xml" href="\/sitemap-index\.xml"/);
  assert.match(layout,/const socialUrl = "https:\/\/roadwealth\.com\.br" \+ Astro\.url\.pathname/);
  for(const page of ["index","a-road","investimentos","patrimonio","conhecimento","contato","glossario","calculadora-ir","avisos-legais","privacidade"]){
    const content=read("src/pages/"+page+".astro");
    assert.doesNotMatch(content,/noindex|nofollow|X-Robots-Tag/i,"bloqueio na página "+page);
  }
});

test("não há regras de bloqueio por cabeçalhos e Worker continua intacto",()=>{
  assert.equal(existsSync("public/_headers"),false);
  assert.equal(existsSync("wrangler.toml"),false);
  assert.equal(existsSync("src/pages/robots.txt.ts"),false);
  const wrangler=read("wrangler.jsonc");
  const worker=read("src/worker.js");
  assert.doesNotMatch(wrangler,/X-Robots-Tag|noindex|nofollow/i);
  assert.doesNotMatch(worker,/X-Robots-Tag|noindex|nofollow/i);
  assert.match(worker,/env\.ASSETS\.fetch\(request\)/,"não alterar a entrega normal de páginas");
});
