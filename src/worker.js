import {
  evaluateCheckup, ROAD_REPORT_INTRO, ROAD_REPORT_NOTICE, ROAD_TAGLINE, ROAD_CTA_LINK,
} from "./checkup-report.js";

// API do Check-up ROAD. As demais páginas continuam sendo servidas como arquivos estáticos.
const ORIGIN = "https://roadwealth.com.br";
const SAND = "#F3ECE3";
const COFFEE = "#483A2F";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
  );
}

// Indicador para e-mail: faixas como células de tabela, com seta de posição acima.
// Não depende de gradientes ou imagens externas para renderizar os quatro resultados.
function emailBar(area) {
  const position = Math.max(1, Math.min(99, area.percentage));
  const left = position.toFixed(2);
  const right = (100 - position).toFixed(2);
  return '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin:3px 0 0;">' +
    '<tr><td width="' + left + '%" style="font-size:1px;line-height:1px;">&nbsp;</td>' +
    '<td width="1" style="width:12px;text-align:center;color:' + COFFEE + ';font-size:16px;line-height:13px;font-family:Arial,sans-serif;">▼</td>' +
    '<td width="' + right + '%" style="font-size:1px;line-height:1px;">&nbsp;</td></tr></table>' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin:0;">' +
    '<tr><td bgcolor="#D4A080" width="55%" height="12" style="height:12px;background-color:#D4A080;font-size:1px;">&nbsp;</td>' +
    '<td bgcolor="#D7BC77" width="25%" height="12" style="height:12px;background-color:#D7BC77;font-size:1px;">&nbsp;</td>' +
    '<td bgcolor="#7BA398" width="20%" height="12" style="height:12px;background-color:#7BA398;font-size:1px;">&nbsp;</td></tr></table>';
}

function buildEmail(report) {
  const textLines = report.areas.map((area) => area.label + ": " + area.statusLabel);
  const text = [
    "SEU CHECK-UP ROAD",
    "",
    ROAD_REPORT_INTRO,
    "",
    "SEU MAPA PATRIMONIAL — SITUAÇÃO ATUAL",
    ...textLines,
    "",
    "ONDE CONCENTRAR SUA ATENÇÃO",
    ...report.priorities.map((item, i) => (i + 1) + ". " + item.title + " — " + item.detail),
    "",
    "APROFUNDE SEU DIAGNÓSTICO",
    ROAD_REPORT_NOTICE,
    "Converse com a ROAD: " + ROAD_CTA_LINK,
    "",
    "ROAD Wealth",
    ROAD_TAGLINE,
    ORIGIN,
    "Instagram: https://www.instagram.com/road.wealth/",
  ].join("\n");

  const areaItems = report.areas.map((area) => {
    return '<tr><td style="padding:13px 0 16px;border-bottom:1px solid #E9E0D6;">' +
      '<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>' +
      '<td style="font:600 13px Montserrat,Arial,sans-serif;color:' + COFFEE + ';text-align:left;">' + escapeHtml(area.label) + '</td>' +
      '<td align="right" style="font:500 12px Inter,Arial,sans-serif;color:' + area.color + ';">' + escapeHtml(area.statusLabel) + '</td>' +
      '</tr></table>' + emailBar(area) + '</td></tr>';
  }).join("");
  const priorities = report.priorities.map((item, i) =>
    '<tr><td style="padding:8px 0;">' +
      '<div style="font:600 12px Montserrat,Arial,sans-serif;color:' + COFFEE + ';margin-bottom:4px;">' +
      String(i + 1).padStart(2, "0") + ' · ' + escapeHtml(item.title) + '</div>' +
      '<div style="font:400 13px/1.55 Inter,Arial,sans-serif;color:#66574B;">' + escapeHtml(item.detail) + '</div>' +
    '</td></tr>'
  ).join("");
  const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:0;background-color:#F7F3EE;color:' + COFFEE + ';font-family:Inter,Arial,sans-serif;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F7F3EE"><tr><td align="center" style="padding:18px 12px;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#FFFFFF;border:1px solid #E9E0D6;">' +
    '<tr><td style="padding:30px 30px 24px;">' +
    '<div style="font:600 11px Montserrat,Arial,sans-serif;letter-spacing:2px;color:#847261;margin-bottom:10px;">ROAD WEALTH · CHECK-UP</div>' +
    '<h1 style="font:400 28px/1.15 Questrial,Montserrat,Arial,sans-serif;margin:0 0 12px;color:' + COFFEE + ';">Seu Check-up ROAD</h1>' +
    '<p style="font:400 13px/1.65 Inter,Arial,sans-serif;color:#6A5B4F;margin:0 0 24px;">' + escapeHtml(ROAD_REPORT_INTRO) + '</p>' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="' + SAND + '" style="background:' + SAND + ';">' +
    '<tr><td style="padding:20px 18px;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="text-align:left;font:600 15px Montserrat,Arial,sans-serif;color:' + COFFEE + ';">Seu mapa patrimonial</td>' +
    '<td align="right" style="font:600 9px Montserrat,Arial,sans-serif;color:#998775;letter-spacing:1px;">SITUAÇÃO ATUAL</td></tr></table>' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0">' + areaItems + '</table>' +
    '<p style="font:400 10px/1.5 Inter,Arial,sans-serif;color:#827263;margin:15px 0 0;">Laranja · Merece atenção &nbsp;&nbsp; Dourado · Em desenvolvimento &nbsp;&nbsp; Verde · Bem estruturado</p>' +
    '</td></tr></table>' +
    '<h2 style="font:600 16px Montserrat,Arial,sans-serif;margin:26px 0 12px;">Onde concentrar sua atenção</h2>' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0">' + priorities + '</table>' +
    '<div style="border-top:1px solid #E9E0D6;margin:23px 0 18px;"></div>' +
    '<h2 style="font:600 16px Montserrat,Arial,sans-serif;margin:0 0 9px;">Aprofunde seu diagnóstico</h2>' +
    '<p style="font:400 12px/1.65 Inter,Arial,sans-serif;color:#6A5B4F;margin:0 0 18px;">' + escapeHtml(ROAD_REPORT_NOTICE) + '</p>' +
    '<a href="' + escapeHtml(ROAD_CTA_LINK) + '" style="display:inline-block;padding:12px 18px;background:' + COFFEE + ';border-radius:5px;color:#FFFFFF;text-decoration:none;font:600 12px Montserrat,Arial,sans-serif;">Conversar com a ROAD</a>' +
    '<div style="border-top:1px solid #E9E0D6;margin:26px 0 20px;"></div>' +
    // PNG do símbolo oficial do site para compatibilidade de clientes de e-mail; o HTML web mantém SVG oficial.
    '<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td style="vertical-align:middle;padding-right:10px;">' +
    '<img src="' + ORIGIN + '/assets/apple-touch-icon.png" alt="Símbolo ROAD Wealth" width="50" height="50" style="display:block;width:50px;height:50px;border:0;" /></td>' +
    '<td style="vertical-align:middle;text-align:left;"><div style="font:700 17px/1.1 Montserrat,Arial,sans-serif;letter-spacing:1px;color:' + COFFEE + ';">ROAD</div>' +
    '<div style="font:600 10px/1.4 Montserrat,Arial,sans-serif;letter-spacing:3px;color:' + COFFEE + ';">WEALTH</div></td></tr></table>' +
    '<p style="font:400 12px/1.5 Inter,Arial,sans-serif;margin:12px 0 6px;color:' + COFFEE + ';">' + escapeHtml(ROAD_TAGLINE) + '</p>' +
    '<p style="font:400 11px/1.6 Inter,Arial,sans-serif;margin:0;"><a href="' + ORIGIN + '" style="color:#695447;">roadwealth.com.br</a>' +
    ' &nbsp;&middot;&nbsp; <a href="https://www.instagram.com/road.wealth/" style="color:#695447;">Instagram @road.wealth</a></p>' +
    '</td></tr></table></td></tr></table></body></html>';
  return { text, html };
}

async function verifyTurnstile(request, token, secret) {
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) body.set("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true &&
      result.hostname === "roadwealth.com.br" &&
      result.action === "road_checkup_email";
  } catch {
    return false;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/checkup-config") {
      if (request.method !== "GET") return json({ error: "Método não permitido." }, 405);
      return json({
        enabled: Boolean(env.EMAIL && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY),
        siteKey: env.TURNSTILE_SITE_KEY || null,
      });
    }
    if (url.pathname !== "/api/checkup-email") {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
    if (request.headers.get("Origin") !== ORIGIN) {
      return json({ error: "Origem não permitida." }, 403);
    }
    if (!(request.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) {
      return json({ error: "Formato de envio inválido." }, 415);
    }
    if (Number(request.headers.get("content-length") || "0") > 8192) {
      return json({ error: "Solicitação muito grande." }, 413);
    }
    if (!env.EMAIL || !env.TURNSTILE_SECRET_KEY) {
      return json({ error: "Serviço temporariamente indisponível." }, 503);
    }

    let payload;
    try {
      const raw = await request.text();
      if (raw.length > 8192) return json({ error: "Solicitação muito grande." }, 413);
      payload = JSON.parse(raw);
    } catch {
      return json({ error: "Dados inválidos." }, 400);
    }

    const email = typeof payload?.email === "string" ? payload.email.trim() : "";
    if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[A-Za-z]{2,}$/.test(email)) {
      return json({ error: "Informe um e-mail válido." }, 400);
    }
    if (payload.consent !== true) {
      return json({ error: "É necessário autorizar o envio do resultado." }, 400);
    }
    const report = evaluateCheckup(payload.answers);
    if (!report) return json({ error: "Respostas do Check-up incompletas." }, 400);
    const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
    if (!token || token.length > 2048 || !(await verifyTurnstile(request, token, env.TURNSTILE_SECRET_KEY))) {
      return json({ error: "Verificação de segurança inválida. Tente novamente." }, 403);
    }

    if (!env.CHECKUP_EMAIL_RATE_LIMIT) {
      return json({ error: "Serviço temporariamente indisponível." }, 503);
    }
    try {
      const { success } = await env.CHECKUP_EMAIL_RATE_LIMIT.limit({ key: email.toLowerCase() });
      if (!success) {
        return json({ error: "Limite de solicitações para este endereço atingido. Tente novamente mais tarde." }, 429);
      }
    } catch {
      return json({ error: "Não foi possível verificar o limite de envios." }, 503);
    }

    try {
      const message = buildEmail(report);
      await env.EMAIL.send({
        from: { email: "contato@roadwealth.com.br", name: "ROAD Wealth" },
        to: email,
        replyTo: "contato@roadwealth.com.br",
        subject: "Seu resultado — Check-up ROAD",
        ...message,
      });
      return json({ success: true, message: "Solicitação de envio recebida." }, 202);
    } catch (error) {
      console.error("Check-up email send failed", error?.code || "UNKNOWN");
      return json({ error: "Não foi possível enviar o resultado. Tente novamente." }, 503);
    }
  },
};
