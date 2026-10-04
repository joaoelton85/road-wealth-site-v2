import { existsSync, readFileSync } from "node:fs";

const checks = [
  {
    file: "dist/index.html",
    required: [
      'road-build" content="19.0.0"',
      'data-road-build="19.0.0"',
      "Informação para acompanhar decisões.",
      "CHECK-UP ROAD",
      "Investir não precisa ser tão complicado.",
      "road-callout-panel",
      "Entre em contato",
      "market-ticker-label",
      "market-ticker-brand",
      "MERCADOS",
      "TradingView",
      "Brent",
      "Soja",
      "Milho",
      "Trigo",
      "Nasdaq 100",
    ],
    minimumOccurrences: [
      ["road-callout-panel", 3],
    ],
  },
  {
    file: "dist/a-road/index.html",
    required: [
      'road-build" content="19.0.0"',
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
      failures.push(`${check.file}: conteúdo que deveria ter sido removido ainda existe -> ${token}`);
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

console.log("ROAD build verification OK — V19.0.0");
