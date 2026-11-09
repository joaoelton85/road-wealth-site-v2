/**
 * ROAD V65.6.4 — mandala master: reconstrução completa em 1254×1254.
 * Não usa manchas/máscaras para cobrir texto pré-existente.
 * Reutiliza a imagem oficial do símbolo sem distorção.
 * Montserrat 400 original é usada só para renderizar o PNG,
 * sem incluir arquivos de fontes nos resultados entregues.
 * A imagem NÃO será ativada no site antes da validação do usuário.
 */
import {readFile,writeFile} from "node:fs/promises";
import {chromium} from "playwright";
const W=1254;
const mark=await readFile("public/assets/road-symbol-watermark.png");
const font=await readFile("node_modules/@fontsource/montserrat/files/montserrat-latin-400-normal.woff2");
const uri="data:image/png;base64,"+mark.toString("base64");
const fontUri="data:font/woff2;base64,"+font.toString("base64");
const source="public/assets/road-mandala-master-1254.svg";
const output="public/assets/road-mandala-master-1254.png";
const svg=[
'<svg xmlns="http://www.w3.org/2000/svg" width="1254" height="1254" viewBox="0 0 1254 1254" role="img" aria-label="Mandala ROAD: Investimentos, Legado, Capital e Planejamento">',
'<title>ROAD Wealth — Mandala matriz 1254×1254</title>',
'<desc>Mandala reconstruída com fundo, arcos, símbolo oficial e textos novos em camadas limpas.</desc>',
'<defs>',
'<radialGradient id="bg" cx="50%" cy="43%" r="77%"><stop offset="0" stop-color="#FCF9F4"/><stop offset=".58" stop-color="#F8F1E9"/><stop offset="1" stop-color="#EEE2D6"/></radialGradient>',
'<linearGradient id="arc" x1="0%" y1="0%" x2="100%" y2="85%"><stop offset="0" stop-color="#BFA38B" stop-opacity=".28"/><stop offset=".44" stop-color="#614333" stop-opacity=".96"/><stop offset="1" stop-color="#CDB7A5" stop-opacity=".27"/></linearGradient>',
'<linearGradient id="tick" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0" stop-color="#BFA38B" stop-opacity=".1"/><stop offset=".5" stop-color="#5B3D2C" stop-opacity=".87"/><stop offset="1" stop-color="#BFA38B" stop-opacity=".1"/></linearGradient>',
'<style><![CDATA[text{font-family:Montserrat,Arial,sans-serif;font-style:normal;font-weight:400;text-rendering:geometricPrecision}.title{fill:#342018;font-size:35px;letter-spacing:3px}.sub{fill:#664C39;font-size:16px;letter-spacing:6px}]]></style>',
'</defs>',
'<rect width="1254" height="1254" fill="url(#bg)"/>',
'<g fill="none" stroke="url(#arc)" stroke-width="1.35" stroke-linecap="round">',
'<path d="M174 479 C212 324 330 178 516 127"/>',
'<path d="M740 130 C918 178 1043 323 1083 492"/>',
'<path d="M1075 715 C1035 868 920 1006 779 1055"/>',
'<path d="M476 1055 C328 1004 214 862 176 713"/>',
'</g>',
'<g fill="none" stroke="url(#tick)" stroke-width="1.35" stroke-linecap="round"><path d="M627 41 L627 182"/><path d="M182 532.5 L295 532.5"/><path d="M959 532.5 L1077 532.5"/><path d="M627 882 L627 970"/></g>',
'<g fill="#31190F"><circle cx="627" cy="123" r="6.2"/><circle cx="182" cy="532.5" r="6.2"/><circle cx="1077" cy="532.5" r="6.2"/><circle cx="627" cy="935" r="6.2"/></g>',
'<image href="'+uri+'" x="420" y="376" width="415" height="475" opacity=".105" preserveAspectRatio="xMidYMid meet"/>',
'<g text-anchor="middle">',
'<text class="title" x="627" y="240">INVESTIMENTOS</text>',
'<text class="sub" x="627" y="281">CAPITAL PARA</text>',
'<text class="sub" x="627" y="310">O SEU AMANHÃ</text>',
'<text class="title" x="200" y="600" style="font-size:29px;letter-spacing:2.2px">PLANEJAMENTO</text>',
'<text class="sub" x="200" y="640" style="font-size:15.5px;letter-spacing:5.3px">DO COTIDIANO</text>',
'<text class="sub" x="200" y="670" style="font-size:15.5px;letter-spacing:5.3px">AO FUTURO</text>',
'<text class="title" x="1055" y="600">LEGADO</text>',
'<text class="sub" x="1055" y="640">CONTINUIDADE</text>',
'<text class="sub" x="1055" y="669" style="font-size:15px;letter-spacing:5.4px">PARA AS PRÓXIMAS</text>',
'<text class="sub" x="1055" y="698">GERAÇÕES</text>',
'<text class="title" x="627" y="1027">CAPITAL</text>',
'<text class="sub" x="627" y="1068">RECURSOS PARA</text>',
'<text class="sub" x="627" y="1098">CADA CAMINHO</text>',
'</g></svg>'
].join("\n");
await writeFile(source,svg,"utf8");
const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage({viewport:{width:W,height:W},deviceScaleFactor:1});
  const html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>'+
    '@font-face{font-family:Montserrat;src:url("'+fontUri+'") format("woff2");font-weight:400;font-style:normal}'+
    'html,body{margin:0;width:1254px;height:1254px;background:#F8F1E9}svg{display:block;width:1254px;height:1254px}'+
    '</style></head><body>'+svg+'</body></html>';
  await page.setContent(html,{waitUntil:"load"});
  await page.evaluate(async()=>{await document.fonts.load("400 35px Montserrat");await document.fonts.ready;});
  if(!await page.evaluate(()=>document.fonts.check("400 35px Montserrat")))throw Error("Fonte original não carregada");
  const metrics=await page.evaluate(()=>[...document.querySelectorAll("svg text")].map(el=>{
    const b=el.getBoundingClientRect();return {name:el.textContent,x:Math.round(b.left),right:Math.round(b.right),width:Math.round(b.width)};
  }));
  for(const x of metrics)if(x.x<12||x.right>W-12)throw Error("Texto além do limite "+JSON.stringify(x));
  const png=await page.locator("svg").screenshot({animations:"disabled"});
  await writeFile(output,png);
  console.log("ROAD mandala MASTER 1254×1254, sem remendos; Montserrat 400");
  console.log("labels",JSON.stringify(metrics));
  console.log("arquivos",source,svg.length,"bytes",output,png.length,"bytes");
}finally{await browser.close();}
