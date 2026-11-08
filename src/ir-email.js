// Recalcula no servidor a mesma estimativa de IRPF 2026 exibida no navegador.
// Os valores recebidos não são gravados no cadastro de leads.
const NUMERIC_FIELDS = [
  "incomeHolder","incomeDependents","officialPension","withheldTax",
  "dependents","students","education","medical","alimony","totalIncome",
  "pgbl","childFund","elderlyFund","culture","sport",
];
export function calculateIr(inputs) {
  if (!inputs || typeof inputs !== "object" || Array.isArray(inputs)) return null;
  const v = {};
  for (const key of NUMERIC_FIELDS) {
    const n = inputs[key];
    if (typeof n !== "number" || !Number.isFinite(n) || n < 0 || n > 1e9) return null;
    v[key] = n;
  }
  for (const key of ["dependents","students"]) {
    if (!Number.isInteger(v[key]) || v[key] > 30) return null;
  }
  if (typeof inputs.pgblEligible !== "boolean") return null;

  const gross = v.incomeHolder + v.incomeDependents;
  if (gross <= 0 || gross > 1e9) return null;
  const taxByTable = base => {
    const b = Math.max(0,base);
    if (b <= 29145.60) return 0;
    if (b <= 33919.80) return Math.max(0,b*.075-2185.92);
    if (b <= 45012.60) return Math.max(0,b*.15-4729.91);
    if (b <= 55976.16) return Math.max(0,b*.225-8105.85);
    return Math.max(0,b*.275-10904.66);
  };
  const annualReduction = (income,tax) => {
    if (income <= 60000) return Math.min(tax,2694.15);
    if (income <= 88200) return Math.min(tax,Math.max(0,8429.73-.095575*income));
    return 0;
  };
  const finalTax = base => {
    const tax = taxByTable(base);
    return Math.max(0,tax-annualReduction(gross,tax));
  };
  const pgblLimit = gross*.12;
  const educationDeduction = Math.min(v.education,v.students*3561.50);
  const dependentDeduction = v.dependents*2275.08;
  const simplifiedDeduction = Math.min(gross*.20,17640);
  const scenario = pgbl => {
    const pgblDeduction = inputs.pgblEligible?Math.min(pgbl,pgblLimit):0;
    const legalDeductions = v.officialPension+dependentDeduction+educationDeduction+v.medical+v.alimony+pgblDeduction;
    const legalTax = finalTax(Math.max(0,gross-legalDeductions));
    const simplifiedTax = finalTax(Math.max(0,gross-simplifiedDeduction));
    return {
      tax:Math.min(legalTax,simplifiedTax),
      regime:legalTax<=simplifiedTax?"Deduções legais":"Desconto simplificado",
      legalDeductions,
      simplifiedDeduction,
    };
  };
  const current = scenario(v.pgbl);
  const pgblRoom = inputs.pgblEligible?Math.max(0,pgblLimit-v.pgbl):0;
  const pgblSavings = Math.max(0,current.tax-scenario(v.pgbl+pgblRoom).tax);
  const incentivesEntered = v.childFund+v.elderlyFund+v.culture+v.sport;
  const limit6 = current.tax*.06;
  const limit7 = current.tax*.07;
  const deductibleIncentives = Math.min(incentivesEntered,v.sport>0?limit7:limit6);
  const taxAfterIncentives = Math.max(0,current.tax-deductibleIncentives);
  const balance = taxAfterIncentives-v.withheldTax;
  const highIncomeAlert = (v.totalIncome>600000 || (!v.totalIncome && gross>600000));
  return {
    ...current,
    gross, pgblLimit,pgbl:v.pgbl,pgblRoom,pgblSavings,
    incentivesEntered,limit6,limit7,deductibleIncentives,taxAfterIncentives,
    balance,balanceLabel:balance>0?"Saldo estimado a pagar":"Restituição estimada",
    highIncomeAlert
  };
}

const ORIGIN="https://roadwealth.com.br";
const COFFEE="#483A2F", SAND="#F3ECE3", MUTED="#72665D", LINE="#E2D9D0";
const cash=n=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n);
const safe=s=>String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
export function buildIrEmail(report,name="") {
  const greeting=name?"Olá, "+name+".":"Olá!";
  const rows=[
    ["Regime mais vantajoso na estimativa",report.regime],
    ["IR estimado antes das destinações",cash(report.tax)],
    ["Deduções legais",cash(report.legalDeductions)],
    ["Desconto simplificado",cash(report.simplifiedDeduction)],
    ["Limite estimado de PGBL (12%)",cash(report.pgblLimit)],
    ["Aportes PGBL informados",cash(report.pgbl)],
    ["Espaço adicional estimado em PGBL",cash(report.pgblRoom)],
    ["Economia potencial ao completar PGBL",cash(report.pgblSavings)],
    ["Destinações incentivadas informadas",cash(report.incentivesEntered)],
    ["Referência global de 6%",cash(report.limit6)],
    ["Referência de até 7% com esporte elegível",cash(report.limit7)],
    ["Abatimento considerado nesta simulação",cash(report.deductibleIncentives)],
    ["IR após destinações consideradas",cash(report.taxAfterIncentives)],
    [report.balanceLabel,cash(Math.abs(report.balance))]
  ];
  const disclaimer="Esta é uma estimativa informativa, sujeita à elegibilidade e aos limites específicos de cada mecanismo. Não substitui a declaração oficial nem uma análise tributária individualizada. O espaço potencial de PGBL não é presumido como aporte realizado.";
  const alert=report.highIncomeAlert?" Atenção: rendimentos acima de R$ 600 mil podem exigir avaliação da tributação mínima de altas rendas, não contemplada nesta simulação.":"";
  const text=[
    "SIMULAÇÃO ROAD | IMPOSTO DE RENDA E DOAÇÕES","",
    greeting,"Segue o resumo da simulação realizada no site da ROAD.","",
    ...rows.map(([label,value])=>label+": "+value),"",
    disclaimer+alert,"",
    "Com informações adicionais sobre seu contexto familiar e patrimonial, a ROAD pode aprofundar esta análise.",
    "Converse com a ROAD: "+ORIGIN+"/contato/","",
    "Seu patrimônio, seu legado, seu caminho."
  ].join("\n");
  const tableRows=rows.map(([label,value],i)=>
    '<tr><td style="padding:10px 12px;border-bottom:1px solid '+LINE+';font:13px Inter,Arial,sans-serif;color:'+MUTED+';">'+safe(label)+'</td><td align="right" style="padding:10px 12px;border-bottom:1px solid '+LINE+';font:600 13px Montserrat,Arial,sans-serif;color:'+COFFEE+';">'+safe(value)+'</td></tr>').join("");
  const html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'+
    '<body style="margin:0;background:#F8F5F0;color:'+COFFEE+';">'+
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td align="center" style="padding:20px 10px;">'+
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:630px;background:#fff;border:1px solid '+LINE+';"><tr><td style="padding:28px 22px;">'+
    '<p style="margin:0 0 10px;font:600 12px Montserrat,Arial,sans-serif;letter-spacing:1.5px;color:'+COFFEE+';">ROAD WEALTH · SIMULAÇÃO 2026</p>'+
    '<h1 style="margin:0 0 16px;font:400 29px Questrial,Arial,sans-serif;color:'+COFFEE+';">Imposto de Renda e doações</h1>'+
    '<p style="font:15px/1.6 Inter,Arial,sans-serif;color:'+MUTED+';">'+safe(greeting)+' Segue o resumo dos resultados calculados a partir dos dados informados.</p>'+
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="'+SAND+'" style="background:'+SAND+';"><tr><td style="padding:12px;">'+
    '<table width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="background:#fff;">'+tableRows+'</table></td></tr></table>'+
    '<p style="font:12px/1.6 Inter,Arial,sans-serif;color:'+MUTED+';margin:16px 0;">'+safe(disclaimer+alert)+'</p>'+
    '<h2 style="font:600 19px Montserrat,Arial,sans-serif;margin:22px 0 10px;">Que decisões fazem sentido para você?</h2>'+
    '<p style="font:14px/1.65 Inter,Arial,sans-serif;color:'+MUTED+';">Com mais informações sobre sua realidade familiar e patrimonial, é possível aprofundar o planejamento.</p>'+
    '<a href="'+ORIGIN+'/contato/" style="font:600 14px Montserrat,Arial,sans-serif;color:'+COFFEE+';">Conversar com a ROAD</a>'+
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;border-top:1px solid '+LINE+';"><tr><td style="padding-top:20px;width:79px;" valign="middle">'+
    '<img alt="ROAD Wealth" src="'+ORIGIN+'/assets/road-logo-cafe-email.png" width="70" height="109" style="display:block;width:70px;height:109px;" /></td>'+
    '<td valign="middle" style="font:13px/1.6 Inter,Arial,sans-serif;color:'+COFFEE+';padding:20px 0 0 12px;">Seu patrimônio, seu legado, seu caminho.<p style="margin:8px 0 0;"><a href="'+ORIGIN+'" style="color:'+COFFEE+';">roadwealth.com.br</a></p></td></tr></table>'+
    '</td></tr></table></td></tr></table></body></html>';
  return {text,html};
}
