import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.js";
import {calculateIr,buildIrEmail} from "../src/ir-email.js";
import {parseContact} from "../src/road-leads.js";

const inputs={
  incomeHolder:120000,incomeDependents:0,officialPension:12000,withheldTax:15000,
  dependents:1,students:1,education:4000,medical:2500,alimony:0,totalIncome:120000,
  pgbl:4000,childFund:200,elderlyFund:100,culture:0,sport:0,pgblEligible:true
};
const payload={email:"CLIENTE@EXAMPLE.COM",name:"Ana",phone:"(42) 99999-9999",consent:true,marketingConsent:false,turnstileToken:"mock-token",inputs};
async function exercise(body=payload,opts={}){
  const oldFetch=globalThis.fetch, messages=[],dbCalls=[];
  globalThis.fetch=async()=>new Response(JSON.stringify({success:opts.turnstile!==false,hostname:"roadwealth.com.br",action:opts.action||"road_simulator_email"}),{headers:{"Content-Type":"application/json"}});
  const db={prepare(sql){return {bind(...values){return {
    async run(){dbCalls.push({sql,values});return {success:true};},
    async first(){return {id:"lead-test"};}
  }}}}};
  const env={
    EMAIL:{send:async msg=>{messages.push(msg);return {messageId:"test"};}},
    TURNSTILE_SECRET_KEY:"secret",TURNSTILE_SITE_KEY:"public",
    CHECKUP_EMAIL_RATE_LIMIT:{limit:async()=>({success:opts.rate!==false})},
    ...(opts.db===false?{}:{LEADS_DB:db})
  };
  try{
    const req=new Request("https://roadwealth.com.br/api/ir-email",{
      method:"POST",
      headers:{"Origin":"https://roadwealth.com.br","Content-Type":"application/json"},
      body:JSON.stringify(body)
    });
    const response=await worker.fetch(req,env);
    return {status:response.status,body:await response.json(),messages,dbCalls};
  }finally{globalThis.fetch=oldFetch;}
}
test("IR e doações: cálculo reproduz premissas da página",()=>{
  const result=calculateIr(inputs);
  assert.ok(result);
  assert.equal(result.pgblLimit,14400);
  assert.equal(result.pgblRoom,10400);
  assert.equal(result.incentivesEntered,300);
  assert.equal(result.deductibleIncentives,300);
  assert.equal(result.balance,result.taxAfterIncentives-15000);
  assert.match(buildIrEmail(result,"Ana").text,/Doações|doações/i);
});
test("envia simulação com nome, sem PDF, e registra evento mínimo sem valores fiscais",async()=>{
  const r=await exercise();
  assert.equal(r.status,202);
  assert.equal(r.messages.length,1);
  assert.equal(r.messages[0].to,"cliente@example.com");
  assert.match(r.messages[0].text,/Olá, Ana/);
  assert.match(r.messages[0].html,/road-logo-cafe-email/);
  assert.equal(r.messages[0].attachments,undefined);
  assert.equal(r.dbCalls.length,2);
  const allValues=JSON.stringify(r.dbCalls.map(x=>x.values));
  assert.doesNotMatch(allValues,/120000|15000|10400/);
  assert.match(allValues,/ir_doacoes/);
});
test("funciona sem D1 sem fingir que lead foi persistido",async()=>{
  const r=await exercise({...payload,name:"",phone:""},{db:false});
  assert.equal(r.status,202);
  assert.equal(r.messages.length,1);
  assert.equal(r.dbCalls.length,0);
});
test("aceite de marketing é independente da autorização do envio",async()=>{
  assert.equal(parseContact({...payload,marketingConsent:false}).marketingConsent,false);
  assert.equal(parseContact({...payload,marketingConsent:true}).marketingConsent,true);
  assert.equal(parseContact({...payload,consent:false}),null);
  const r=await exercise({...payload,consent:false});
  assert.equal(r.status,400);
  assert.equal(r.messages.length,0);
});
test("bloqueia dados inconsistentes, token inválido e limite",async()=>{
  assert.equal((await exercise({...payload,inputs:{...inputs,incomeHolder:1e20}})).status,400);
  assert.equal((await exercise({...payload,phone:"<script>"})).status,400);
  assert.equal((await exercise(payload,{action:"road_checkup_email"})).status,403);
  assert.equal((await exercise(payload,{turnstile:false})).status,403);
  assert.equal((await exercise(payload,{rate:false})).status,429);
});
