import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";

const browser=await chromium.launch({headless:true});
const dir="/tmp/road-v63-entry";
mkdirSync(dir,{recursive:true});
try {
  for(const width of [320,390,430]){
    const height=640;
    const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:true,hasTouch:true});
    const page=await ctx.newPage();
    await page.goto("http://127.0.0.1:4321/patrimonio/#checkup-road",{waitUntil:"domcontentloaded"});
    await page.waitForTimeout(700);
    const first=await page.evaluate(()=>{
      const rect=sel=>{const el=document.querySelector(sel);const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};};
      return {stack:rect(".site-top-stack"),section:rect("#checkup-road"),intro:rect("#checkup-road .checkup-entry"),button:rect("#open-checkup"),eyebrow:rect("#checkup-road .eyebrow"),height:innerHeight};
    });
    console.log("FIRST_SCREEN",JSON.stringify({width,first}));
    assert(first.section.x>=-2&&first.section.x+first.section.width<=width+2,"section shifted @"+width+": "+JSON.stringify(first));
    assert(first.eyebrow.y>=first.stack.bottom-2,"eyebrow hidden behind sticky top @"+width+": "+JSON.stringify(first));
    assert(first.button.bottom<height-12,"button not visible on first screen @"+width+": "+JSON.stringify(first));
    await page.screenshot({path:dir+"/first-screen-"+width+".png"});
    assert.equal(await page.locator("#checkup-road .checkup-entry .eyebrow").count(),1);
    assert.equal(await page.locator("#checkup-road .checkup-invite").count(),0);
    await page.locator("#open-checkup").click();
    assert(await page.locator("#checkup-profile").isVisible(),"profile selection should open");
    await page.locator('input[name="road-checkup-profile"][value="familiar"]').check();
    await page.locator("#begin-profile-checkup").click();
    assert(await page.locator("#checkup-flow").isVisible(),"questions should open after profile selection");
    assert.equal(await page.locator("#checkup-intro").count(),0);
    assert.equal(await page.locator("#checkup-final").isVisible(),false);
    assert.equal(await page.locator(".question").count(),4);
    await page.screenshot({path:dir+"/questions-"+width+".png"});
    for(const count of [4,5,2,5]){
      assert.equal(await page.locator(".question").count(),count,"unexpected question count");
      for(let i=0;i<count;i++){
        await page.locator(".question").nth(i).locator('button[data-value="sim"]').click();
      }
      await page.locator("#next-checkup").click();
    }
    assert(await page.locator("#checkup-final").isVisible(),"email gate not shown after 16 answers");
    assert(await page.locator("#road-result-email").isVisible(),"email input missing");
    assert.equal(await page.locator("#scoreboard-grid").count(),0);
    await page.screenshot({path:dir+"/email-"+width+".png"});
    console.log(JSON.stringify({width,height,stackBottom:first.stack.bottom,headingTop:first.eyebrow.y,buttonBottom:first.button.bottom,stage:"16 responses to email"}));
    await ctx.close();
  }
  // Cenário real: visita à Home e clique no botão permanente do Check-up.
  const mobile=await browser.newContext({viewport:{width:390,height:640},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const fromHome=await mobile.newPage();
  await fromHome.goto("http://127.0.0.1:4321/",{waitUntil:"domcontentloaded"});
  await fromHome.locator('.hero .actions a[href="/patrimonio/#checkup-road"]').click();
  await fromHome.waitForURL(url=>url.pathname==="/patrimonio/" && url.hash==="#checkup-road");
  await fromHome.waitForTimeout(700);
  const afterHome=await fromHome.evaluate(()=>{
    const r=document.querySelector("#open-checkup").getBoundingClientRect();
    const h=document.querySelector(".site-top-stack").getBoundingClientRect();
    return {buttonBottom:r.bottom,buttonTop:r.top,stackBottom:h.bottom,viewport:innerHeight};
  });
  assert(afterHome.buttonTop>=afterHome.stackBottom-2,"CTA from Home behind header: "+JSON.stringify(afterHome));
  assert(afterHome.buttonBottom<afterHome.viewport-12,"CTA from Home not in first screen: "+JSON.stringify(afterHome));
  await fromHome.screenshot({path:dir+"/home-to-checkup.png"});
  console.log("FROM_HOME",JSON.stringify(afterHome));
  await mobile.close();
  // Percurso Empresarial/Agro: quatro perguntas em cada área e e-mail correto.
  const agroCtx=await browser.newContext({viewport:{width:390,height:740},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const agroPage=await agroCtx.newPage();
  await agroPage.goto("http://127.0.0.1:4321/patrimonio/#checkup-road",{waitUntil:"domcontentloaded"});
  await agroPage.locator("#open-checkup").click();
  await agroPage.locator('input[name="road-checkup-profile"][value="empresarial"]').check();
  await agroPage.locator("#begin-profile-checkup").click();
  for(let step=0;step<4;step++){
    assert.equal(await agroPage.locator(".question").count(),4);
    for(let i=0;i<4;i++)await agroPage.locator(".question").nth(i).locator('button[data-value="sim"]').click();
    await agroPage.locator("#next-checkup").click();
  }
  assert(await agroPage.locator("#checkup-final").isVisible());
  assert.match(await agroPage.locator("#checkup-finished-profile").textContent(),/Empresarial \/ Agro/);
  await agroCtx.close();

  const ctx=await browser.newContext({viewport:{width:1280,height:800}});
  const page=await ctx.newPage();
  await page.goto("http://127.0.0.1:4321/",{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator('.hero .actions a[href="/patrimonio/#checkup-road"]').count(),1);
  assert.equal(await page.locator(".road-home-checkup-access").count(),0);
  assert.equal(await page.locator(".road-highlights").count(),1);
  await ctx.close();
} finally {await browser.close()}
