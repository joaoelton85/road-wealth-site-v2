import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync("src/pages/a-road.astro", "utf8");
test("Wealth explica Wealth Services com um único parágrafo", () => {
  const match = page.match(/<section class="section section--white chapter-section" id="wealth"[\\s\\S]*?<\\/section>/);
  assert(match, "Capítulo Wealth não encontrado");
  const chapter = match[0];
  assert.match(chapter, /Consultoria de Investimentos como ponto de partida/);
  assert.match(chapter, /Wealth Services/);
  assert.match(chapter, /Consultoria de Investimentos Independente/);
  assert.equal((chapter.match(/<p>/g) || []).length, 1);
});
test("Propósito foi removido sem afetar os capítulos vizinhos", () => {
  assert.doesNotMatch(page, /id="proposito"|data-chapter-link="proposito"|nosso propósito/);
  assert.match(page, /data-chapter-link="rede"/);
  assert.match(page, /data-chapter-link="presenca"/);
  assert.match(page, /const order=chapterLinks\\.map/);
});
