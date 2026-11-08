// ROAD Wealth — interpretação educativa, baseada nas respostas voluntárias.
// As quatro áreas permanecem iguais; a quantidade de perguntas varia conforme o perfil.
// Desconhecimento nunca é tratado como ausência comprovada de proteção ou planejamento.
import { ROAD_CHECKUP_PROFILES, ROAD_CHECKUP_AREA_ORDER } from "./checkup-profiles.js";

export const ROAD_AREAS = [
  { key: "investments", label: "Investimentos" },
  { key: "legacy", label: "Legado" },
  { key: "capital", label: "Capital" },
  { key: "planning", label: "Planejamento" },
];
export const ROAD_POINTS = { sim: 3, parcial: 2, nao: 1, naosei: 0 };
export const ROAD_TAGLINE = "Seu patrimônio, seu caminho, seu legado.";
export const ROAD_REPORT_INTRO = "Este Check-up oferece uma primeira leitura da organização patrimonial, construída a partir das suas respostas. Ele não mede evolução nem substitui uma avaliação individualizada.";
export const ROAD_REPORT_CTA_TITLE = "O próximo passo: um planejamento para você e sua família";
export const ROAD_REPORT_NOTICE = "Este Check-up é um primeiro olhar sobre a organização do seu patrimônio. Mas cada família tem sua própria história, seus objetivos e suas prioridades. Ao conhecermos melhor sua realidade — sua idade, composição familiar, patrimônio, renda e planos para o futuro —, poderemos realizar um diagnóstico mais preciso, identificar oportunidades e construir um planejamento financeiro e patrimonial que faça sentido para você. Convidamos você a continuar essa conversa com a ROAD e descobrir como podemos ajudar a organizar, proteger e planejar o futuro do seu patrimônio e da sua família.";
export const ROAD_CTA_LINK = "https://wa.me/5542984242852?text=" +
  encodeURIComponent("Olá! Realizei o Check-up ROAD e gostaria de conversar sobre minha análise patrimonial.");

export function roadStatus(points) {
  if (points >= 10) return { label: "Bem estruturado", color: "#43726B", key: "good" };
  if (points >= 7) return { label: "Em desenvolvimento", color: "#AF873A", key: "developing" };
  return { label: "Merece atenção", color: "#B86D42", key: "attention" };
}

const THEMES = [
  { id:"portfolio", topic:"carteira", area:"investments", keys:["investments-0","investments-3"],
    title:"Bons investimentos não garantem uma boa carteira",
    detail:"Uma carteira pode reunir boas aplicações e, ainda assim, não atender aos objetivos de quem investe. O resultado depende de como os ativos se combinam, dos riscos assumidos e da disponibilidade dos recursos nos momentos em que forem necessários." },
  { id:"visibility", topic:"visao-integrada", area:"investments", keys:["investments-1","investments-3"],
    title:"Conhecer o conjunto ajuda a enxergar os riscos",
    detail:"Quando os investimentos estão distribuídos entre instituições, nem sempre é simples perceber a exposição total do patrimônio. Uma visão consolidada ajuda a reconhecer concentrações, compreender a distribuição dos recursos e tomar decisões com mais clareza." },
  { id:"returns", topic:"retorno", area:"investments", keys:["investments-2"],
    title:"Rentabilidade não conta toda a história",
    detail:"O crescimento dos investimentos precisa ser observado depois dos impostos e da inflação, considerando também os riscos assumidos. Mais importante do que o desempenho isolado é entender a contribuição de cada aplicação para os objetivos." },
  { id:"succession", topic:"sucessao", area:"legacy", keys:["legacy-0"],
    title:"A continuidade do patrimônio exige preparação",
    detail:"Antecipar os custos de uma sucessão, o acesso aos recursos necessários e as responsabilidades familiares ajuda a preservar escolhas. Uma análise individualizada pode identificar oportunidades de organização e proteção." },
  { id:"capital-own", topic:"credito", area:"capital", keys:["capital-0"],
    title:"Usar recursos próprios nem sempre é a melhor escolha",
    detail:"Mesmo quando há dinheiro disponível, linhas de crédito podem representar uma alternativa para realizar projetos e preservar recursos investidos. Vale comparar o custo efetivo, a liquidez e os riscos antes de decidir." },
  { id:"capital-options", topic:"fontes-de-capital", area:"capital", keys:["capital-1"],
    title:"Conhecer as fontes de recursos amplia as alternativas",
    detail:"As condições de crédito variam conforme a finalidade, o perfil e a atividade. Conhecer as possibilidades existentes, inclusive linhas diferenciadas quando elegíveis, pode ampliar as escolhas para aquisições, projetos e expansão." },
];

const FAMILY_THEMES = [
  { id:"family-liquidity", topic:"liquidez-sucessoria", area:"legacy", keys:["legacy-1"],
    title:"A continuidade da família também depende de liquidez",
    detail:"Patrimônio e recursos disponíveis não são a mesma coisa. Planejar os recursos necessários em uma sucessão pode preservar ativos relevantes e evitar decisões precipitadas em momentos delicados." },
  { id:"family-health", topic:"saude", area:"legacy", keys:["legacy-2"],
    title:"Proteção médica também faz parte do patrimônio",
    detail:"Avaliar a rede de referência e as alternativas de cobertura médica ajuda a buscar atendimento de alta qualidade sem expor a família a despesas de grande porte. A proteção deve acompanhar as necessidades e os objetivos familiares." },
  { id:"family-insurance", topic:"seguro-de-bens", area:"legacy", keys:["legacy-3"],
    title:"Seus bens também precisam de proteção",
    detail:"Uma residência ou outro bem relevante pode representar anos de construção patrimonial. Revisar coberturas e riscos ajuda a identificar exposições que nem sempre aparecem na análise dos investimentos." },
  { id:"family-review", topic:"revisao-protecao", area:"legacy", keys:["legacy-4"],
    title:"A proteção deve acompanhar as mudanças da família",
    detail:"Mudanças familiares, patrimoniais e profissionais podem exigir soluções de proteção diferentes. Uma revisão periódica ajuda a verificar se o que foi estruturado continua adequado." },
  { id:"family-goals", topic:"objetivos", area:"planning", keys:["planning-0"],
    title:"Objetivos claros dão direção ao patrimônio",
    detail:"Conectar as decisões financeiras a prioridades e prazos ajuda a escolher com mais critério entre consumir, investir e realizar projetos. O planejamento começa pelo que a família deseja construir." },
  { id:"family-budget", topic:"organizacao-financeira", area:"planning", keys:["planning-1"],
    title:"A organização financeira dá sustentação aos planos",
    detail:"Acompanhar receitas, despesas e compromissos permite identificar a capacidade de poupança e prever necessidades futuras, sem depender apenas da percepção sobre a renda disponível." },
  { id:"family-future", topic:"planos-futuros", area:"planning", keys:["planning-2"],
    title:"Os grandes compromissos começam antes de acontecer",
    detail:"Aposentadoria, educação e aquisições relevantes exigem recursos em momentos diferentes. Antecipar essas necessidades permite adaptar os investimentos e reduzir riscos de desencontro entre prazo e objetivo." },
  { id:"family-projects", topic:"projetos", area:"planning", keys:["planning-3"],
    title:"Uma boa decisão precisa considerar o patrimônio inteiro",
    detail:"Comprar um imóvel ou realizar um projeto pode fazer sentido isoladamente, mas também altera liquidez, riscos e planos futuros. Comparar cenários e alternativas ajuda a entender o impacto de cada escolha." },
  { id:"family-integrated", topic:"integracao-patrimonial", area:"planning", keys:["planning-4"],
    title:"Planejar também é conectar as decisões",
    detail:"Investimentos, proteção, objetivos e projetos pessoais se relacionam. Um planejamento integrado permite acompanhar essas conexões e revisar escolhas quando a vida e o patrimônio mudam." },
];

const BUSINESS_THEMES = [
  { id:"business-continuity", topic:"continuidade-empresa", area:"legacy", keys:["legacy-1"],
    title:"A continuidade dos negócios merece preparação",
    detail:"A ausência temporária ou definitiva de uma pessoa essencial pode afetar decisões e operações. A coordenação entre sócios, família e especialistas permite planejar alternativas antes de uma situação inesperada." },
  { id:"business-insurance", topic:"seguro-de-bens", area:"legacy", keys:["legacy-2"],
    title:"Proteger os bens produtivos é preservar capacidade de operar",
    detail:"Imóveis, instalações, máquinas e estoques são parte da capacidade de geração de renda. Avaliar riscos e coberturas pode revelar oportunidades de proteção da atividade empresarial ou rural." },
  { id:"business-health", topic:"saude", area:"legacy", keys:["legacy-3"],
    title:"A proteção médica pode preservar escolhas familiares",
    detail:"O acesso a atendimento de alta qualidade, inclusive em situações de alta complexidade, deve ser observado junto com os riscos de despesas médicas elevadas. Há soluções diferentes conforme o perfil da família." },
  { id:"business-cash", topic:"tesouraria", area:"capital", keys:["capital-2"],
    title:"O caixa também pode ser uma fonte de eficiência",
    detail:"Os recursos temporariamente disponíveis podem ter condições de remuneração distintas entre instituições. Comparar alternativas considerando liquidez, custos, tributação e risco pode melhorar o resultado financeiro sem comprometer a operação." },
  { id:"business-capital", topic:"gestao-capital", area:"capital", keys:["capital-3"],
    title:"Caixa, investimentos e crédito devem conversar entre si",
    detail:"Necessidades sazonais, projetos e compromissos financeiros exigem decisões conectadas. Relacionar prazos de recebimento, investimentos e fontes de crédito ajuda a reduzir custos e preservar flexibilidade." },
  { id:"business-goals", topic:"objetivos", area:"planning", keys:["planning-0"],
    title:"Família e negócios precisam de objetivos alinhados",
    detail:"A atividade econômica e o patrimônio pessoal influenciam um ao outro. Alinhar prioridades permite organizar investimentos, retiradas, reinvestimentos e projetos sem perder de vista os planos familiares." },
  { id:"business-projects", topic:"projetos", area:"planning", keys:["planning-1"],
    title:"Uma oportunidade merece análise além do preço",
    detail:"Aquisição de terras, expansão e novos projetos exigem avaliar retorno, riscos, capacidade operacional e alternativas de uso do capital. Uma análise estruturada pode mudar a percepção de atratividade." },
  { id:"business-personal", topic:"patrimonio-empresa", area:"planning", keys:["planning-2"],
    title:"As escolhas do negócio afetam o patrimônio familiar",
    detail:"Alavancagem, garantias, concentração de ativos e reinvestimentos podem repercutir diretamente sobre os objetivos da família. Uma visão integrada ajuda a avaliar os riscos para ambos." },
  { id:"business-review", topic:"revisao", area:"planning", keys:["planning-3"],
    title:"O planejamento precisa acompanhar a realidade",
    detail:"Mercados, custos, oportunidades e necessidades familiares mudam. Revisar periodicamente os planos do negócio e da família ajuda a identificar quando decisões anteriores precisam ser atualizadas." },
];

const weight=v=>v==="nao"?4:v==="parcial"?2:v==="naosei"?1:0;
const isKnownGap=v=>v==="nao"||v==="parcial";

function selectThemes(answers, profile) {
  const themes=[...THEMES,...(profile==="empresarial"?BUSINESS_THEMES:FAMILY_THEMES)];
  const candidates=themes
    .map(theme=>{
      const missing=theme.keys.filter(key=>answers[key]!=="sim");
      return {...theme, priority:missing.reduce((sum,key)=>sum+weight(answers[key]),0),missing};
    })
    .filter(theme=>theme.missing.length && theme.missing.some(key=>isKnownGap(answers[key])))
    .sort((a,b)=>b.priority-a.priority);
  const chosen=[];
  // Primeiro, buscar temas e áreas distintos. Depois, completar sem duplicar assunto.
  for(const theme of candidates) {
    if(chosen.length===2)break;
    if(chosen.some(item=>item.topic===theme.topic||item.area===theme.area))continue;
    chosen.push(theme);
  }
  for(const theme of candidates) {
    if(chosen.length===2)break;
    if(chosen.some(item=>item.topic===theme.topic||item.id===theme.id))continue;
    chosen.push(theme);
  }
  return chosen.map(({title,detail})=>({title,detail}));
}

function limitedAnalysis(answers, profile) {
  const definitions=ROAD_CHECKUP_PROFILES[profile].areas;
  const positives=ROAD_CHECKUP_AREA_ORDER.flatMap(key=>
    definitions[key].questions.map((q,index)=>({q,index,key,answer:answers[key+"-"+index]})))
    .filter(item=>item.answer==="sim"||item.answer==="parcial")
    .sort((a,b)=>ROAD_POINTS[b.answer]-ROAD_POINTS[a.answer])
    .slice(0,2)
    .map(item=>item.q.replace(/^(Você|Sua família|Seu planejamento|Sua empresa ou atividade rural)\s*/i,"").replace(/[?]$/,"").toLowerCase());
  const first={title:"Conhecer o patrimônio pode ser mais simples do que parece",
    detail:"Organizar os investimentos e a vida financeira pode trazer mais tranquilidade no futuro. Conhecer o que já existe também ajuda a preservar o patrimônio, mesmo em períodos de incerteza. Não é preciso resolver tudo de uma vez: começar a reunir informações já faz diferença."};
  if(!positives.length)return [first,{title:"O primeiro passo é ganhar clareza",
    detail:"Suas respostas mostram que ainda faltam informações para uma leitura mais precisa. Conhecer a composição dos investimentos, os compromissos e os objetivos da família é um caminho possível para começar a organizar as próximas decisões."}];
  return [first,{title:"Há pontos positivos que merecem ser reconhecidos",
    detail:"Você já indicou aspectos positivos em sua organização patrimonial. "+(positives.length===2?"Entre eles, há sinais de atenção a mais de uma dimensão do planejamento. ":"")+"O próximo passo é entender como esses elementos se conectam ao restante do patrimônio, sem desconsiderar o que já foi construído."}];
}

export function evaluateCheckup(answers, profile) {
  const configuration=ROAD_CHECKUP_PROFILES[profile];
  if(!configuration||!answers||typeof answers!=="object"||Array.isArray(answers))return null;
  const expected=ROAD_CHECKUP_AREA_ORDER.flatMap(key=>
    configuration.areas[key].questions.map((_,index)=>key+"-"+index));
  if(expected.length!==16||Object.keys(answers).length!==16)return null;
  if(!expected.every(key=>Object.prototype.hasOwnProperty.call(answers,key) &&
       Object.prototype.hasOwnProperty.call(ROAD_POINTS,answers[key])))return null;
  let unknownCount=0;
  const areas=ROAD_AREAS.map(({key,label})=>{
    const questions=configuration.areas[key].questions;
    const rawPoints=questions.reduce((sum,_,index)=>{
      const answer=answers[key+"-"+index];
      if(answer==="naosei")unknownCount++;
      return sum+ROAD_POINTS[answer];
    },0);
    // Normalizar por quantidade de perguntas. A escala permanece entre 0 e 12.
    const points=Math.round(rawPoints/questions.length*4*100)/100;
    const status=roadStatus(points);
    return {key,label,points,rawPoints,questionCount:questions.length,
      percentage:Math.round(rawPoints/(questions.length*3)*10000)/100,
      statusLabel:status.label,statusKey:status.key,color:status.color};
  });
  const limited=unknownCount>=12;
  let priorities=limited?limitedAnalysis(answers,profile):selectThemes(answers,profile);
  if(priorities.length===0)priorities=[
    {title:"O valor de manter uma estrutura coerente",
     detail:"Suas respostas indicam organização nas áreas avaliadas. Conforme o patrimônio e a família evoluem, vale continuar observando se as escolhas permanecem coerentes com os objetivos e as necessidades de cada etapa."},
    {title:"Planejar também é preservar boas decisões",
     detail:"Investimentos, proteção, liquidez e decisões relevantes se relacionam. Uma revisão periódica permite acompanhar essas conexões e reconhecer quando mudanças na família ou nos negócios exigem uma nova avaliação."}
  ];
  if(priorities.length===1)priorities.push({
    title:"Preservar uma visão integrada",
    detail:"Uma decisão patrimonial ganha contexto quando é observada junto das demais. Relacionar investimentos, proteção, liquidez e objetivos ajuda a preservar a organização do patrimônio ao longo do tempo."
  });
  return {profile,profileLabel:configuration.label,areas,priorities,unknownCount,limited};
}
