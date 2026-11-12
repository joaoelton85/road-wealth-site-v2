import assert from "node:assert/strict";
import sharp from "sharp";
import {chromium} from "playwright";

const before="http://127.0.0.1:4321";
const after="http://127.0.0.1:4322";
const browser=await chromium.launch({headless:true});
const errors=[];
async function visit(page,url){
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto(url,{waitUntil:"domcontentloaded"});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(120);
}
async function sameImage(baseline,revision,desc){
  const [a,b]=await Promise.all([sharp(baseline).ensureAlpha().raw().toBuffer({resolveWithObject:true}),sharp(revision).ensureAlpha().raw().toBuffer({resolveWithObject:true})]);
  assert.equal(a.info.width,b.info.width,desc+" width changed");
  assert.equal(a.info.height,b.info.height,desc+" height changed");
  let changed=0;
  for(let i=0;i<a.data.length;i+=4){
    if(a.data[i]!==b.data[i]||a.data[i+1]!==b.data[i+1]||a.data[i+2]!==b.data[i+2]||a.data[i+3]!==b.data[i+3]) changed++;
  }
  const ratio=changed/(a.info.width*a.info.height);
  assert.ok(ratio<=0.0015,desc+" differs unexpectedly "+(ratio*100).toFixed(3)+"%");
  console.log("MOBILE EQUIVALENCE",desc,"differentPixels",changed,"ratio",ratio);
}
try{
  for(const width of [1024,1280,1440,1920]){
    const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:"reduce"});
    await visit(page,after+"/");
    const result=await page.evaluate(async()=>{
      await document.fonts.load('500 13px "ROAD Montserrat Menu"');
      await document.fonts.load('600 12px "ROAD Montserrat Menu"');
      const sel=x=>document.querySelector(x);
      const style=x=>getComputedStyle(sel(x));
      const nav=sel(".nav-main");
      const navbox=nav.getBoundingClientRect();
      const header=sel(".site-header").getBoundingClientRect();
      const ticker=sel(".market-ticker-row--desktop .market-ticker-label");
      const label=sel(".road-highlights__label-text");
      const text=sel(".road-highlights__slide.is-active .road-highlights__slide-copy");
      const slide=sel(".road-highlights__slide.is-active");
      const sc=getComputedStyle(text);
      return {
        navFont:style(".site-header .nav-main>a").fontFamily,
        navCount:nav.querySelectorAll("a").length,
        navBounds:{left:navbox.left,right:navbox.right,headerRight:header.right},
        tickerFont:getComputedStyle(ticker).fontFamily,
        labelFont:getComputedStyle(label).fontFamily,
        copyFont:sc.fontFamily,
        copySize:parseFloat(sc.fontSize),
        copyWidth:text.getBoundingClientRect().width,
        copyScroll:text.scrollWidth,
        slideHeight:slide.getBoundingClientRect().height,
        fontsReady:document.fonts.check('500 13px "ROAD Montserrat Menu"'),
        pageWidth:document.documentElement.scrollWidth,
        viewport:document.documentElement.clientWidth
      };
    });
    assert.equal(result.navCount,4,"quatro itens de menu");
    assert.match(result.navFont,/ROAD Montserrat Menu/);
    assert.match(result.tickerFont,/ROAD Montserrat Menu/);
    assert.match(result.labelFont,/ROAD Montserrat Menu/);
    assert.doesNotMatch(result.copyFont,/ROAD Inter Destaques/);
    assert.equal(result.fontsReady,true,"fontes carregadas no desktop");
    assert.ok(Math.abs(result.copySize-16)<.1,"Destaques padrão anterior: "+result.copySize);
    assert.ok(result.navBounds.left>=-2 && result.navBounds.right<=result.navBounds.headerRight+2,"menu ultrapassou o cabeçalho");
    assert.ok(result.pageWidth<=result.viewport+2,"scroll horizontal desktop");
    assert.ok(result.slideHeight>0 && result.copyWidth>0,"texto Destaques visível");
    console.log("DESKTOP FONT OK",JSON.stringify({width,...result}));
    await page.close();
  }
  for(const width of [320,390,430]){
    const context={viewport:{width,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:"reduce"};
    const a=await browser.newPage(context);
    const b=await browser.newPage(context);
    await visit(a,before+"/");
    await visit(b,after+"/");
    // A fita externa do TradingView carrega em momentos diferentes nas duas
    // prévias. Ocultá-la SÓ durante a captura elimina falsos positivos, sem
    // mudar seu tamanho nem o conteúdo da página real.
    for (const page of [a,b]) {
      await page.locator(".market-ticker-shell").evaluate(el=>{el.style.visibility="hidden";});
    }
    // A mandala foi substituída propositalmente na V65.9.
    // Mantém-se a comparação pixel a pixel do restante do layout mobile,
    // mas mascara-se a arte aprovada nos DOIS estados, sem alterar sua geometria.
    for(const page of [a,b]){
      await page.locator(".road-mandala").evaluate(el=>{ el.style.visibility="hidden"; });
    }
    // O topo contém um iframe externo, que não pode ser comparado por pixels
    // entre dois carregamentos independentes. Compara-se sua geometria e
    // tipografia, mantendo comparação pixel a pixel nos blocos estáticos.
    const topGeometry=async page=>page.evaluate(()=>{
      const selectors=[".site-top-stack",".site-header",".header-brand-group",
        ".site-header .brand img",".site-header .header-network-endorsement img",
        ".market-ticker-mobile-label",".site-top-stack .road-market-note"];
      return selectors.map(selector=>{
        const node=document.querySelector(selector);
        if(!node) return {selector,exists:false};
        const bounds=node.getBoundingClientRect(),style=getComputedStyle(node);
        return {selector,exists:true,
          x:Math.round(bounds.x*10)/10,y:Math.round(bounds.y*10)/10,
          w:Math.round(bounds.width*10)/10,h:Math.round(bounds.height*10)/10,
          font:style.fontFamily,color:style.color};
      });
    });
    assert.deepEqual(await topGeometry(a),await topGeometry(b),
      "Geometria e tipografia do topo Mobile devem permanecer idênticas");
    for(const selector of [".road-highlights","main"]){
      const [aa,bb]=await Promise.all([a.locator(selector).screenshot({animations:"disabled"}),b.locator(selector).screenshot({animations:"disabled"})]);
      await sameImage(aa,bb,selector+" "+width+"px");
    }
    const mobileFont=await b.locator(".road-highlights__slide-copy").first().evaluate(el=>getComputedStyle(el).fontFamily);
    assert.doesNotMatch(mobileFont,/ROAD Inter Destaques/);
    await Promise.all([a.close(),b.close()]);
  }
  assert.deepEqual(errors,[]);
  console.log("ROAD V65.6.4 TYPOGRAPHY — Destaques 16px, desktop menu unchanged; mobile unchanged.");
}finally{await browser.close();}
