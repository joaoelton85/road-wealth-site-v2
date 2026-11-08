import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync("src/pages/index.astro", "utf8");
test("Home apresenta Conheça a ROAD na abertura sem repetir bloco ao final", () => {
  assert.equal((home.match(/href="\\/a-road\\/"/g) || []).length, 1);
  assert(home.includes("Conheça a ROAD"));
  assert(home.includes("Fazer Check-up Financeiro"));
  assert(!home.includes("home-a-road"));
  assert(!home.includes("Conheça melhor a ROAD"));
  assert(!home.includes("Comece pela Consultoria"));
});
test("Home mantém sequência e áreas principais", () => {
  const sections = ["hero--road-photo", "home-institutions", "home-areas", "home-planning", "home-intro"];
  let last = -1;
  for (const section of sections) {
    const position = home.indexOf(section);
    assert(position > last, "Bloco ausente ou fora de ordem: " + section);
    last = position;
  }
  assert(home.includes("InstitutionsPlatforms") || home.includes("<InstitutionPlatforms"));
  assert(home.includes("<RoadMandala"));
  assert(home.includes('href="/patrimonio/#checkup-road"'));
});
