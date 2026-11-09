import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=p=>readFileSync(p,"utf8");

assert.equal(read("dist/robots.txt"),"User-agent: *\nAllow: /\nSitemap: https://roadwealth.com.br/sitemap-index.xml\n");
assert.ok(existsSync("dist/sitemap-index.xml"),"o índice do sitemap deve ser gerado pelo Astro");
assert.ok(existsSync("dist/sitemap-0.xml"),"o sitemap deve conter as páginas indexáveis");
assert.equal(existsSync("dist/sitemap.xml"),false,"não gerar lista manual duplicada");
const index=read("dist/sitemap-index.xml");
const urls=read("dist/sitemap-0.xml");
assert.match(index,/<sitemapindex\b/);
assert.match(index,/https:\/\/roadwealth\.com\.br\/sitemap-0\.xml/);
for(const page of ["/","/a-road/","/investimentos/","/patrimonio/","/conhecimento/","/contato/","/calculadora-ir/","/glossario/"]){
  assert.ok(urls.includes("https://roadwealth.com.br"+page+"</loc>"),"URL ausente no sitemap: "+page);
}
assert.ok(!urls.includes("roadwealth.com.br/404/"),"não incluir página de erro no sitemap");
for(const page of ["","a-road/","investimentos/","patrimonio/","conhecimento/","contato/","calculadora-ir/","glossario/","privacidade/","avisos-legais/"]){
  const file="dist/"+page+"index.html";
  const html=read(file);
  assert.ok(!/<meta\s+name=["']robots["'][^>]*(noindex|nofollow)/i.test(html),"meta de bloqueio: "+file);
  assert.match(html,/rel="canonical"/,"canonical ausente em "+file);
  assert.match(html,/href="https:\/\/roadwealth\.com\.br\//,"URL canonical inválida "+file);
}
console.log("V65.7 SEO OK — robots liberado, sitemap-index.xml + sitemap-0.xml, 10 HTML canônicos e sem bloqueio.");
