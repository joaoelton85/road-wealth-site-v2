// V65.6: mescla SOMENTE os arquivos de revisão realmente importados pelo
// BaseLayout, mantendo a ordem exata da cascata e os arquivos de origem para
// auditoria/rollback. Não altera conteúdo de nenhuma regra CSS.
import {readFile,writeFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import path from "node:path";

const layout=await readFile("src/layouts/BaseLayout.astro","utf8");
const re=/^import "\.\.\/styles\/((?:v\d[\w-]*|revision[\w-]*)\.css)";\s*$/gm;
const filenames=[...layout.matchAll(re)].map(x=>x[1]);
if(filenames.length<35)throw new Error("Número inesperado de estilos de revisão: "+filenames.length);
if(new Set(filenames).size!==filenames.length)throw new Error("Import CSS de revisão duplicado");
const fragments=[];
for(const name of filenames){
  const css=await readFile(path.join("src/styles",name),"utf8");
  if(/(^|\n)\s*@import\s/i.test(css))throw new Error("@import interno requer tratamento manual: "+name);
  if(/(^|\n)\s*@charset\s/i.test(css))throw new Error("@charset interno requer tratamento manual: "+name);
  fragments.push({name,css});
}
const sourceHash=createHash("sha256").update(fragments.map(x=>x.name+"\n"+x.css).join("\n")).digest("hex");
const header=[
  "/* ROAD Wealth — CSS consolidado V65.6",
  " * Gerado por scripts/consolidate-css-v65-6.mjs; não editar diretamente.",
  " * Ordem original preservada: "+filenames.length+" arquivos importados do BaseLayout.",
  " * Fontes: "+filenames.join(", "),
  " * SHA256 das fontes: "+sourceHash,
  " * CSS principal, módulos de páginas e tipografia Brandbook permanecem separados.",
  " */",""
].join("\n");
const out=header+fragments.map(({name,css})=>"\n/* === INÍCIO "+name+" === */\n"+css.trimEnd()+"\n/* === FIM "+name+" === */\n").join("\n");
await writeFile("src/styles/road-legacy-consolidated.css",out,"utf8");
console.log("ROAD V65.6: "+filenames.length+" arquivos consolidados; "+Buffer.byteLength(out)+" bytes; SHA256 "+sourceHash);
