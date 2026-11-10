import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("src/styles/road-footer-desktop-v65-8.css","utf8");
const layout = readFileSync("src/layouts/BaseLayout.astro","utf8");
const footer = readFileSync("src/components/Footer.astro","utf8");

test("rodapé Desktop alinha três conjuntos pelo centro sem afetar Mobile", () => {
  assert.match(css, /@media\s*\(min-width:\s*1201px\)/);
  assert.match(css, /\.footer\s+\.footer-primary\s*\{\s*align-items:\s*center\s*!important/);
  for (const name of ["footer-brand-group","footer-meta","footer-right"])
    assert(css.includes(".footer-primary > ."+name),name+" precisa partilhar alinhamento");
  assert.match(css, /align-self:\s*center\s*!important/);
  assert.doesNotMatch(css, /max-width|min-height|grid-template-columns|grid-template-areas/);
  assert(layout.indexOf("road-footer-desktop-v65-8.css") > layout.indexOf("road-legacy-consolidated.css"));
  assert(footer.includes("footer-brand-group") && footer.includes("footer-meta") && footer.includes("footer-right"));
});
