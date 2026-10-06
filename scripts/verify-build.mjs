import { existsSync, readFileSync } from "node:fs";

const checks = [
  {
    file: "src/layouts/BaseLayout.astro",
    required: [
      'import { ClientRouter } from "astro:transitions";',
      'transition:animate="none"',
      '<ClientRouter fallback="swap" />',
      'transition:persist="road-site-top"',
      "astro:after-swap",
      "astro:page-load",
      "__roadPersistentShellBound",
    ],
  },
  {
    file: "src/components/MarketTicker.astro",
    required: [
      "displayMode:'regular'",
    ],
    forbidden: [
      "displayMode:'adaptive'",
    ],
  },
  {
    file: "src/components/Header.astro",
    required: [
      'data-road-nav="a-road"',
      'data-road-nav="conhecimento"',
      "__roadHeaderBound",
    ],
  },
  {
    file: "src/components/MarketTools.astro",
    required: [
      "__roadMarketToolsBound",
      ".js-placeholder",
    ],
  },
  {
    file: "dist/__road-build.json",
    required: [
      '"roadBuild": "43.0.0"',
    ],
  },
  {
    file: "dist/index.html",
    required: [
      'road-build" content="43.0.0"',
      'data-road-build="43.0.0"',
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
      "Consultoria de Investimentos e planejamento patrimonial para famílias e negócios com patrimônio no Brasil e no exterior.",
      "Proximidade para entender. Clareza para planejar. Cuidado para acompanhar.",
      "PLANEJAMENTO FINANCEIRO",
      "Um processo contínuo, não um documento isolado.",
      "Quatro áreas. Uma leitura integrada do patrimônio.",
      "Seu patrimônio pode estar onde fizer sentido para você.",
      "platforms-block",
      "Conheça a empresa por trás do caminho.",
      "Patrimônio também é relacionamento.",
      "Entender objetivos, explicar decisões com clareza",
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
      "displayMode:'regular'",
      "isTransparent:true",
      "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js",
      "https://www.tradingview-widget.com/w/en/tv-ticker-tape.js",
      "customElements.whenDefined('tv-ticker-tape')",
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
    ],
    forbidden: [
      "retryCompact",
      "Cotações temporariamente indisponíveis",
      "market-ticker-brand",
      "data-road-ticker=\"mobile\"",
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
      'road-build" content="43.0.0"',
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
      'road-build" content="43.0.0"',
      "F-2JRohFQdk",
      "youtube-lite",
      "Uma leitura inicial do patrimônio em poucos minutos.",
      "road-callout-panel",
      "data-road-story-carousel",
      "Consultoria",
      "Por que Wealth?",
      "Origem da Marca",
      "Quem somos",
      "Propósito",
      "Onde estamos",
      "Faça parte da ROAD",
      "roadCarouselProgress",
      "15000",
      "Diferentes instituições. Uma estratégia.",
      "Nosso trabalho começa por entender objetivos, explicar decisões com clareza",
    ],
    forbidden: [
      "História",
      "NOSSA HISTÓRIA",
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
      "Objetivos transformados em um plano.",
      "Escolhas que podem mudar o percurso.",
    ],
  },
  {
    file: "dist/conhecimento/index.html",
    required: [
      "Da teoria para a leitura do mercado.",
      "road-callout-panel",
      "Abrir Glossário ROAD",
      "/glossario/",
    ],
  },
  {
    file: "dist/glossario/index.html",
    required: [
      'road-build" content="43.0.0"',
      "GLOSSÁRIO ROAD",
      "Finanças não precisam parecer uma língua estrangeira.",
      "153 verbetes",
      "Spread de câmbio",
      "Spread de crédito",
      "Letra Financeira",
      "Cota sênior",
      "Cota mezanino",
      "Cota subordinada",
      "Subordinação",
      "IVVB11",
      "SMLL",
      "DI Jan/30 e DI Jan/35",
      "IMA-B 5",
      "IHFA",
      "Commission-based",
      "Fee-based",
      "Fee-only",
      "FGC: SIM",
      "FGC: NÃO",
      "FONTES DE REFERÊNCIA",
      "data-glossary-entry",
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

console.log("ROAD build verification OK — V43.0.0");
