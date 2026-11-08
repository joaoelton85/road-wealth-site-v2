import assert from "node:assert/strict";
import {chromium} from "playwright";

const browser=await chromium.launch({headless:true});
let errors=0;
try{
  for(const viewport of [{width:390,height:844},{width:1280,height:820}]){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const sent=[];
    page.on("pageerror",error=>{errors++;console.error("PAGE ERROR:",error.message);});
    await page.addInitScript(()=>{
      window.turnstile={
        render:(_selector,options)=>{
          Promise.resolve().then(()=>options.callback("mock-turnstile-token"));
          return "mock-widget";
        },
        reset:()=>{}
      };
    });
    await page.route("**/api/talents-config",route=>route.fulfill({
      status:200,contentType:"application/json",
      body:JSON.stringify({enabled:true,siteKey:"test-public"})
    }));
    await page.route("**/api/talent-apply",async route=>{
      const data=route.request().postDataJSON();
      sent.push(data);
      await route.fulfill({status:202,contentType:"application/json",body:JSON.stringify({success:true,message:"Sua apresentação foi recebida. Enviamos uma confirmação para seu e-mail."})});
    });
    await page.goto("http://127.0.0.1:4321/a-road/",{waitUntil:"domcontentloaded"});
    await page.locator('[data-chapter-link="faca-parte"]').click();
    const section=page.locator("#faca-parte");
    await section.waitFor({state:"visible"});
    const form=page.locator("#road-career-form");
    assert.equal(await form.isVisible(),true);
    await form.locator('[name="name"]').fill("Ana Teste");
    await form.locator('[name="phone"]').fill("(42) 99999-1234");
    await form.locator('[name="email"]').fill("ana@example.com");
    await form.locator('[name="linkedIn"]').fill("https://www.linkedin.com/in/ana-teste/");
    await form.locator('[name="marketExperience"]').selectOption("sim");
    await form.locator('[name="clientPortfolio"]').selectOption("nao");
    assert.equal(await form.locator('[name="custodyRange"]').inputValue(),"nao_se_aplica");
    await form.locator('[name="interestArea"]').selectOption("investimentos");
    await form.locator('[name="story"]').fill("Tenho experiência com investimentos e quero conversar com a ROAD.");
    await form.locator('[name="consent"]').check();
    await page.locator('#road-career-turnstile').waitFor({state:"attached"});
    await form.locator('button[type="submit"]').click();
    await page.getByText("Sua apresentação foi recebida.",{exact:false}).waitFor({state:"visible"});
    assert.equal(sent.length,1,"não reenviar formulário");
    assert.equal(sent[0].marketExperience,"sim");
    assert.equal(sent[0].custodyRange,"nao_se_aplica");
    assert.equal(sent[0].consent,true);
    assert.equal(sent[0].turnstileToken,"mock-turnstile-token");
    assert.equal(await section.isVisible(),true,"navegação não esconde formulário");
    assert.equal(await form.locator('button[type="submit"]').isDisabled(),true);
    console.log("CAREER UI OK",viewport.width,"width");
    await page.close();
  }
  assert.equal(errors,0,"sem exceções no navegador");
}finally{await browser.close();}
