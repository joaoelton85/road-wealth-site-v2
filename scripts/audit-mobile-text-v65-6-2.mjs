import {chromium} from "playwright";

const browser=await chromium.launch({headless:true});
const pages=["/","/investimentos/","/a-road/","/patrimonio/","/conhecimento/","/contato/","/avisos-legais/","/privacidade/","/calculadora-ir/","/glossario/"];
for(const width of [320,360,375,390,430]){
  const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  for(const route of pages){
    await page.goto("http://127.0.0.1:4321"+route,{waitUntil:"domcontentloaded"});
    await page.evaluate(()=>document.fonts.ready);
    const info=await page.evaluate(()=>{
      const vw=document.documentElement.clientWidth;
      const elems=[...document.querySelectorAll("main *")].filter(el=>el.getClientRects().length && getComputedStyle(el).visibility!=="hidden");
      const issues=elems.map(el=>{
        const r=el.getBoundingClientRect();
        const cs=getComputedStyle(el);
        return {tag:el.tagName.toLowerCase(),className:(typeof el.className==="string"?el.className:"").slice(0,90),txt:(el.textContent||"").trim().replace(/\s+/g," ").slice(0,85),x:Math.round(r.left),right:Math.round(r.right),w:Math.round(r.width),font:cs.fontSize,whiteSpace:cs.whiteSpace,overflowWrap:cs.overflowWrap,grid:cs.gridTemplateColumns,css:cs.fontFamily};
      }).filter(el=>el.x< -2||el.right>vw+2);
      const highlight=[".road-remuneration",".road-remuneration-cards",".road-investment-audience",".road-investment-start",".section-intro","main h1","main h2"].flatMap(sel=>{
        const el=document.querySelector(sel);
        if(!el)return[];
        const r=el.getBoundingClientRect();const cs=getComputedStyle(el);
        return[{sel,width:Math.round(r.width),x:Math.round(r.x),right:Math.round(r.right),font:cs.fontSize,lineHeight:cs.lineHeight}];
      });
      return {vw,sw:document.documentElement.scrollWidth,issues:issues.slice(0,20),issueCount:issues.length,highlight};
    });
    console.log("ROAD MOBILE AUDIT "+JSON.stringify({route,width,...info}));
  }
  await page.close();
}
await browser.close();
