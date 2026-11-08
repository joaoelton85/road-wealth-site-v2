// V65.5 — sync de imagens aprovado: marca institucional e mandala, sem redesenho.\n// Traz a cópia das marcas institucionais para o repositório e
// otimiza a mandala. É executado uma vez na branch de preparação, não em cada request.
import {mkdir,readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir="public/assets/platforms";
await mkdir(outDir,{recursive:true});
const remote="https://www.meupatrimonio.com/rede/assets/orbit/";
const logos=[
 "c6-bank.png","t-group-2.png","t-vector.png","t-group.png",
 "t-group-1.png","inter.png","t-group-3.png","t-vector-1.png",
 "t-vector-2.png","t-desk.png","genial.png","t-image-74.png",
 "jpmorgan.png","interactive-brokers.png","avenue.png","nomad.png"
];
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function fetchLogo(name){
  const url=remote+name;
  let lastError;
  for(let attempt=1;attempt<=3;attempt++){
    try {
      const response=await fetch(url,{
        headers:{"User-Agent":"Mozilla/5.0 ROAD Wealth institutional media cache","Accept":"image/avif,image/webp,image/png,image/jpeg,image/svg+xml,*/*"},
        signal:AbortSignal.timeout(18000)
      });
      if(!response.ok)throw new Error("HTTP "+response.status+" "+url);
      const data=Buffer.from(await response.arrayBuffer());
      if(data.length<150 || data.length>2_000_000)throw new Error("Imagem inválida/tamanho fora do esperado: "+name);
      const meta=await sharp(data).metadata();
      if(!["png","jpeg","webp","svg","avif","gif"].includes(meta.format))throw new Error("Formato inesperado: "+meta.format+" "+name);
      const png=await sharp(data).png({compressionLevel:9}).toBuffer();
      await writeFile(path.join(outDir,name),png);
      console.log("Logo local:",name,"de",data.length,"para",png.length,"bytes");
      return;
    }catch(e){
      lastError=e;
      if(attempt<3)await sleep(1500*attempt);
    }
  }
  throw lastError;
}
// Evitar as conexões em paralelo sobrecarregarem o servidor da Rede.
for(const name of logos)await fetchLogo(name);

const mandate="public/assets/road-areas-approved.png";
const webp="public/assets/road-areas-approved.webp";
const optimized=await sharp(mandate).webp({quality:88,alphaQuality:100,effort:6}).toBuffer();
await writeFile(webp,optimized);
console.log("Mandala WebP:",optimized.length,"bytes");

const officialLogo=await readFile("public/assets/road-logo-cafe.svg");
const mark=await sharp(officialLogo).resize({width:260,height:390,fit:"inside",withoutEnlargement:true}).png().toBuffer();
const markInfo=await sharp(mark).metadata();
const image=await sharp({create:{width:1200,height:630,channels:4,background:"#F3ECE3"}})
  .composite([{input:mark,left:Math.round((1200-markInfo.width)/2),top:Math.round((630-markInfo.height)/2)}])
  .png({compressionLevel:9}).toBuffer();
await writeFile("public/assets/road-og.png",image);
console.log("ROAD OG image:",image.length,"bytes");
