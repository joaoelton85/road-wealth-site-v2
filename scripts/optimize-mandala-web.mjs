/**
 * ROAD — exportações WebP para o site derivadas apenas da matriz de alta definição
 * aprovada, sem redimensionar a imagem antiga ou sobrepor textos.
 * Fontes, cor, símbolo e transparência já estão rasterizados nos PNGs mestres.
 */
import { access, stat } from "node:fs/promises";
import sharp from "sharp";

const sizes=[1254,2508];
for (const size of sizes) {
  const input=`public/assets/road-mandala-master-${size}.png`;
  const output=`public/assets/road-mandala-master-${size}.webp`;
  await access(input);
  const info=await sharp(input).metadata();
  if(info.format!=="png"||info.width!==size||info.height!==size)
    throw Error("Matriz inválida: "+input+" "+JSON.stringify(info));
  await sharp(input).webp({lossless:true,effort:6}).toFile(output);
  const webp=await sharp(output).metadata();
  if(webp.format!=="webp"||webp.width!==size||webp.height!==size)
    throw Error("Exportação WebP inválida: "+output);
  console.log(output+": "+(await stat(output)).size+" bytes (matriz PNG: "+(await stat(input)).size+" bytes)");
}
