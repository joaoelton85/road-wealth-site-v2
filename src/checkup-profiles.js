// Perguntas partilhadas pelos dois percursos do Check-up ROAD.
// A fonte única evita divergências entre o site e a pontuação do servidor.
const investimentos = {
  kicker: "INVESTIMENTOS",
  title: "Uma estratégia antes de uma carteira.",
  body: "A ROAD parte dos objetivos, do perfil e da Política de Investimentos para analisar, consolidar e acompanhar as decisões financeiras do cliente — inclusive quando o patrimônio está distribuído entre diferentes instituições.",
  points: ["Política de Investimentos", "Consolidação de instituições", "Diversificação e risco", "Acompanhamento e rebalanceamento"],
  questions: [
    "Sua carteira segue uma Política de Investimentos claramente definida?",
    "Você conhece a concentração do seu patrimônio por instituição, emissor, classe de ativo e moeda?",
    "Você sabe qual foi o retorno líquido e real dos seus investimentos nos últimos períodos?",
    "Seus investimentos mantidos em diferentes instituições são analisados como uma única carteira?"
  ]
};
const legadoFamiliar = {
  kicker: "LEGADO",
  title: "Proteção e continuidade do patrimônio.",
  body: "Legado compreende proteção de bens, saúde, sucessão e continuidade patrimonial, com atenção às necessidades de cada família.",
  points: ["Sucessão e continuidade", "Liquidez sucessória", "Saúde e proteção familiar", "Seguro de bens"],
  questions: [
    "Sua família tem uma estimativa dos tributos, custos e liquidez necessários em uma eventual sucessão patrimonial?",
    "Existem instrumentos ou reservas especificamente pensados para garantir liquidez à família nesse momento?",
    "A família possui instrumentos de proteção médica compatíveis com o padrão de atendimento desejado, inclusive em hospitais de referência no Brasil ou no exterior?",
    "Sua residência e seus principais bens possuem seguros adequados aos riscos a que estão expostos?",
    "As estruturas de proteção e sucessão existentes foram revisadas recentemente e ainda refletem a realidade atual da família e do patrimônio?"
  ]
};
const legadoEmpresarial = {
  kicker: "LEGADO",
  title: "Proteção e continuidade da família e dos negócios.",
  body: "Legado considera sucessão, continuidade das operações, seguro de bens e proteção familiar em conjunto.",
  points: ["Sucessão patrimonial", "Continuidade dos negócios", "Seguro patrimonial e rural", "Saúde e proteção familiar"],
  questions: [
    "Sua família tem uma estimativa dos tributos, custos e liquidez necessários em uma eventual sucessão patrimonial?",
    "Existem mecanismos para preservar a continuidade do negócio diante do afastamento, falecimento ou saída de sócios e responsáveis essenciais?",
    "Os principais imóveis, máquinas, equipamentos e outros bens da empresa ou atividade rural possuem seguros adequados aos riscos a que estão expostos?",
    "Sua família possui proteção médica que permita acesso a atendimento de alta qualidade, sem expor o patrimônio a despesas elevadas?"
  ]
};
const capitalComum = [
  "Mesmo quando dispõe de recursos próprios, você avalia se utilizar linhas de crédito pode ser mais vantajoso?",
  "Você conhece as alternativas de crédito disponíveis, incluindo linhas com condições diferenciadas que poderiam beneficiar seus projetos?"
];
const capitalFamiliar = {
  kicker: "CAPITAL",
  title: "Inteligência na utilização do capital.",
  body: "Capital avalia alternativas de crédito e a utilização de recursos próprios ou de terceiros, considerando oportunidades, liquidez e riscos.",
  points: ["Capital próprio e de terceiros", "Alternativas de crédito", "Condições de captação", "Preservação de liquidez"],
  questions: [...capitalComum]
};
const capitalEmpresarial = {
  kicker: "CAPITAL",
  title: "Inteligência na captação e utilização do capital.",
  body: "Capital conecta crédito, financiamento, tesouraria, estrutura de recursos e gestão de passivos para empresas e atividades rurais.",
  points: ["Estrutura de capital", "Crédito e captação", "Tesouraria e liquidez", "Gestão de passivos"],
  questions: [
    ...capitalComum,
    "Você acredita que o caixa de sua empresa ou atividade rural está aplicado nas melhores condições de remuneração disponíveis no mercado?",
    "Sua empresa ou atividade rural planeja conjuntamente suas necessidades de caixa, investimentos e utilização de crédito?"
  ]
};
const planejamentoFamiliar = {
  kicker: "PLANEJAMENTO",
  title: "Do cotidiano às grandes decisões patrimoniais.",
  body: "Planejamento integra objetivos pessoais, organização financeira, projetos e decisões relevantes ao longo das diferentes fases da vida.",
  points: ["Objetivos e prioridades", "Organização financeira", "Projetos de vida", "Planejamento patrimonial integrado"],
  questions: [
    "Você possui objetivos financeiros e patrimoniais definidos, com prioridades e prazos claros para alcançá-los?",
    "Você acompanha suas receitas, despesas e compromissos futuros para avaliar se seus planos são financeiramente viáveis?",
    "Seu planejamento considera necessidades futuras relevantes, como aposentadoria, educação dos filhos e grandes aquisições?",
    "Antes de decisões importantes, como adquirir um imóvel ou realizar um projeto, você avalia alternativas, riscos e impactos patrimoniais?",
    "Você possui um planejamento que integra suas decisões familiares, financeiras e patrimoniais, revisado conforme seus objetivos e circunstâncias mudam?"
  ]
};
const planejamentoEmpresarial = {
  kicker: "PLANEJAMENTO",
  title: "Planejar a vida, o patrimônio e os negócios.",
  body: "Planejamento reúne objetivos familiares e empresariais, análise de projetos, viabilidade econômica e decisões patrimoniais integradas.",
  points: ["Objetivos familiares e empresariais", "Viabilidade de projetos", "Patrimônio e negócios", "Revisão do planejamento"],
  questions: [
    "Os objetivos da família e dos negócios estão definidos e alinhados para os próximos anos?",
    "Antes de expandir, adquirir uma propriedade ou iniciar um novo projeto, você avalia sua viabilidade econômica e os riscos envolvidos?",
    "Ao tomar decisões sobre seus negócios, você considera também os impactos sobre o patrimônio pessoal e familiar?",
    "O planejamento dos negócios e do patrimônio familiar é revisado periodicamente, acompanhando mudanças nos objetivos e nas condições econômicas?"
  ]
};

export const ROAD_CHECKUP_AREA_ORDER = ["investments", "legacy", "capital", "planning"];
export const ROAD_CHECKUP_PROFILES = {
  familiar: {
    label: "Patrimonial / Familiar",
    areas: { investments: investimentos, legacy: legadoFamiliar, capital: capitalFamiliar, planning: planejamentoFamiliar }
  },
  empresarial: {
    label: "Empresarial / Agro",
    areas: { investments: investimentos, legacy: legadoEmpresarial, capital: capitalEmpresarial, planning: planejamentoEmpresarial }
  }
};
