import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser=await chromium.launch({headless:true});
const base="http://127.0.0.1:4321";
try{
  for(const width of [1024,1280,1440,1680,1920]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
    try{
      await page.goto(base+"/",{waitUntil:"domcontentloaded"});
      await page.evaluate(()=>document.fonts.ready);
      const b=await page.evaluate(()=>{
        const box=s=>document.querySelector(s).getBoundingClientRect();
        const mp=box(".site-header .header-network-endorsement img");
        const marketsLabel=box(".market-ticker-row--desktop .market-ticker-label");
        const marketsTrack=box(".market-ticker-row--desktop .market-ticker-track");
        const highlightsLabel=box(".road-highlights__label");
        const highlightsText=box(".road-highlights__slide.is-active .road-highlights__slide-copy");
        return {mpRight:mp.right,marketsLabelLeft:marketsLabel.left,marketsLabelRight:marketsLabel.right,
          trackLeft:marketsTrack.left,highlightsLabelLeft:highlightsLabel.left,
          highlightsLabelRight:highlightsLabel.right,highlightTextLeft:highlightsText.left,
          viewport:document.documentElement.clientWidth,pageWidth:document.documentElement.scrollWidth,
          iframeConfigUnchanged:document.querySelector(".market-ticker-scale-frame")!==null,
          labelText:document.querySelector(".market-ticker-label")?.textContent.trim()};
      });
      assert.equal(b.labelText,"MERCADOS");
      assert(b.iframeConfigUnchanged);
      assert(Math.abs(b.marketsLabelLeft-b.highlightsLabelLeft)<=2,"Rótulos deixam de compartilhar eixo: "+JSON.stringify(b));
      assert(b.trackLeft>b.marketsLabelRight,"Ticker deveria começar após a coluna MERCADOS: "+JSON.stringify(b));
      assert(b.highlightTextLeft>b.highlightsLabelRight,"Texto DESTAQUE fora da faixa: "+JSON.stringify(b));
      assert(Math.abs(b.trackLeft-b.mpRight-14)<=2,"Ticker não inicia após o logo MP: "+JSON.stringify(b));
      assert(Math.abs(b.highlightTextLeft-b.mpRight-14)<=2,"Texto não inicia após o logo MP: "+JSON.stringify(b));
      assert(b.pageWidth<=b.viewport+2,"Scroll horizontal no Desktop: "+JSON.stringify(b));
      console.log("DESKTOP ALIGN OK",width,JSON.stringify(b));
    }finally{await page.close();}
  }
  for(const width of [390,680,800,1000]){
    const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1,reducedMotion:"reduce"});
    try{
      await page.goto(base+"/",{waitUntil:"domcontentloaded"});
      const b=await page.evaluate(()=>{
        const css=getComputedStyle(document.querySelector(".road-highlights__slide.is-active"));
        return {
          declaredStart:getComputedStyle(document.documentElement).getPropertyValue("--road-content-desktop-start").trim(),
          paddingLeft:css.paddingLeft,
          viewport:document.documentElement.clientWidth,
          pageWidth:document.documentElement.scrollWidth
        };
      });
      assert.equal(b.declaredStart,"","Nova regra Desktop não pode afetar <=1000px: "+JSON.stringify(b));
      assert(b.pageWidth<=b.viewport+2,"Scroll horizontal no Mobile/Tablet: "+JSON.stringify(b));
      console.log("MOBILE/TABLET UNCHANGED",width,JSON.stringify(b));
    }finally{await page.close();}
  }
}finally{await browser.close();}
