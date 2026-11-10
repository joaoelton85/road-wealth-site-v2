/**
 * ROAD — matriz visual sem remendos.
 * Renderiza o SVG reconstruído a 2508 x 2508 px (2x a matriz original).
 * Não usa resize do PNG antigo nem a imagem remendada do site.
 * O arquivo SVG é o mestre editável; o PNG é uma exportação de alta definição.
 * Nenhum arquivo no site será trocado automaticamente.
 */
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const SOURCE="public/assets/road-mandala-master-1254.svg";
const OUTPUT="public/assets/road-mandala-master-2508.png";
const PX=2508;
const svg=await readFile(SOURCE,"utf8");
const font=await readFile("node_modules/@fontsource/montserrat/files/montserrat-latin-400-normal.woff2");
const fontUri="data:font/woff2;base64,"+font.toString("base64");

// As quatro áreas são escritas na mesma matriz, com a mesma família e peso.
for(const area of ["INVESTIMENTOS","LEGADO","CAPITAL","PLANEJAMENTO"]){
  const occurrences=svg.match(new RegExp(">"+area+"<","g"))||[];
  if(occurrences.length!==1)throw Error("Nome ausente ou duplicado: "+area);
}
if(/ESTRATÉGIA|DECISÕES/.test(svg))throw Error("Há rótulos obsoletos no SVG.");
if(/road-areas-approved|road-mandala-names|road-mandala-cream|<rect x="72"|<rect x="461"/.test(svg))
  throw Error("Arquivo não é a matriz limpa; detectado sinal de remendo.");

const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage({viewport:{width:PX,height:PX},deviceScaleFactor:1});
  const html='<html lang="pt-BR"><head><meta charset="UTF-8"><style>'+
    '@font-face{font-family:Montserrat;src:url("'+fontUri+'") format("woff2");font-weight:400;font-style:normal}'+
    '*{box-sizing:border-box}html,body{margin:0;width:'+PX+'px;height:'+PX+'px}'+
    'svg{display:block;width:'+PX+'px;height:'+PX+'px}'+
    '</style></head><body>'+svg+'</body></html>';
  await page.setContent(html,{waitUntil:"load"});
  await page.evaluate(async()=>{await document.fonts.load("400 35px Montserrat");await document.fonts.ready;});
  const info=await page.evaluate(()=>{
    const texts=[...document.querySelectorAll("svg text")];
    const headings=texts.filter(e=>["INVESTIMENTOS","LEGADO","CAPITAL","PLANEJAMENTO"].includes(e.textContent.trim()));
    return headings.map(el=>({
      text:el.textContent.trim(),
      family:getComputedStyle(el).fontFamily,
      weight:getComputedStyle(el).fontWeight,
      color:getComputedStyle(el).fill,
      x:Math.round(el.getBoundingClientRect().left),
      right:Math.round(el.getBoundingClientRect().right)
    }));
  });
  if(info.length!==4||info.some(i=>i.family!=="Montserrat, Arial, sans-serif"||i.weight!=="400"||i.x<0||i.right>PX))
    throw Error("Tipografia e limites inconsistentes: "+JSON.stringify(info));
  const png=await page.locator("svg").screenshot({animations:"disabled",type:"png"});
  await writeFile(OUTPUT,png);
  console.log("ROAD MANDALA HD: "+PX+" x "+PX+"; fonte única Montserrat 400.");
  console.log("Títulos: "+JSON.stringify(info));
  console.log("Exportação: "+OUTPUT+" ("+png.length+" bytes)");
}finally{await browser.close();}
