import { existsSync, readFileSync } from "node:fs";

const checks = [
  {
    file: "dist/index.html",
    required: [
      'road-build" content="17.0.0"',
      'data-road-build="17.0.0"',
      "Informação para acompanhar decisões.",
      "CHECK-UP ROAD",
      "Investir não precisa ser tão complicado.",
      "Entre em contato",
      "MERCADOS",
    ],
  },
  {
    file: "dist/a-road/index.html",
    required: [
      'road-build" content="17.0.0"',
      "CONHEÇA ENTRE RIOS",
      "F-2JRohFQdk",
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
  for (const token of check.required) {
    if (!html.includes(token)) {
      failures.push(`${check.file}: conteúdo obrigatório ausente -> ${token}`);
    }
  }
}

if (failures.length) {
  console.error("\nROAD build verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("ROAD build verification OK — V17.0.0");
