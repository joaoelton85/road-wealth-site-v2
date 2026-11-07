import { base64, metadata, glyphs } from "./pdf-assets/checkup-base.js";
import { ROAD_REPORT_INTRO, ROAD_REPORT_NOTICE, ROAD_TAGLINE } from "./checkup-report.js";

// The base already contains the three brand fonts and the vector logo. Only the
// text and drawing commands vary per report. No font parsing or network I/O
// takes place during an email request.
const template = Uint8Array.from(atob(base64), char => char.charCodeAt(0));
const encoder = new TextEncoder();
const PAGE_HEIGHT = 842;
const LEFT = 44;
const WIDTH = 507;
const COFFEE = "#49392E";
const MUTED = "#655A50";
const SAND = "#E7DED4";
const FOREST = "#345A50";

function color(hex) {
  return [1, 3, 5].map(pos => (parseInt(hex.slice(pos, pos + 2), 16) / 255).toFixed(3)).join(" ");
}

function glyph(font, char) {
  return glyphs[font][char] || glyphs[font]["?"];
}

function measure(text, font, size) {
  let units = 0;
  for (const char of text) units += glyph(font, char)[1];
  return units * size / 1000;
}

function linesFor(text, font, size, width) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const candidate = line ? line + " " + word : word;
    if (line && measure(candidate, font, size) > width) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function fillTemplate(commands) {
  // Standard incremental update of the existing page-content stream. All
  // operands are PDF operators, numbers or hex-encoded glyph IDs (ASCII).
  const stream = commands.join("\n") + "\n";
  const object = metadata.object + " 0 obj\n<< /Length " + stream.length +
    " >>\nstream\n" + stream + "endstream\nendobj\n";
  const xref = template.length + object.length;
  const trailer = "xref\n" + metadata.object + " 1\n" +
    String(template.length).padStart(10, "0") + " 00000 n \ntrailer\n<< /Size " +
    metadata.size + " /Root " + metadata.root + " 0 R /Prev " + metadata.xref +
    " >>\nstartxref\n" + xref + "\n%%EOF\n";
  const update = encoder.encode(object + trailer);
  const result = new Uint8Array(template.length + update.length);
  result.set(template);
  result.set(update, template.length);
  return result;
}

export function generateCheckupPdf(report) {
  const commands = [];
  function text(value, x, top, font, size, ink = COFFEE) {
    const encoded = Array.from(value, char => glyph(font, char)[0]).join("");
    commands.push(`BT /${font} ${size} Tf ${color(ink)} rg 1 0 0 1 ${x} ${PAGE_HEIGHT - top} Tm <${encoded}> Tj ET`);
  }
  function rect(x, top, width, height, ink) {
    commands.push(`q ${color(ink)} rg ${x} ${PAGE_HEIGHT - top - height} ${width} ${height} re f Q`);
  }
  function paragraph(value, x, top, font, size, width, leading, ink = MUTED) {
    for (const line of linesFor(value, font, size, width)) {
      text(line, x, top, font, size, ink);
      top += leading;
    }
    return top;
  }
  text("ROAD WEALTH", LEFT, 52, "Montserrat", 9, FOREST);
  text("Seu Check-up ROAD", LEFT, 91, "Questrial", 34);
  paragraph(ROAD_REPORT_INTRO, LEFT, 122, "Inter", 10.5, WIDTH, 15);
  rect(LEFT, 154, WIDTH, 1, SAND);

  text("Seu mapa patrimonial", LEFT, 186, "Questrial", 22);
  const caption = "SITUAÇÃO ATUAL";
  text(caption, LEFT + WIDTH - measure(caption, "Montserrat", 8), 185, "Montserrat", 8, MUTED);
  let y = 214;
  for (const area of report.areas) {
    text(area.label, LEFT, y, "Montserrat", 10.5);
    text(area.statusLabel, LEFT + WIDTH - measure(area.statusLabel, "Inter", 10), y, "Inter", 10, MUTED);
    // Thirteen possible positions for scores from 0 through 12. The point at
    // zero is visible even when the result is entirely unknown.
    rect(LEFT, y + 10, WIDTH, 3, SAND);
    rect(LEFT, y + 10, WIDTH * area.points / 12, 3, area.color);
    rect(LEFT + (WIDTH - 3) * area.points / 12, y + 7.5, 3, 8, area.color);
    y += 37;
  }
  if (report.limited) {
    y = paragraph("As classificações refletem as respostas disponíveis e não comprovam ausência de organização patrimonial.",
      LEFT, y, "Inter", 9.5, WIDTH, 13);
  }
  y += 12;
  text("Sua análise patrimonial", LEFT, y, "Questrial", 22);
  y += 25;
  for (const [index, item] of report.priorities.entries()) {
    text(String(index + 1).padStart(2, "0"), LEFT, y, "Montserrat", 9, FOREST);
    y = paragraph(item.title, LEFT + 27, y, "Montserrat", 11, WIDTH - 27, 15, COFFEE);
    y = paragraph(item.detail, LEFT + 27, y + 3, "Inter", 10.5, WIDTH - 27, 15);
    y += 13;
  }
  rect(LEFT, y, WIDTH, 1, SAND);
  text("Aprofunde seu diagnóstico", LEFT, y + 26, "Questrial", 18);
  paragraph(ROAD_REPORT_NOTICE, LEFT, y + 45, "Inter", 10, WIDTH, 14);

  rect(LEFT, 770, WIDTH, 1, SAND);
  text("Conversar com a ROAD", LEFT, 799, "Montserrat", 10, FOREST);
  text(ROAD_TAGLINE, LEFT + WIDTH - measure(ROAD_TAGLINE, "Inter", 9.5), 799, "Inter", 9.5);
  return fillTemplate(commands);
}
