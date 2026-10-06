import { existsSync, readFileSync } from "node:fs";

const checks = [
  {
    file: "dist/__road-build.json",
    required: [
      '"roadBuild": "38.0.0"',
    ],
  },
  {
    file: "dist/index.html",
    required: [
      'road-build" content="38.0.0"',
      'data-road-build="38.0.0"',
      "CHECK-UP ROAD",
      "road-highlights",
      "road-highlights__slide",
      "road-highlights__pager",
      "DESTAQUE",
      "Como está seu planejamento financeiro?",
      "Faça um teste rápido e receba seu diagnóstico.",
      "Planeje melhor seu IR.",
      "Acompanhe mercados, juros, câmbio e ferramentas para suas decisões.",
      "hero--road-photo",
      "road-hero-caminho-v35.webp",
      "road-market-note",
      "home-contact",
      "Entre em contato",
      "market-ticker-label",
      "market-ticker-row--desktop",
      "market-ticker-mobile-live",
      "market-ticker-mobile-widget",
      'data-road-ticker="desktop"',
      "tv-ticker-tape",
      'direction="horizontal"',
      'item-size="compact"',
      "MERCADOS",
      "DI Jan/30",
      "DI Jan/35",
      "Carregando cotações…",
      "displayMode:'adaptive'",
      "isTransparent:true",
      "https://www.tradingview-widget.com/w/en/tv-ticker-tape.js",
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
    ],
    forbidden: [
      "retryCompact",
      "Cotações temporariamente indisponíveis",
      "market-ticker-brand",
      "data-road-ticker=\"mobile\"",
      "tv-ticker-tape",
      "https://www.tradingview-widget.com/w/en/tv-ticker-tape.js",
      "Brent",
      "S&P 500",
      "Nasdaq 100",
      "Soja",
      "Milho",
      "Trigo",
    ],
    minimumOccurrences: [
      ["road-callout-panel", 1],
    ],
  },
  {
    file: "dist/calculadora-ir/index.html",
    required: [
      'road-build" content="38.0.0"',
      "Calculadora de IR 2026",
      "Rendimentos tributáveis do titular",
      "Número de dependentes",
      "Pessoas com despesa de educação",
      "Despesas médicas dedutíveis não reembolsadas",
      "PGBL já aportado em 2026",
      "Criança e Adolescente",
      "Fundo da Pessoa Idosa",
      "Cultura",
      "Esporte",
      "R$ 17.640,00",
      "R$ 2.275,08",
      "R$ 3.561,50",
      "12%",
      "formatCurrencyField",
      "O espaço adicional de PGBL é apenas uma simulação potencial.",
      "IR usado como base dos incentivos",
      "Critérios da simulação",
    ],
  },
  {
    file: "dist/a-road/index.html",
    required: [
      'road-build" content="38.0.0"',
      "F-2JRohFQdk",
      "youtube-lite",
      "Uma leitura inicial do patrimônio em poucos minutos.",
      "road-callout-panel",
    ],
    forbidden: [
      "CONHEÇA ENTRE RIOS",
      "Uma comunidade onde tradição, cultura e desenvolvimento caminham juntos.",
      "Um breve olhar sobre Entre Rios e a região que abriga a sede da ROAD.",
    ],
  },
  {
    file: "dist/investimentos/index.html",
    required: [
      "Mercado é contexto. Estratégia é decisão.",
      "road-callout-panel",
    ],
  },
  {
    file: "dist/patrimonio/index.html",
    required: [
      "Entender melhor também faz parte de decidir melhor.",
      "road-callout-panel",
      "CHECK-UP ROAD",
    ],
  },
  {
    file: "dist/conhecimento/index.html",
    required: [
      "Da teoria para a leitura do mercado.",
      "road-callout-panel",
    ],
  },
];

const failures = [];

for (const check of checks) {
  if (!existsSync(check.file)) {
    failures.push(`${check.file}: arquivo não gerado`);
    continue;
  }

  const html = readFileSync(check.file, "utf8");

  for (const token of check.required || []) {
    if (!html.includes(token)) {
      failures.push(`${check.file}: conteúdo obrigatório ausente -> ${token}`);
    }
  }

  for (const token of check.forbidden || []) {
    if (html.includes(token)) {
      failures.push(`${check.file}: conteúdo que deveria estar ausente -> ${token}`);
    }
  }

  for (const [token, minimum] of check.minimumOccurrences || []) {
    const occurrences = html.split(token).length - 1;
    if (occurrences < minimum) {
      failures.push(`${check.file}: ${token} aparece ${occurrences} vez(es); mínimo esperado: ${minimum}`);
    }
  }
}

if (failures.length) {
  console.error("\nROAD build verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("ROAD build verification OK — V38.0.0");
