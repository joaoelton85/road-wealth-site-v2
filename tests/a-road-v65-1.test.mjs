import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync("src/pages/a-road.astro", "utf8");
test("Wealth explica Wealth Services com um único parágrafo", () => {
  const start = page.indexOf('id="wealth"');
  const end = page.indexOf('id="origem"');
  assert(start >= 0 && end > start, "Capítulo Wealth não encontrado");
  const chapter = page.slice(start, end);
  assert(chapter.includes("Consultoria de Investimentos como ponto de partida"));
  assert(chapter.includes("Wealth Services"));
  assert(chapter.includes("Consultoria de Investimentos Independente"));
  assert.equal(chapter.split("<p>").length - 1, 1);
});
test("Propósito foi removido sem afetar os capítulos vizinhos", () => {
  assert(!page.includes('id="proposito"'));
  assert(!page.includes('data-chapter-link="proposito"'));
  assert(!page.includes("nosso propósito"));
  assert(page.includes('data-chapter-link="rede"'));
  assert(page.includes('data-chapter-link="presenca"'));
  assert(page.includes("const order=chapterLinks.map"));
});
