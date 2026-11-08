import assert from "node:assert/strict";
import {chromium} from "playwright";

const browser=await chromium.launch({headless:true});
let pageErrors=[];
try{
  for(const viewport of [{width:390,height:844},{width:1280,height:800}]){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    page.on("pageerror",e=>pageErrors.push(e.message));
    await page.goto("http://127.0.0.1:4321/",{waitUntil:"domcontentloaded"});
    assert.equal(await page.locator('.hero-road-photo__content h1').count(),1);
    assert.equal(await page.locator('a[href="/investimentos/#remuneracao"]').count(),1);
    const heading=await page.locator('.hero-road-photo__content h1').innerText();
    assert.match(heading,/Seu patrimônio,[\s\S]*seu legado,[\s\S]*seu caminho\./);
    await page.goto("http://127.0.0.1:4321/investimentos/",{waitUntil:"domcontentloaded"});
    assert.equal(await page.locator("#remuneracao").count(),1);
    assert.equal(await page.locator(".road-remuneration-cards article").count(),3);
    assert.equal(await page.locator("#para-quem article").count(),4);
    assert.equal(await page.locator("#como-comecar article").count(),3);
    const width=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    assert.ok(width.scroll<=width.client+2,"investimentos sem overflow horizontal: "+JSON.stringify(width));
    await page.goto("http://127.0.0.1:4321/patrimonio/",{waitUntil:"domcontentloaded"});
    assert.equal(await page.locator('#road-result-contact').count(),1);
    assert.equal(await page.locator('#road-result-marketing').count(),1);
    assert.equal(await page.getByText("LinkedIn",{exact:true}).count(),0);
    await page.goto("http://127.0.0.1:4321/conhecimento/",{waitUntil:"domcontentloaded"});
    assert.equal(await page.getByText("Em breve",{exact:true}).count(),2);
    await page.goto("http://127.0.0.1:4321/avisos-legais/",{waitUntil:"domcontentloaded"});
    assert.match(await page.locator("#identificacao").innerText(),/68\.642\.253\/0001-00/);
    console.log("V65.4 UI OK",viewport.width);
    await page.close();
  }
  assert.deepEqual(pageErrors,[]);
}finally{await browser.close();}
