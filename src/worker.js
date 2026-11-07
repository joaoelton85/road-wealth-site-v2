// API transacional do Check-up ROAD. O site estático não é interceptado.
const ORIGIN = "https://roadwealth.com.br";
const AREAS = [
  ["investments", "Investimentos"],
  ["legacy", "Legado"],
  ["strategy", "Estratégia"],
  ["decisions", "Decisões"],
];
const ANSWERS = new Set(["sim", "parcial", "nao"]);

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

function summarize(answers) {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) return null;
  if (Object.keys(answers).length !== 16) return null;
  const summary = [];
  for (const [key, title] of AREAS) {
    let score = 0;
    for (let i = 0; i < 4; i++) {
      const answer = answers[key + "-" + i];
      if (typeof answer !== "string" || !ANSWERS.has(answer)) return null;
      score += answer === "sim" ? 2 : answer === "parcial" ? 1 : 0;
    }
    summary.push({
      title,
      status: score >= 6 ? "Bem estruturado" : score >= 3 ? "Em desenvolvimento" : "Merece atenção",
    });
  }
  return summary;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
}

function buildEmail(summary) {
  const lines = summary.map(({ title, status }) => title + ": " + status);
  const text = [
    "Seu Check-up ROAD",
    "",
    "Confira o resumo indicativo das quatro áreas avaliadas:",
    ...lines,
    "",
    "Este resultado é uma leitura inicial e não substitui uma análise patrimonial individualizada.",
    "ROAD Wealth — Seu patrimônio, seu caminho, seu legado.",
    ORIGIN,
  ].join("\n");
  const items = summary.map(({ title, status }) =>
    "<li><strong>" + escapeHtml(title) + ":</strong> " + escapeHtml(status) + "</li>"
  ).join("");
  const html = '<div style="font-family:Arial,sans-serif;color:#302b27;line-height:1.6;max-width:640px">' +
    "<h1>Seu Check-up ROAD</h1>" +
    "<p>Confira o resumo indicativo das quatro áreas avaliadas:</p><ul>" + items + "</ul>" +
    "<p>Este resultado é uma leitura inicial e não substitui uma análise patrimonial individualizada.</p>" +
    "<p>ROAD Wealth — Seu patrimônio, seu caminho, seu legado.</p>" +
    '<p><a href="' + ORIGIN + '">' + ORIGIN + "</a></p></div>";
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
    const summary = summarize(payload.answers);
    if (!summary) return json({ error: "Respostas do Check-up incompletas." }, 400);
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
      const message = buildEmail(summary);
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
