import { existsSync, readFileSync } from "node:fs";

const checks = [
  {
    file: "src/layouts/BaseLayout.astro",
    required: ['import "../styles/v49.css";', 'const BUILD_VERSION = "49.0.0";'],
  },
  {
    file: "src/components/MarketTicker.astro",
    required: ["displayMode:'regular'"],
    forbidden: ["displayMode:'adaptive'"],
  },
  {
    file: "src/components/RoadHighlights.astro",
    required: [
      "road-highlights__label-text",
      "Mostrar Conhecimento ROAD",
      "Conceitos, ferramentas e Glossário ROAD para entender melhor suas decisões.",
    ],
  },
  {
    file: "src/pages/index.astro",
    required: [
      'class="planning-step-number">01',
      'class="planning-step-number">05',
      "road-contact-info",
    ],
    forbidden: ["RoadCallout", "road-callout"],
  },
  { file: "src/pages/a-road.astro", forbidden: ["RoadCallout", "road-callout"] },
  { file: "src/pages/investimentos.astro", forbidden: ["RoadCallout", "road-callout"] },
  { file: "src/pages/patrimonio.astro", forbidden: ["RoadCallout", "road-callout"] },
  { file: "src/pages/conhecimento.astro", forbidden: ["RoadCallout", "road-callout"] },
  {
    file: "src/pages/calculadora-ir.astro",
    required: [
      "SIMULAÇÃO IRPF 2026",
      "Ano-calendário 2026",
      "Exercício 2027",
      "Ficou em dúvida?",
      "Fale com a gente →",
      "A simulação calcula os dois caminhos",
    ],
    forbidden: ["Protótipo", "protótipo"],
  },
  {
    file: "src/data/glossario.ts",
    required: [
      '"term": "Pix"',
      '"term": "Open Finance"',
      '"term": "Open Insurance"',
      '"term": "Drex"',
      '"term": "CBDC"',
      '"term": "Tokenização"',
      '"term": "Diferimento / diferido"',
    ],
  },
  { file: "dist/__road-build.json", required: ['"roadBuild": "49.0.0"'] },
  {
    file: "dist/index.html",
    required: [
      'road-build" content="49.0.0"',
      'data-road-build="49.0.0"',
      "DESTAQUE",
      "Conceitos, ferramentas e Glossário ROAD para entender melhor suas decisões.",
      "planning-step-number",
      "platforms-block",
      "DI Jan/30",
      "DI Jan/35",
    ],
    forbidden: ["road-callout-panel"],
  },
  {
    file: "dist/calculadora-ir/index.html",
    required: [
      'road-build" content="49.0.0"',
      "SIMULAÇÃO IRPF 2026",
      "Ficou em dúvida?",
      "Fale com a gente",
    ],
    forbidden: ["Protótipo", "protótipo"],
  },
  {
    file: "dist/glossario/index.html",
    required: [
      'road-build" content="49.0.0"',
      "160 verbetes",
      "Pix",
      "Open Finance",
      "Drex",
      "Diferimento / diferido",
    ],
  },
  { file: "dist/a-road/index.html", forbidden: ["road-callout-panel"] },
  { file: "dist/investimentos/index.html", forbidden: ["road-callout-panel"] },
  { file: "dist/patrimonio/index.html", forbidden: ["road-callout-panel"] },
  { file: "dist/conhecimento/index.html", forbidden: ["road-callout-panel"] },
];

const failures = [];
for (const check of checks) {
  if (!existsSync(check.file)) {
    failures.push(`${check.file}: arquivo não gerado`);
    continue;
  }
  const content = readFileSync(check.file, "utf8");
  for (const token of check.required || []) {
    if (!content.includes(token)) failures.push(`${check.file}: conteúdo obrigatório ausente -> ${token}`);
  }
  for (const token of check.forbidden || []) {
    if (content.includes(token)) failures.push(`${check.file}: conteúdo que deveria estar ausente -> ${token}`);
  }
}
if (failures.length) {
  console.error("\nROAD build verification failed:");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("ROAD build verification OK — V49.0.0");
