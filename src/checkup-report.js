// Check-up ROAD V60 — avaliação indicativa, não substitui análise individualizada.
// Não registrar endereços, respostas ou dados patrimoniais em logs.
export const ROAD_AREAS = [
  { key: "investments", label: "Investimentos" },
  { key: "legacy", label: "Legado" },
  { key: "strategy", label: "Estratégia" },
  { key: "decisions", label: "Decisões" },
];

export const ROAD_ACTIONS = {
  investments: [
    { title: "Política de Investimentos", action: "Definir uma Política de Investimentos alinhada aos objetivos e riscos do patrimônio.", unknown: "Verificar se existe uma Política de Investimentos e compreender as diretrizes adotadas." },
    { title: "Concentração dos investimentos", action: "Consolidar a carteira e avaliar concentrações por emissor, instituição, classe e moeda.", unknown: "Levantar a concentração do patrimônio por instituição, classe, emissor e moeda." },
    { title: "Acompanhamento de resultados", action: "Acompanhar periodicamente a rentabilidade líquida e real dos investimentos.", unknown: "Identificar como os retornos líquidos e reais dos investimentos são acompanhados." },
    { title: "Visão consolidada", action: "Integrar os investimentos de diferentes instituições em uma visão única da carteira.", unknown: "Verificar se os investimentos em diferentes instituições são avaliados de forma conjunta." },
  ],
  legacy: [
    { title: "Liquidez sucessória", action: "Estimar os custos e tributos de uma eventual sucessão e os recursos necessários.", unknown: "Levantar os custos e necessidades de liquidez em uma possível sucessão." },
    { title: "Reservas para a família", action: "Dimensionar reservas ou instrumentos que apoiem a família em momentos de transição.", unknown: "Verificar se há recursos destinados à liquidez e continuidade financeira familiar." },
    { title: "Proteção familiar", action: "Revisar se a proteção médica e assistencial atende às necessidades da família.", unknown: "Mapear a proteção médica existente e sua compatibilidade com as necessidades familiares." },
    { title: "Revisão sucessória", action: "Reavaliar instrumentos de proteção e sucessão diante da realidade familiar atual.", unknown: "Confirmar se a estrutura de proteção e sucessão foi revisada recentemente." },
  ],
  strategy: [
    { title: "Objetivos e prazos", action: "Organizar os objetivos financeiros por prioridade e horizonte de realização.", unknown: "Identificar os objetivos financeiros, suas prioridades e os prazos previstos." },
    { title: "Reserva de liquidez", action: "Dimensionar a reserva necessária sem comprometer os objetivos de longo prazo.", unknown: "Estimar os valores necessários para compromissos e reservas de liquidez." },
    { title: "Planejamento de longo prazo", action: "Estabelecer uma estratégia acompanhada para aposentadoria e formação patrimonial.", unknown: "Verificar se existe um planejamento financeiro para aposentadoria e acumulação." },
    { title: "Integração financeira", action: "Integrar crédito, liquidez e exposição internacional ao planejamento financeiro.", unknown: "Verificar como crédito, liquidez e exposição internacional são avaliados em conjunto." },
  ],
  decisions: [
    { title: "Análise de impacto", action: "Comparar os efeitos das decisões relevantes sobre risco, liquidez e objetivos.", unknown: "Confirmar se os impactos patrimoniais são comparados antes de grandes decisões." },
    { title: "Capital próprio e crédito", action: "Comparar custo e flexibilidade de financiar ou usar recursos próprios.", unknown: "Avaliar como são comparadas as alternativas de financiamento e capital próprio." },
    { title: "Patrimônio integrado", action: "Analisar decisões sobre imóveis e negócios em conjunto com o restante do patrimônio.", unknown: "Verificar se decisões sobre imóveis e negócios consideram o patrimônio total." },
    { title: "Coordenação especializada", action: "Integrar orientações de especialistas nas decisões patrimoniais mais complexas.", unknown: "Identificar se existe coordenação entre especialistas em decisões de maior impacto." },
  ],
};

export const ROAD_POINTS = { sim: 3, parcial: 2, nao: 1, naosei: 0 };

export function roadStatus(total) {
  if (total >= 10) return { label: "Bem estruturado", color: "#43726B", key: "good" };
  if (total >= 7) return { label: "Em desenvolvimento", color: "#AF873A", key: "developing" };
  return { label: "Merece atenção", color: "#B86D42", key: "attention" };
}

export function evaluateCheckup(answers) {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) return null;
  if (Object.keys(answers).length !== 16) return null;
  const areas = [];
  const candidates = [];
  for (const { key, label } of ROAD_AREAS) {
    const areaAnswers = [];
    let points = 0;
    for (let i = 0; i < 4; i++) {
      const choice = answers[key + "-" + i];
      if (!Object.prototype.hasOwnProperty.call(ROAD_POINTS, choice)) return null;
      points += ROAD_POINTS[choice];
      areaAnswers.push(choice);
    }
    const status = roadStatus(points);
    areas.push({ key, label, points, percentage: Math.round(points / 12 * 10000) / 100, statusLabel: status.label, statusKey: status.key, color: status.color });
    areaAnswers.forEach((choice, index) => {
      if (choice === "sim") return;
      const suggestion = ROAD_ACTIONS[key][index];
      candidates.push({
        area: key,
        title: suggestion.title,
        detail: choice === "naosei" ? suggestion.unknown : suggestion.action,
        severity: choice === "naosei" ? 3 : choice === "nao" ? 2 : 1,
        areaScore: points,
        index,
      });
    });
  }
  candidates.sort((a, b) => b.severity - a.severity || a.areaScore - b.areaScore || a.index - b.index);
  const selected = [];
  for (const suggestion of candidates) {
    if (!selected.some(s => s.area === suggestion.area)) selected.push(suggestion);
    if (selected.length === 2) break;
  }
  for (const suggestion of candidates) {
    if (selected.length === 2) break;
    if (!selected.includes(suggestion)) selected.push(suggestion);
  }
  if (!selected.length) {
    selected.push({
      title: "Manter a revisão periódica",
      detail: "Revisar as diretrizes patrimoniais conforme mudarem os objetivos e a realidade familiar.",
    });
    selected.push({
      title: "Preservar a visão integrada",
      detail: "Continuar avaliando investimentos, proteção, estratégia e decisões em conjunto.",
    });
  }
  if (selected.length === 1) selected.push({
    title: "Revisão integrada",
    detail: "Manter a revisão periódica das quatro áreas para acompanhar novas necessidades.",
  });
  return { areas, priorities: selected.slice(0, 2).map(({ title, detail }) => ({ title, detail })) };
}

export const ROAD_TAGLINE = "Seu patrimônio, seu legado, seu caminho.";
export const ROAD_REPORT_INTRO = "Este Check-up apresenta uma leitura inicial da organização do patrimônio, com base nas respostas informadas. Ele ajuda a identificar aspectos que merecem atenção e aprofundamento.";
export const ROAD_REPORT_NOTICE = "Avaliação indicativa baseada em respostas autodeclaradas. Uma análise individualizada depende de informações adicionais sobre patrimônio, objetivos, liquidez e contexto familiar.";
export const ROAD_CTA_LINK = "https://wa.me/5542984242852?text=" +
  encodeURIComponent("Olá! Realizei o Check-up ROAD e gostaria de aprofundar meu diagnóstico patrimonial.");
