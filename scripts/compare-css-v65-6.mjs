import assert from "node:assert/strict";
import {mkdirSync,writeFileSync} from "node:fs";
import sharp from "sharp";
import {chromium} from "playwright";

const baseline="http://127.0.0.1:4321";
const candidate="http://127.0.0.1:4322";
const routes=["/","/investimentos/","/patrimonio/","/a-road/","/conhecimento/","/calculadora-ir/"];
const widths=[390,1280];
const dir="/tmp/road-v65-6-comparison";
mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true});

async function capture(origin,route,width){
  const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
  const pageErrors=[];
  page.on("pageerror",e=>pageErrors.push(e.message));
  await page.goto(origin+route,{waitUntil:"domcontentloaded"});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(250);
  const size=await page.evaluate(()=>{
    const main=document.querySelector("main");
    const rect=main.getBoundingClientRect();
    return {width:rect.width,height:rect.height,scroll:document.documentElement.scrollWidth};
  });
  assert.ok(size.scroll<=width+2,"horizontal scroll "+origin+route+" "+width+" "+JSON.stringify(size));
  const buffer=await page.locator("main").screenshot({animations:"disabled"});
  assert.deepEqual(pageErrors,[],"pageerrors "+route);
  await page.close();
  return {buffer,size};
}
function compare(a,b,slug,width){
  const name=slug.replaceAll("/","_")||"home";
  writeFileSync(dir+"/before-"+name+"-"+width+".png",a.buffer);
  writeFileSync(dir+"/after-"+name+"-"+width+".png",b.buffer);
  assert.deepEqual(a.size,b.size,"layout dimensions changed "+slug+" "+width);
  return Promise.all([sharp(a.buffer).ensureAlpha().raw().toBuffer({resolveWithObject:true}),sharp(b.buffer).ensureAlpha().raw().toBuffer({resolveWithObject:true})]).then(([before,after])=>{
    assert.deepEqual(before.info,after.info,"image dimensions changed "+slug+" "+width);
    let changed=0;
    for(let k=0;k<before.data.length;k+=4){
      if(Math.abs(before.data[k]-after.data[k])>2||
         Math.abs(before.data[k+1]-after.data[k+1])>2||
         Math.abs(before.data[k+2]-after.data[k+2])>2||
         Math.abs(before.data[k+3]-after.data[k+3])>2)changed++;
    }
    const pixels=before.info.width*before.info.height;
    const ratio=changed/pixels;
    console.log(JSON.stringify({route:slug,width,pixels,changed,ratio}));
    assert.ok(ratio<=.0005,"Visual diff exceeds 0.05%: "+slug+" "+width+" -> "+(ratio*100).toFixed(4)+"%");
  });
}
try{
  for(const width of widths){
    for(const route of routes){
      const a=await capture(baseline,route,width);
      const b=await capture(candidate,route,width);
      await compare(a,b,route,width);
    }
  }
  console.log("V65.6 — comparação aprovada sem mudanças visuais.");
}finally{
  await browser.close();
}
