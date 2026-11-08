import assert from "node:assert/strict";
import {chromium} from "playwright";
import sharp from "sharp";

const browser=await chromium.launch({headless:true});
const routes=["/","/investimentos/","/a-road/","/patrimonio/","/conhecimento/","/contato/","/avisos-legais/","/privacidade/","/calculadora-ir/"];
function check(condition,msg){assert.ok(condition,msg);}
async function open(page,base,route){
  await page.goto(base+route,{waitUntil:"domcontentloaded"});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(130);
}
try{
  for(const width of [320,360,375,390,430]){
    const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
    for(const route of routes){
      await open(page,"http://127.0.0.1:4322",route);
      const result=await page.evaluate(()=>{
        const sw=document.documentElement.scrollWidth;
        const vw=document.documentElement.clientWidth;
        const outside=[...document.querySelectorAll("main :is(h1,h2,h3,p,.card,article)")].filter(el=>!el.closest(".section-nav") && el.getClientRects().length).map(el=>{
          const r=el.getBoundingClientRect();const st=getComputedStyle(el);
          return {tag:el.tagName,className:el.className,text:(el.textContent||"").trim().slice(0,65),left:r.left,right:r.right,width:r.width,font:st.fontSize};
        }).filter(a=>a.left< -2 || a.right>vw+2);
        const h=document.querySelector(".road-remuneration h2");
        const h3=document.querySelector(".road-remuneration-cards h3");
        const body=document.querySelector(".road-remuneration-cards p");
        return {
          sw,vw,outside:outside.slice(0,6),
          remunerationHeading:h?parseFloat(getComputedStyle(h).fontSize):null,
          remunerationCardTitle:h3?parseFloat(getComputedStyle(h3).fontSize):null,
          remunerationText:body?parseFloat(getComputedStyle(body).fontSize):null
        };
      });
      check(result.sw<=result.vw+1,route+" page lateral overflow "+width+": "+JSON.stringify(result));
      check(result.outside.length===0,route+" text/card overflow "+width+": "+JSON.stringify(result.outside));
      if(route==="/investimentos/"){
        check(result.remunerationHeading<=34, "investimentos heading too large "+width);
        check(result.remunerationCardTitle<=18.1,"card title too large "+width);
        check(result.remunerationText<=15.1,"card text too large "+width);
      }
      if(route==="/a-road/"){
        const last=page.locator('[data-chapter-link="faca-parte"]');
        await last.click();
        await page.waitForTimeout(300);
        const bounds=await last.evaluate(el=>{
          const r=el.getBoundingClientRect();return{left:r.left,right:r.right,vw:document.documentElement.clientWidth};
        });
        check(bounds.left>=-2 && bounds.right<=bounds.vw+2,"active tab should appear on screen "+JSON.stringify(bounds));
      }
    }
    console.log("MOBILE-FIT V65.6.2 OK "+width+"px; "+routes.length+" páginas");
    await page.close();
  }
  for(const route of ["/","/investimentos/","/a-road/"]){
    const baseline=await browser.newPage({viewport:{width:1280,height:850},deviceScaleFactor:1,reducedMotion:"reduce"});
    const candidate=await browser.newPage({viewport:{width:1280,height:850},deviceScaleFactor:1,reducedMotion:"reduce"});
    await open(baseline,"http://127.0.0.1:4321",route);
    await open(candidate,"http://127.0.0.1:4322",route);
    const a=await baseline.locator("main").screenshot({animations:"disabled"});
    const b=await candidate.locator("main").screenshot({animations:"disabled"});
    const [ia,ib]=await Promise.all([sharp(a).ensureAlpha().raw().toBuffer({resolveWithObject:true}),sharp(b).ensureAlpha().raw().toBuffer({resolveWithObject:true})]);
    assert.deepEqual(ia.info,ib.info,route+" desktop dimensions changed");
    let changed=0;
    for(let i=0;i<ia.data.length;i+=4){
      if(ia.data[i]!==ib.data[i]||ia.data[i+1]!==ib.data[i+1]||ia.data[i+2]!==ib.data[i+2]||ia.data[i+3]!==ib.data[i+3])changed++;
    }
    const ratio=changed/(ia.info.width*ia.info.height);
    check(ratio<=.001,route+" desktop visual changed "+ratio);
    console.log("DESKTOP 1280px "+route+" changed pixels "+changed+"; ratio "+ratio);
    await Promise.all([baseline.close(),candidate.close()]);
  }
} finally {await browser.close();}
