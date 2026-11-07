import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";

const browser = await chromium.launch({headless:true});
const dir = "/tmp/road-v62-1-header";
mkdirSync(dir,{recursive:true});
try {
  for (const width of [320,390,430]) {
    const ctx=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
    const page=await ctx.newPage();
    await page.goto("http://127.0.0.1:4321/",{waitUntil:"domcontentloaded"});
    await page.waitForTimeout(350);
    const geometry=await page.evaluate(()=>{
      const header=document.querySelector(".site-header");
      const logo=header?.querySelector(".brand img");
      const partner=header?.querySelector(".header-network-endorsement img");
      const toggle=header?.querySelector(".nav-toggle");
      const group=header?.querySelector(".header-brand-group");
      const rect=el=>{const b=el.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,bottom:b.bottom,right:b.right};};
      return {header:rect(header),logo:rect(logo),partner:rect(partner),toggle:rect(toggle),group:rect(group),source:logo.getAttribute("src"),partnerSource:partner.getAttribute("src"),headerHeight:getComputedStyle(header).height};
    });
    assert.match(geometry.source,/road-logo-areia\.svg$/);
    assert.match(geometry.partnerSource,/rede-meu-patrimonio-box-branca\.svg$/);
    for (const name of ["logo","partner","toggle"]) {
      const box=geometry[name];
      assert(box.y>=geometry.header.y+7, name+" top cut @"+width+": "+JSON.stringify(geometry));
      assert(box.bottom<=geometry.header.bottom-7, name+" bottom cut @"+width+": "+JSON.stringify(geometry));
      assert(box.x>=0&&box.right<=width, name+" out of viewport @"+width);
    }
    // Diretriz de branding: a chancela da Rede alinha pela BASE da ROAD,
    // e não pelo centro das duas imagens.
    assert(Math.abs(geometry.logo.bottom-geometry.partner.bottom)<1,
      "partner logo must align to ROAD bottom @"+width+": "+JSON.stringify(geometry));
    assert(Math.abs(geometry.logo.width-42)<0.1,
      "ROAD logo must preserve original mobile width 42px @"+width);
    assert(Math.abs(geometry.partner.width-60)<0.1,
      "Meu Patrimônio logo must preserve original width 60px @"+width);
    assert(Math.abs(geometry.header.height-86)<1,"header height @"+width+" was "+geometry.header.height);
    await page.screenshot({path:dir+"/header-mobile-"+width+".png",fullPage:false});
    await page.locator(".nav-toggle").click();
    const nav=await page.locator(".site-header .nav.open").boundingBox();
    assert(nav,"menu does not open @"+width);
    assert(nav.y>=geometry.header.bottom-2,"menu overlays header @"+width+": "+JSON.stringify({nav,geometry}));
    await ctx.close();
    console.log(JSON.stringify({width,headerHeight:geometry.header.height,logo:geometry.logo,partner:geometry.partner,menuTop:nav.y}));
  }
  const ctx=await browser.newContext({viewport:{width:1280,height:820},deviceScaleFactor:1});
  const page=await ctx.newPage();
  await page.goto("http://127.0.0.1:4321/",{waitUntil:"domcontentloaded"});
  const desktop=await page.locator(".site-header").boundingBox();
  assert(desktop.height<86,"desktop header was unexpectedly enlarged: "+JSON.stringify(desktop));
  const menu=await page.locator(".site-header .nav").evaluate(el=>getComputedStyle(el).position);
  assert.notEqual(menu,"absolute","desktop should keep navigation flow");
  console.log(JSON.stringify({desktopWidth:1280,desktopHeight:desktop.height}));
  await ctx.close();
} finally {await browser.close()}
