import assert from "node:assert/strict";
import {chromium} from "playwright";

const browser=await chromium.launch({headless:true});
try{
  for(const width of [320,390,1280]){
    const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1});
    const errors=[];
    page.on("pageerror",e=>errors.push(e.message));
    for(const route of ["/","/investimentos/","/patrimonio/","/a-road/"]){
      await page.goto("http://127.0.0.1:4321"+route,{waitUntil:"domcontentloaded"});
      const box=await page.evaluate(()=>({
        cw:document.documentElement.clientWidth,
        sw:document.documentElement.scrollWidth,
        titleFont:getComputedStyle(document.querySelector("main h1,main h2")).fontFamily,
        bodyFont:getComputedStyle(document.body).fontFamily
      }));
      assert.ok(box.sw<=box.cw+2,route+" overflow "+width+": "+JSON.stringify(box));
      assert.match(box.titleFont,/Questrial/);
      assert.match(box.bodyFont,/Lato/);
      assert.match(await page.locator('meta[property="og:image"]').getAttribute("content"),/road-og.png/);
      assert.equal(await page.locator('meta[name="robots"]').count(),0);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://roadwealth.com.br"+route);
      if(route==="/"){
        const img=page.locator('img[src="/assets/road-mandala-master-1254.webp"]');
        assert.equal(await img.count(),1);
        assert.equal(await page.locator(".road-mandala-names").count(),0,"Sem sobreposição de nomes");
        assert.equal(await page.locator("img[src='/assets/road-areas-approved.webp']").count(),0,"Sem imagem antiga");
        await img.evaluate(el=>el.decode());
        assert.equal(await img.evaluate(el=>el.naturalWidth>0),true);
        const logos=page.locator('.platform-logo');
        assert.ok((await logos.count())>=16);
        await logos.first().evaluate(el=>el.decode());
      }
    }
    assert.deepEqual(errors,[],"sem erro de script ao navegar");
    console.log("V65.5 VISUAL CHECK OK",width);
    await page.close();
  }
}finally{await browser.close();}
