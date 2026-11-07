// ROAD Wealth V61 — interpretação educativa, baseada somente nas respostas voluntárias.
// Não inferir que desconhecimento signifique ausência ou inadequação comprovada.
export const ROAD_AREAS = [
  { key: "investments", label: "Investimentos" },
  { key: "legacy", label: "Legado" },
  { key: "strategy", label: "Estratégia" },
  { key: "decisions", label: "Decisões" },
];
export const ROAD_POINTS = { sim: 3, parcial: 2, nao: 1, naosei: 0 };
export const ROAD_TAGLINE = "Seu patrimônio, seu legado, seu caminho.";
export const ROAD_REPORT_INTRO = "Este Check-up oferece uma primeira leitura da organização patrimonial, construída a partir das suas respostas. Ele não mede evolução nem substitui uma avaliação individualizada.";
export const ROAD_REPORT_NOTICE = "Avaliação indicativa baseada em informações autodeclaradas. Para compreender melhor a situação do patrimônio, é necessário considerar objetivos, composição dos ativos, liquidez e circunstâncias familiares.";
export const ROAD_CTA_LINK = "https://wa.me/5542984242852?text=" +
  encodeURIComponent("Olá! Realizei o Check-up ROAD e gostaria de conversar sobre minha análise patrimonial.");

export function roadStatus(total) {
  if (total >= 10) return { label: "Bem estruturado", color: "#43726B", key: "good" };
  if (total >= 7) return { label: "Em desenvolvimento", color: "#AF873A", key: "developing" };
  return { label: "Merece atenção", color: "#B86D42", key: "attention" };
}

// Tema único só é apresentado quando existe, nas respostas, um ponto a esclarecer.
// O texto explica relevância e consequências possíveis, sem presumir fatos não verificados.
const THEMES = [
  { id:"portfolio", area:"investments", keys:["investments-0","investments-3"], title:"Bons investimentos não garantem uma boa carteira",
    detail:"Uma carteira pode reunir boas aplicações e, ainda assim, não atender aos objetivos de quem investe. O resultado depende de como os ativos se combinam, dos riscos assumidos e da disponibilidade dos recursos nos momentos em que forem necessários." },
  { id:"visibility", area:"investments", keys:["investments-1","investments-3"], title:"Conhecer o conjunto ajuda a enxergar os riscos",
    detail:"Quando os investimentos estão distribuídos entre instituições, nem sempre é simples perceber a exposição total do patrimônio. Uma visão consolidada ajuda a reconhecer concentrações, compreender a distribuição dos recursos e tomar decisões com mais clareza." },
  { id:"returns", area:"investments", keys:["investments-2"], title:"Rentabilidade não conta toda a história",
    detail:"O crescimento dos investimentos precisa ser observado depois dos impostos e da inflação, considerando também os riscos assumidos. Mais importante do que o desempenho de uma aplicação isolada é entender como ela contribui para seus objetivos ao longo do tempo." },
  { id:"succession", area:"legacy", keys:["legacy-0","legacy-1"], title:"Preservar o patrimônio também exige preparar sua continuidade",
    detail:"Uma estrutura patrimonial pode funcionar bem hoje e exigir cuidados diferentes em uma sucessão. Conhecer os custos, organizar os recursos necessários e pensar na continuidade dos negócios contribui para proteger os ativos e trazer mais tranquilidade à família." },
  { id:"protection", area:"legacy", keys:["legacy-2","legacy-3"], title:"A proteção precisa acompanhar a vida da família",
    detail:"Mudanças na família, nos negócios e no patrimônio podem alterar as necessidades de proteção. Revisitar periodicamente as soluções existentes ajuda a perceber se elas continuam adequadas e se oferecem o suporte esperado nos momentos em que realmente importam." },
  { id:"liquidity", area:"strategy", keys:["strategy-1"], title:"Liquidez também significa preservar escolhas",
    detail:"Uma estrutura patrimonial precisa considerar recursos para compromissos e imprevistos. Quando essa necessidade não é planejada, pode comprometer a continuidade dos negócios e dificultar a permanência de ativos importantes no patrimônio da família. A organização ajuda a preservar alternativas." },
  { id:"goals", area:"strategy", keys:["strategy-0","strategy-2"], title:"Construir patrimônio exige saber aonde se quer chegar",
    detail:"Acumular recursos é importante, mas compreender o que se pretende alcançar ajuda a organizar melhor cada decisão. Objetivos claros permitem conciliar as necessidades de hoje com projetos familiares, aposentadoria e segurança financeira no futuro." },
  { id:"credit", area:"decisions", keys:["decisions-1","strategy-3"], title:"Usar recursos próprios nem sempre é a melhor escolha",
    detail:"Evitar uma dívida pode parecer vantajoso, mas empregar capital próprio também reduz a liquidez disponível. Comparar as alternativas exige observar o custo do financiamento, as oportunidades que ficam pelo caminho e o efeito da decisão sobre todo o patrimônio." },
  { id:"integrated", area:"decisions", keys:["decisions-0","decisions-2","decisions-3"], title:"Uma boa decisão precisa considerar o patrimônio inteiro",
    detail:"Comprar um imóvel, ampliar um negócio ou realizar um investimento relevante pode fazer sentido isoladamente. Mas essas escolhas também afetam liquidez, riscos e planos futuros. Considerar o conjunto ajuda a avaliar melhor as alternativas antes de decidir." },
];

const COMBINATIONS = [
  { id:"family-continuity", area:"legacy", keys:["legacy-1","strategy-1"], title:"A continuidade da família também depende de liquidez",
    detail:"Patrimônio e recursos disponíveis não são a mesma coisa. Em momentos de transição, a falta de planejamento pode pressionar a continuidade dos negócios e a permanência de ativos importantes na família. Antecipar essas necessidades permite preservar mais escolhas." },
  { id:"one-portfolio", area:"investments", keys:["investments-1","investments-3","decisions-0"], title:"O risco de uma decisão nem sempre aparece isoladamente",
    detail:"Quando investimentos e decisões patrimoniais são analisados em partes, pode ficar mais difícil enxergar a exposição total. Observar as instituições, os ativos e as decisões em conjunto ajuda a perceber relações que uma análise isolada não mostraria." },
  { id:"purpose", area:"strategy", keys:["investments-0","strategy-0"], title:"Investir bem começa por saber para quê",
    detail:"Boas aplicações não substituem objetivos claros. Quando a carteira não é avaliada à luz dos projetos pessoais e familiares, fica mais difícil saber se o risco e o prazo de cada investimento fazem sentido. O ponto de partida é conectar escolhas e propósitos." },
  { id:"properties-liquidity", area:"decisions", keys:["decisions-2","strategy-1"], title:"O valor do patrimônio não conta toda a história",
    detail:"Imóveis e participações em negócios podem representar uma parte importante do patrimônio, mas nem todos os recursos estão disponíveis quando necessários. Considerar a liquidez junto das decisões sobre esses ativos ajuda a preservar a continuidade dos planos familiares." },
  { id:"future", area:"strategy", keys:["strategy-0","strategy-2"], title:"O futuro fica mais claro quando os objetivos têm direção",
    detail:"Projetos familiares e aposentadoria costumam exigir decisões em momentos diferentes. Relacionar o que já foi construído com as necessidades futuras ajuda a escolher prioridades e a acompanhar se o patrimônio permanece alinhado ao caminho desejado." },
];

const POSITIVE_SIGNALS = {
  "investments-0":"diretrizes para orientar os investimentos",
  "investments-1":"conhecimento sobre a distribuição da carteira",
  "investments-2":"acompanhamento dos resultados dos investimentos",
  "investments-3":"uma visão conjunta dos investimentos",
  "legacy-0":"atenção aos custos de uma eventual sucessão",
  "legacy-1":"recursos pensados para a continuidade familiar",
  "legacy-2":"cuidados com a proteção médica da família",
  "legacy-3":"revisão das estruturas de proteção e sucessão",
  "strategy-0":"objetivos financeiros organizados",
  "strategy-1":"atenção às reservas e à liquidez",
  "strategy-2":"planejamento para a formação patrimonial e aposentadoria",
  "strategy-3":"integração de crédito e liquidez ao planejamento",
  "decisions-0":"avaliação dos impactos de decisões relevantes",
  "decisions-1":"comparação de alternativas de financiamento",
  "decisions-2":"decisões sobre negócios e imóveis em conjunto com o patrimônio",
  "decisions-3":"coordenação entre especialistas quando necessário",
};

const isKnownGap=(v)=>v==="nao"||v==="parcial";
const weight=(v)=>v==="nao"?4:v==="parcial"?2:v==="naosei"?1:0;
function uniqueThemes(answers) {
  const candidates=[];
  for(const theme of COMBINATIONS){
    const missing=theme.keys.filter(k=>answers[k]!=="sim");
    if(missing.length<2 || !missing.some(k=>isKnownGap(answers[k])))continue;
    candidates.push({...theme,priority:3+missing.reduce((s,k)=>s+weight(answers[k]),0)});
  }
  for(const theme of THEMES){
    const missing=theme.keys.filter(k=>answers[k]!=="sim");
    if(!missing.length)continue;
    candidates.push({...theme,priority:missing.reduce((s,k)=>s+weight(answers[k]),0)});
  }
  candidates.sort((a,b)=>b.priority-a.priority);
  const chosen=[];
  for(const item of candidates){
    if(!chosen.some(c=>c.area===item.area))chosen.push(item);
    if(chosen.length===2)break;
  }
  for(const item of candidates){
    if(chosen.length>=2)break;
    if(!chosen.some(c=>c.id===item.id))chosen.push(item);
  }
  return chosen.slice(0,2).map(({title,detail})=>({title,detail}));
}

function limitedAnalysis(answers) {
  const positives=Object.keys(POSITIVE_SIGNALS)
    .filter(k=>answers[k]==="sim"||answers[k]==="parcial")
    .sort((a,b)=>ROAD_POINTS[answers[b]]-ROAD_POINTS[answers[a]])
    .slice(0,2)
    .map(k=>POSITIVE_SIGNALS[k]);
  const start={
    title:"Conhecer o patrimônio pode ser mais simples do que parece",
    detail:"Organizar os investimentos e a vida financeira pode trazer mais tranquilidade no futuro. Conhecer o que já existe também ajuda a preservar o patrimônio, mesmo em períodos de incerteza. Não é preciso resolver tudo de uma vez: começar a reunir informações já faz diferença.",
  };
  if(!positives.length)return [start,{
    title:"O primeiro passo é ganhar clareza",
    detail:"Suas respostas mostram que ainda faltam informações para uma leitura mais precisa. Conhecer a composição dos investimentos, os compromissos e os objetivos da família é um caminho possível para começar a organizar as próximas decisões.",
  }];
  const details=positives.length===1
    ? "Você já indicou " + positives[0] + ". "
    : "Você já indicou " + positives[0] + " e " + positives[1] + ". ";
  return [start,{
    title:"Há pontos positivos que merecem ser reconhecidos",
    detail:details+"Esses elementos podem servir como ponto de partida. O próximo passo é entender como se conectam às demais partes do patrimônio, sem desconsiderar o que já foi construído.",
  }];
}

export function evaluateCheckup(answers) {
  if(!answers||typeof answers!=="object"||Array.isArray(answers)||Object.keys(answers).length!==16)return null;
  let unknownCount=0;
  const areas=[];
  for(const {key,label} of ROAD_AREAS){
    let points=0;
    for(let i=0;i<4;i++){
      const answer=answers[key+"-"+i];
      if(!Object.prototype.hasOwnProperty.call(ROAD_POINTS,answer))return null;
      if(answer==="naosei")unknownCount++;
      points+=ROAD_POINTS[answer];
    }
    const status=roadStatus(points);
    areas.push({key,label,points,percentage:Math.round(points/12*10000)/100,
      statusLabel:status.label,statusKey:status.key,color:status.color});
  }
  const limited=unknownCount>=12;
  let priorities;
  if(limited) priorities=limitedAnalysis(answers);
  else priorities=uniqueThemes(answers);
  if(priorities.length===0) priorities=[
    {title:"O valor de manter uma estrutura coerente",
     detail:"Suas respostas indicam organização nas áreas avaliadas. Conforme o patrimônio e a família evoluem, vale continuar observando se as escolhas permanecem coerentes com os objetivos e as necessidades de cada etapa."},
    {title:"Planejar também é preservar boas decisões",
     detail:"Investimentos, proteção, liquidez e decisões relevantes se relacionam. Uma revisão periódica permite acompanhar essas conexões e reconhecer quando mudanças na família ou nos negócios exigem uma nova avaliação."},
  ];
  if(priorities.length===1) priorities.push({
    title:"Preservar uma visão integrada",
    detail:"Uma decisão patrimonial ganha contexto quando é observada junto das demais. Relacionar investimentos, proteção, liquidez e objetivos ajuda a preservar a organização do patrimônio ao longo do tempo.",
  });
  return {areas,priorities,unknownCount,limited};
}
