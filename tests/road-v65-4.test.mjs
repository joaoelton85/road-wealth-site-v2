import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {parseContact,saveLeadEvent,notifyLead} from "../src/road-leads.js";
import {ROAD_TAGLINE} from "../src/checkup-report.js";

const file=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const home=file("src/pages/index.astro");
const ar=file("src/pages/a-road.astro");
const inv=file("src/pages/investimentos.astro");
const legal=file("src/pages/avisos-legais.astro");
const privacy=file("src/pages/privacidade.astro");
const checkup=file("src/pages/patrimonio.astro");

test("home e por que Wealth identificam a consultoria no âmbito da Meu Patrimônio",()=>{
  assert.match(home,/A Consultoria de Investimentos é realizada pela Meu Patrimônio, consultoria credenciada na CVM/);
  assert.match(ar,/Consultoria de Investimentos Independente, exercida pela Meu Patrimônio/);
  assert.match(home,/href="\/investimentos\/#remuneracao"/);
  assert.equal(ar.split('id="wealth"')[1].split('id="origem"')[0].split("<p>").length-1,1);
});
test("avisos e privacidade identificam a pessoa jurídica e canal sem identificar encarregado não designado",()=>{
  assert.match(legal,/68\.642\.253\/0001-00/);
  assert.match(legal,/PENDENTE: razão social, CNPJ e diretor responsável da Meu Patrimônio/);
  assert.match(legal,/Consultores de valores mobiliários/);
  assert.match(privacy,/68\.642\.253\/0001-00/);
  assert.match(privacy,/Canal de privacidade e atendimento aos titulares/);
  assert.doesNotMatch(privacy,/Encarregado\s*\/\s*canal de privacidade/);
});
test("remuneração, público e início estão claros sem prometer devolução absoluta",()=>{
  assert.match(inv,/id="remuneracao"/);
  assert.match(inv,/0,40% e 0,75%/);
  assert.match(inv,/instituição, do produto e do contrato/);
  assert.doesNotMatch(inv,/100%|sem conflito de interesses|predominante em mercados mais maduros/i);
  assert.match(inv,/id="para-quem"/);
  assert.match(inv,/Famílias/);
  assert.match(inv,/Produtores rurais/);
  assert.match(inv,/id="como-comecar"/);
  assert.match(inv,/Conversa inicial/);
  assert.match(inv,/Diagnóstico/);
  assert.match(inv,/Proposta/);
});
test("Check-up separa autorização de envio, contato individual e comunicações gerais",()=>{
  assert.match(checkup,/id="road-result-consent"/);
  assert.match(checkup,/id="road-result-contact"/);
  assert.match(checkup,/id="road-result-marketing"/);
  assert.match(checkup,/contactConsent:qs\('#road-result-contact'\).checked/);
  assert.match(privacy,/contato individual da ROAD/);
  const x=parseContact({email:"teste@example.com",consent:true,contactConsent:true,marketingConsent:false});
  assert.equal(x.contactConsent,true);
  assert.equal(x.marketingConsent,false);
  const y=parseContact({email:"teste@example.com",consent:true,marketingConsent:true});
  assert.equal(y.contactConsent,false);
  assert.equal(y.marketingConsent,true);
});
test("contato sobre resultado fica em evento próprio no D1 sem migração de esquema",async()=>{
  const sqls=[];
  const env={LEADS_DB:{prepare(sql){return{bind(...args){return{
    async run(){sqls.push({sql,args});return{success:true}},
    async first(){return{id:"lead-123"}}
  }}}}}};
  const base={email:"teste@example.com",name:"",phone:"",contactConsent:false,marketingConsent:false};
  await saveLeadEvent(env,base,"checkup","familiar");
  assert.equal(sqls.length,2);
  sqls.length=0;
  await saveLeadEvent(env,{...base,contactConsent:true},"checkup","familiar");
  assert.equal(sqls.length,3);
  assert.match(sqls[2].sql,/contact_requested/);
});
test("e-mail de notificação distingue os dois aceites",async()=>{
  const messages=[];
  const env={LEAD_NOTIFICATIONS:"enabled",EMAIL:{send:async p=>messages.push(p)}};
  await notifyLead(env,{email:"teste@example.com",name:"Ana",phone:"",contactConsent:true,marketingConsent:false},"checkup","familiar");
  assert.match(messages[0].text,/Contato sobre o resultado: SIM/);
  assert.match(messages[0].text,/Comunicações comerciais: NÃO/);
});
test("lema unificado, sem retirar LinkedIn opcional de recrutamento",()=>{
  const expected="Seu patrimônio, seu legado, seu caminho.";
  assert.equal(ROAD_TAGLINE,expected);
  for(const path of ["src/checkup-report.js","src/ir-email.js","src/road-talents.js"]){
    assert.match(file(path),/Seu patrimônio, seu legado, seu caminho\./);
    assert.doesNotMatch(file(path),/Seu patrimônio, seu caminho, seu legado\./);
  }
  for(const path of ["src/components/Footer.astro","src/pages/contato.astro","src/pages/patrimonio.astro"]){
    assert.doesNotMatch(file(path),/LinkedIn|js-placeholder.*LinkedIn/);
  }
  assert.match(ar,/name="linkedIn"/);
});
test("aprenda e perspectivas identificadas como futuras",()=>{
  const knowledge=file("src/pages/conhecimento.astro");
  assert.match(knowledge,/<h3>Aprenda <small[^>]*>Em breve<\/small><\/h3>/);
  assert.match(knowledge,/<h3>Perspectivas <small[^>]*>Em breve<\/small><\/h3>/);
});
