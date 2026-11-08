import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";

const browser = await chromium.launch({headless:true});
const snapshots = "/tmp/road-v62-screens";
mkdirSync(snapshots,{recursive:true});
try {
  for(const width of [390,320]) {
    const context=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
    const page=await context.newPage();
    await page.goto("http://127.0.0.1:4321/",{waitUntil:"domcontentloaded"});
    await page.waitForTimeout(450);
    const cta=page.locator('.hero .actions a[href="/patrimonio/#checkup-road"]');
    assert(await cta.count()===1,"CTA home Check-up missing");
    await cta.scrollIntoViewIfNeeded();
    const cb=await cta.boundingBox();
    assert(cb && cb.width>70 && cb.x>=0 && cb.x+cb.width<=width+2,"CTA out of mobile viewport");
    await cta.click();
    await page.waitForURL(url=>url.pathname.includes("/patrimonio/") && url.hash==="#checkup-road");
    await page.waitForTimeout(750);
    const section=await page.locator("#checkup-road").boundingBox();
    const heading=await page.locator("#checkup-road h2").boundingBox();
    assert(section && Math.abs(section.x)<2 && Math.abs(section.width-width)<3,
      "Check-up section shifted: "+JSON.stringify(section));
    assert(heading && heading.x>=12 && heading.x+heading.width<=width-11,
      "Check-up heading out of frame: "+JSON.stringify(heading));
    await page.screenshot({path:snapshots+"/checkup-"+width+".png"});
    // A entrada compacta da V63 ocupa apenas parte da tela. O modo de
    // leitura se aplica quando as perguntas alcançam os controles flutuantes.
    await page.locator("#open-checkup").click();
    await page.locator("#checkup-flow").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.body.classList.contains("road-mobile-reading-zone"));
    assert.equal(await page.locator("body.road-mobile-reading-zone").count(),1,
      "Mobile reading mode not activated in Check-up");
    const utilityVisibility=await page.locator("#mobile-utility").evaluate(el=>getComputedStyle(el).visibility);
    assert.equal(utilityVisibility,"hidden","Utility tab overlays Check-up");

    await page.locator(".footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const footer=await page.locator(".footer").boundingBox();
    assert(footer && footer.height<175,"Footer too tall: "+JSON.stringify(footer));
    const address = await page.locator(".footer-address").innerText();
    assert.deepEqual(address.trim().split(/\n+/).map(line => line.trim()), [
      "Rua Pater Josef Stefan, 1249", "Colônia Vitória · Entre Rios · Guarapuava/PR"
    ]);
    // Margens iniciais iguais: o texto da rua deve começar exatamente em "Colônia Vitória".
    const textStarts=await page.evaluate(()=>{
      const street=document.querySelector(".footer-address-street");
      const locality=document.querySelector(".footer-neighborhood");
      const streetRange=document.createRange();
      streetRange.selectNodeContents(street);
      const localityRange=document.createRange();
      localityRange.selectNodeContents(locality);
      return {street:streetRange.getBoundingClientRect().left,
        locality:localityRange.getBoundingClientRect().left};
    });
    assert(Math.abs(textStarts.street-textStarts.locality)<=1,
      "Linhas do endereço desalinhadas em "+width+"px: "+JSON.stringify(textStarts));
    const localitySize=await page.locator(".footer-address-locality").evaluate(el=>({
      available:el.clientWidth, occupied:el.scrollWidth,
      lineHeight:getComputedStyle(el).lineHeight
    }));
    assert(localitySize.occupied<=localitySize.available+1,
      "Localidade transborda a coluna em "+width+"px: "+JSON.stringify(localitySize));
    const labels=await page.locator(".footer-links a").all();
    assert.equal(labels.length,3);
    const rowBoxes=await Promise.all(labels.map(x=>x.boundingBox()));
    assert(rowBoxes.every(b=>b&&b.x>=-1&&b.x+b.width<width+1));
    assert(Math.max(...rowBoxes.map(b=>b.y))-Math.min(...rowBoxes.map(b=>b.y))<5,
      "Legal links stack unexpectedly");
    await page.screenshot({path:snapshots+"/footer-"+width+".png"});
    console.log(JSON.stringify({width,sectionWidth:section.width,headingX:heading.x,
      footerHeight:footer.height,legalLinksY:rowBoxes.map(b=>b.y)}));
    await context.close();
  }
} finally {
  await browser.close();
}
