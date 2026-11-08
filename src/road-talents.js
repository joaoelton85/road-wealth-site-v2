// Faça Parte da ROAD — validação estrita e mensagens transacionais.
// Separado dos contatos comerciais e dos dados de Check-up / IR.
const CAREER_AREAS = Object.freeze({
  investimentos:"Investimentos",
  relacionamento:"Relacionamento / Comercial",
  operacoes:"Operações / Backoffice",
  planejamento:"Planejamento / Patrimônio",
  outra:"Outra"
});
const CUSTODY_RANGES = Object.freeze({
  nao_se_aplica:"Não se aplica",
  ate_20:"Até R$ 20 milhões",
  de_20_a_50:"R$ 20 a 50 milhões",
  de_50_a_100:"R$ 50 a 100 milhões",
  de_100_a_200:"R$ 100 a 200 milhões",
  acima_200:"Acima de R$ 200 milhões"
});
const MAIL_FROM = {email:"contato@roadwealth.com.br",name:"ROAD Wealth"};
const CONTACT_EMAIL="contato@roadwealth.com.br";
const SITE="https://roadwealth.com.br";
const htmlEscape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function textField(value,max,{min=0,multiline=false}={}) {
  if (typeof value!=="string") return null;
  const text=value.trim().replace(/\r\n?/g,"\n");
  if(text.length>max || text.length<min) return null;
  if(multiline ? /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(text)
               : /[\x00-\x1F\x7F]/.test(text)) return null;
  return text;
}
export function parseTalentSubmission(payload) {
  if(!payload || typeof payload!=="object" || Array.isArray(payload)) return null;
  if(payload.consent!==true) return null;

  const name=textField(payload.name,80,{min:2});
  const email=textField(payload.email,254,{min:3})?.toLowerCase();
  const phone=textField(payload.phone,28,{min:8});
  const story=textField(payload.story,1200,{min:20,multiline:true});
  const linkedIn=textField(payload.linkedIn ?? "",220);
  if(!name || !email || !phone || !story || linkedIn===null) return null;
  if(!/^[^\s@<>]+@[^\s@<>]+\.[A-Za-z]{2,}$/.test(email)) return null;
  const digits=phone.replace(/\D/g,"");
  if(!/^[+()\d\s.-]+$/.test(phone) || digits.length<8 || digits.length>15) return null;
  if(linkedIn){
    let url;
    try{url=new URL(linkedIn);}catch{return null;}
    if(url.protocol!=="https:" || !["linkedin.com","www.linkedin.com"].includes(url.hostname.toLowerCase()) ||
      !/^\/in\/[^/]+\/?$/.test(url.pathname) || url.username || url.password) return null;
  }
  if(!["sim","nao"].includes(payload.marketExperience) ||
     !["sim","nao"].includes(payload.clientPortfolio) ||
     !Object.hasOwn(CUSTODY_RANGES,payload.custodyRange) ||
     !Object.hasOwn(CAREER_AREAS,payload.interestArea)) return null;
  // Não presumir carteira existente quando a própria pessoa respondeu "Não".
  if(payload.clientPortfolio==="nao" && payload.custodyRange!=="nao_se_aplica") return null;
  return {
    name,email,phone,linkedIn,
    marketExperience:payload.marketExperience,
    clientPortfolio:payload.clientPortfolio,
    custodyRange:payload.custodyRange,
    interestArea:payload.interestArea,
    story,
    consent:true
  };
}
export function talentInternalEmail(talent) {
  const body=[
    "NOVA APRESENTAÇÃO — FAÇA PARTE DA ROAD",
    "",
    "Nome: "+talent.name,
    "E-mail: "+talent.email,
    "Telefone / WhatsApp: "+talent.phone,
    "LinkedIn: "+(talent.linkedIn||"Não informado"),
    "Experiência no mercado: "+(talent.marketExperience==="sim"?"Sim":"Não"),
    "Relacionamento com carteira: "+(talent.clientPortfolio==="sim"?"Sim":"Não"),
    "Faixa aproximada declarada: "+CUSTODY_RANGES[talent.custodyRange],
    "Área de interesse: "+CAREER_AREAS[talent.interestArea],
    "",
    "APRESENTAÇÃO",
    talent.story,
    "",
    "Consentimento: autorizou registro e contato sobre oportunidades profissionais.",
    "Data do recebimento: "+new Date().toISOString(),
    "",
    "ATENÇÃO: informações autodeclaradas, não verificadas. Uso restrito à seleção e relacionamento profissional."
  ].join("\n");
  return {
    from:MAIL_FROM,to:CONTACT_EMAIL,replyTo:talent.email,
    subject:"[ROAD] Nova apresentação profissional",
    text:body
  };
}
export function talentAcknowledgementEmail(talent) {
  const heading="Recebemos sua apresentação.";
  const bodyText="Olá, "+talent.name+".\n\nObrigado pelo interesse em fazer parte da ROAD Wealth. Recebemos sua apresentação e ela poderá ser considerada quando surgirem oportunidades compatíveis com seu perfil.\n\nO cadastro não significa a existência de uma vaga ou o início de um processo seletivo. Se desejarmos aprofundar a conversa, entraremos em contato pelos canais informados.\n\nSe quiser atualizar ou solicitar a exclusão de seus dados, escreva para contato@roadwealth.com.br.\n\nSeu patrimônio, seu caminho, seu legado.\nROAD Wealth";
  const html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'+
  '<body style="margin:0;padding:0;background:#F8F5F0;color:#483A2F;">'+
  '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td align="center" style="padding:20px 10px;">'+
  '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:630px;background:#fff;border:1px solid #E2D9D0;"><tr><td style="padding:30px 25px;">'+
  '<p style="font:600 11px Montserrat,Arial,sans-serif;letter-spacing:1.8px;color:#8B7360;margin:0 0 12px;">ROAD WEALTH · FAÇA PARTE</p>'+
  '<h1 style="font:400 30px/1.2 Questrial,Arial,sans-serif;color:#483A2F;margin:0 0 18px;">'+heading+'</h1>'+
  '<p style="font:15px/1.7 Inter,Arial,sans-serif;color:#72665D;">Olá, '+htmlEscape(talent.name)+'. Obrigado pelo interesse em fazer parte da ROAD Wealth. Sua apresentação chegou até nós.</p>'+
  '<div style="padding:18px 20px;background:#F3ECE3;border:1px solid #E2D9D0;">'+
  '<p style="font:14px/1.7 Inter,Arial,sans-serif;margin:0;color:#483A2F;">Poderemos considerar seu perfil quando surgirem oportunidades compatíveis. O cadastro não representa a existência de uma vaga nem o início de um processo seletivo.</p></div>'+
  '<p style="font:14px/1.7 Inter,Arial,sans-serif;color:#72665D;margin:19px 0;">Se quisermos conhecer melhor sua trajetória, entraremos em contato. Para atualizar ou solicitar a exclusão de seus dados, escreva para <a style="color:#483A2F;" href="mailto:'+CONTACT_EMAIL+'">'+CONTACT_EMAIL+'</a>.</p>'+
  '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #E2D9D0;margin-top:22px;"><tr><td width="85" style="padding-top:18px;" valign="middle">'+
  '<img alt="ROAD Wealth" src="'+SITE+'/assets/road-logo-cafe-email.png" width="70" height="109" style="display:block;width:70px;height:109px;border:0;" /></td>'+
  '<td style="padding:18px 0 0 10px;font:13px/1.6 Inter,Arial,sans-serif;color:#483A2F;" valign="middle">Seu patrimônio, seu caminho, seu legado.<p style="margin:8px 0 0;"><a href="'+SITE+'" style="color:#483A2F;">roadwealth.com.br</a></p></td></tr></table>'+
  '</td></tr></table></td></tr></table></body></html>';
  return {from:MAIL_FROM,to:talent.email,replyTo:CONTACT_EMAIL,subject:"Recebemos sua apresentação — ROAD Wealth",text:bodyText,html};
}

// O banco de talentos é opcional, exclusivo desta finalidade e nunca usa LEADS_DB.
// Sem TALENTS_DB, as inscrições ficam na caixa institucional, não em um CRM.
export async function saveTalent(env,talent) {
  if(!env.TALENTS_DB)return false;
  const now=new Date().toISOString();
  const id=crypto.randomUUID();
  await env.TALENTS_DB.prepare(`
    INSERT INTO road_talent_candidates
      (id,email,name,phone,linkedin,market_experience,client_portfolio,custody_range,interest_area,
       presentation,consent_at,first_seen_at,last_seen_at,submissions,status)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,1,'novo')
    ON CONFLICT(email) DO UPDATE SET
      name=excluded.name,phone=excluded.phone,linkedin=excluded.linkedin,
      market_experience=excluded.market_experience,client_portfolio=excluded.client_portfolio,
      custody_range=excluded.custody_range,interest_area=excluded.interest_area,
      presentation=excluded.presentation,consent_at=excluded.consent_at,
      last_seen_at=excluded.last_seen_at,
      submissions=road_talent_candidates.submissions+1
  `).bind(id,talent.email,talent.name,talent.phone,talent.linkedIn,talent.marketExperience,
    talent.clientPortfolio,talent.custodyRange,talent.interestArea,talent.story,now,now,now).run();
  const person=await env.TALENTS_DB.prepare("SELECT id FROM road_talent_candidates WHERE email=?").bind(talent.email).first();
  if(!person?.id)throw new Error("ROAD_TALENT_NOT_FOUND");
  await env.TALENTS_DB.prepare(`
    INSERT INTO road_talent_events(id,candidate_id,event,created_at)
    VALUES (?,?,'application_received',?)
  `).bind(crypto.randomUUID(),person.id,now).run();
  return true;
}
