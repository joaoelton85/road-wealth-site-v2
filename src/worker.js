import { generateCheckupPdf } from "./checkup-pdf.js";
import { parseTalentSubmission, talentInternalEmail, talentAcknowledgementEmail, saveTalent } from "./road-talents.js";
import { calculateIr, buildIrEmail } from "./ir-email.js";
import { parseContact, saveLeadEvent, notifyLead } from "./road-leads.js";
import {
  evaluateCheckup, ROAD_REPORT_INTRO, ROAD_REPORT_NOTICE, ROAD_REPORT_CTA_TITLE, ROAD_TAGLINE, ROAD_CTA_LINK,
} from "./checkup-report.js";

// Check-up ROAD — endpoint de envio seguro. Nenhum resultado é exibido no site.
const ORIGIN = "https://roadwealth.com.br";
const COLORS = {
  coffee: "#483A2F",
  sand: "#F3ECE3",
  background: "#F8F5F0",
  muted: "#72665D",
  attention: "#D4A080",
  developing: "#D7BC77",
  good: "#7BA398",
  separator: "#E2D9D0",
};

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
  return String(value).replace(/[&<>"']/g,(char)=>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);
}

// As barras são PNGs oficiais de paleta fixa (0–12), para permanecerem visíveis
// mesmo quando o Outlook/Gmail suprimem fundos coloridos na impressão.
function emailBar(area) {
  const score = Math.max(0,Math.min(12,Math.round(area.points)));
  return '<img src="'+ORIGIN+'/assets/checkup-bar-'+score+'.png" '+
    'alt="Posição indicativa de '+escapeHtml(area.label)+': '+escapeHtml(area.statusLabel)+'" '+
    'width="510" height="48" '+
    'style="display:block;width:100%;height:auto;max-width:510px;border:0;margin:0;outline:none;text-decoration:none;" />';
}

function buildEmail(report) {
  const text = [
    "SEU CHECK-UP ROAD",
    "",
    ROAD_REPORT_INTRO,
    "",
    "PERCURSO: "+report.profileLabel,
    "",
    "SEU MAPA PATRIMONIAL — SITUAÇÃO ATUAL",
    ...report.areas.map(area=>area.label+": "+area.statusLabel),
    ...(report.limited ? ["Esta avaliação é limitada pelas informações disponíveis. As classificações podem refletir desconhecimento, e não problemas comprovados."] : []),
    "",
    "O diagnóstico completo, com a análise das suas respostas, está no PDF anexo.",
    "",
    ROAD_REPORT_CTA_TITLE.toUpperCase(),
    ROAD_REPORT_NOTICE,
    "Converse com a ROAD: "+ROAD_CTA_LINK,
    "",
    ROAD_TAGLINE,
    ORIGIN,
    "Instagram: https://www.instagram.com/road.wealth/",
  ].join("\n");

  const areaRows=report.areas.map(area=>{
    return '<tr><td style="padding:16px 0 17px;border-bottom:1px solid '+COLORS.separator+';">' +
      '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">' +
      '<tr><td valign="bottom" style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:'+COLORS.coffee+';">'+
      escapeHtml(area.label)+'</td><td align="right" valign="bottom" style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:13px;font-weight:500;color:'+area.color+';">'+
      escapeHtml(area.statusLabel)+'</td></tr></table>' + emailBar(area) + '</td></tr>';
  }).join("");

  const limitedNotice=report.limited
    ? '<p style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:'+COLORS.muted+';margin:14px 0 0;">As classificações refletem as respostas disponíveis e não comprovam ausência de organização patrimonial.</p>'
    : '';

  const html='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Montserrat:wght@400;500;600&amp;family=Questrial&amp;display=swap"><style type="text/css">@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@400;500;600&family=Questrial&display=swap");@media screen and (max-width:480px){.road-email-content{padding:24px 16px!important}.road-email-map{padding:17px 14px!important}}</style><!--[if mso]><style type="text/css">h1,h2,p,td,a{font-family:Arial,sans-serif!important}</style><![endif]--></head>' +
    '<body style="margin:0;padding:0;background-color:'+COLORS.background+';font-family:Inter,Arial,Helvetica,sans-serif;color:'+COLORS.coffee+';">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="'+COLORS.background+'"><tr><td align="center" style="padding:20px 10px;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF" style="max-width:630px;background-color:#FFFFFF;border:1px solid '+COLORS.separator+';">' +
    '<tr><td class="road-email-content" style="padding:32px 28px 30px;text-align:left;">' +
    '<p style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;letter-spacing:2px;color:#9A8371;margin:0 0 12px;">ROAD WEALTH · CHECK-UP</p>' +
    '<h1 style="font-family:Questrial,Century Gothic,Trebuchet MS,Arial,sans-serif;font-size:30px;font-weight:400;line-height:1.17;letter-spacing:-.02em;margin:0 0 17px;color:'+COLORS.coffee+';">Seu Check-up ROAD</h1>' +
    '<p style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;font-weight:400;line-height:1.65;margin:0 0 23px;color:'+COLORS.muted+';">'+escapeHtml(ROAD_REPORT_INTRO)+'</p>' +
    '<p style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;letter-spacing:.03em;margin:0 0 18px;color:'+COLORS.coffee+';">Percurso: '+escapeHtml(report.profileLabel)+'</p>' +

    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="'+COLORS.sand+'" style="background-color:'+COLORS.sand+';">' +
    '<tr><td class="road-email-map" style="padding:20px 20px 18px;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>' +
    '<td style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:19px;font-weight:600;line-height:1.3;color:'+COLORS.coffee+';">Seu mapa patrimonial</td>' +
    '<td align="right" style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:10px;font-weight:500;letter-spacing:1px;color:#91806F;white-space:nowrap;">SITUAÇÃO ATUAL</td>' +
    '</tr></table>' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">'+areaRows+'</table>'+
    limitedNotice+'</td></tr></table>' +

    '<p style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;margin:20px 0;color:'+COLORS.coffee+';">O diagnóstico completo, com a análise das suas respostas, está no <strong>PDF anexo</strong>.</p>' +

    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td style="border-top:1px solid '+COLORS.separator+';padding-top:21px;">' +
    '<h2 style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:20px;line-height:1.3;font-weight:600;margin:0 0 10px;color:'+COLORS.coffee+';">'+escapeHtml(ROAD_REPORT_CTA_TITLE)+'</h2>' +
    '<p style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:'+COLORS.muted+';margin:0 0 19px;">'+escapeHtml(ROAD_REPORT_NOTICE)+'</p>' +
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="'+COLORS.sand+'" style="background-color:'+COLORS.sand+';padding:13px 18px;border:1px solid '+COLORS.coffee+';border-radius:4px;">' +
    '<a href="'+escapeHtml(ROAD_CTA_LINK)+'" style="font-family:Montserrat,Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:'+COLORS.coffee+';text-decoration:underline;text-underline-offset:3px;display:inline-block;">Conversar com a ROAD</a></td></tr></table>' +
    '</td></tr></table>' +

    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid '+COLORS.separator+';padding-top:23px;padding-bottom:4px;text-align:left;">' +
    // Logo oficial completo em PNG: duas colunas robustas para Outlook e Gmail.
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>' +
    '<td width="79" valign="middle" style="width:79px;vertical-align:middle;padding-right:15px;">' +
    '<img alt="ROAD Wealth" src="'+ORIGIN+'/assets/road-logo-cafe-email.png" width="70" height="109" style="display:block;width:70px;height:109px;border:0;outline:none;text-decoration:none;" />' +
    '</td>' +
    '<td valign="middle" style="vertical-align:middle;text-align:left;">' +
    '<p style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:'+COLORS.coffee+';margin:0 0 9px;">'+escapeHtml(ROAD_TAGLINE)+'</p>' +
    '<p style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;margin:0 0 4px;">' +
    '<a href="'+ORIGIN+'" style="color:#6A5749;text-decoration:underline;">roadwealth.com.br</a></p>' +
    '<p style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;margin:0;">' +
    '<a href="https://www.instagram.com/road.wealth/" style="color:#6A5749;text-decoration:underline;">Instagram @road.wealth</a></p>' +
    '</td></tr></table>' +
    '</td></tr></table>' +
    '</td></tr></table></td></tr></table></body></html>';
  return {text,html};
}


// Cópia interna do diagnóstico solicitado: mesma análise e mesmo PDF entregues ao
// visitante, acompanhados apenas de identificação e permissões de atendimento.
// Não equivale a consentimento para contato comercial ou marketing.
function buildCheckupInternalCopy(report, contact, customerMessage, attachments) {
  const metadata = [
    ["Nome", contact.name || "Não informado"],
    ["E-mail", contact.email],
    ["Telefone", contact.phone || "Não informado"],
    ["Percurso", report.profileLabel],
    ["Contato sobre o resultado", contact.contactConsent ? "SIM — autorizado" : "NÃO — não autorizado"],
    ["Comunicações gerais", contact.marketingConsent ? "SIM — autorizado" : "NÃO — não autorizado"],
  ];
  const plainInfo = [
    "CÓPIA INTERNA — CHECK-UP ROAD",
    "Este e-mail contém o mesmo diagnóstico e PDF enviados ao visitante.",
    ...metadata.map(([label,value]) => label + ": " + value),
    "",
    "O envio do Check-up NÃO autoriza contato posterior nem comunicações comerciais.",
    "Respeite as escolhas opcionais do visitante.",
    "",
    "===== DIAGNÓSTICO ENVIADO AO VISITANTE =====",
    customerMessage.text,
  ].join("\n");
  const infoRows = metadata.map(([label,value]) =>
    '<tr><td style="padding:3px 12px 3px 0;font-weight:600;">' + escapeHtml(label) +
    '</td><td style="padding:3px 0;">' + escapeHtml(value) + '</td></tr>'
  ).join("");
  const infoHtml =
    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" ' +
    'style="width:100%;background:#F3ECE3;color:#483A2F;font:13px/1.5 Arial,sans-serif;">' +
    '<tr><td style="padding:16px 20px;">' +
    '<strong style="font-size:14px;">CÓPIA INTERNA — CHECK-UP ROAD</strong>' +
    '<p style="margin:6px 0 12px;">Diagnóstico completo enviado ao visitante, com PDF anexo.</p>' +
    '<table role="presentation" cellspacing="0" cellpadding="0" border="0">' + infoRows + '</table>' +
    '<p style="margin:12px 0 0;"><strong>Atenção:</strong> o envio do diagnóstico não autoriza ' +
    'contato comercial ou comunicações sem a permissão correspondente.</p>' +
    '</td></tr></table>';
  // Insere identificação no começo do corpo, preservando TODO o relatório HTML.
  const internalHtml = customerMessage.html.replace(/(<body\\b[^>]*>)/i,
    (_, openTag) => openTag + infoHtml);
  if (internalHtml === customerMessage.html) throw new Error("ROAD_INTERNAL_EMAIL_HTML_INVALID");
  return {
    from: { email: "contato@roadwealth.com.br", name: "ROAD Wealth" },
    to: "contato@roadwealth.com.br",
    replyTo: "contato@roadwealth.com.br",
    subject: "[ROAD] Diagnóstico completo — Check-up " + report.profileLabel + " — " + contact.email,
    text: plainInfo,
    html: internalHtml,
    // Os bytes do PDF são copiados para evitar que o primeiro envio os consuma.
    attachments: attachments.map(({content,...meta}) => ({...meta,content:new Uint8Array(content)})),
  };
}

async function verifyTurnstile(request, token, secret, action = "road_checkup_email") {
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
      result.action === action;
  } catch {
    return false;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/checkup-config") {
      if (request.method !== "GET") return json({ error: "Método não permitido." }, 405);
      return json({
        enabled: Boolean(env.EMAIL && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY),
        siteKey: env.TURNSTILE_SITE_KEY || null,
      });
    }
    if (url.pathname === "/api/talents-config") {
      if (request.method !== "GET") return json({ error: "Método não permitido." }, 405);
      return json({
        enabled: Boolean(env.EMAIL && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY && env.CHECKUP_EMAIL_RATE_LIMIT),
        siteKey: env.TURNSTILE_SITE_KEY || null,
      });
    }
    const isTalent = url.pathname === "/api/talent-apply";
    const isCheckup = url.pathname === "/api/checkup-email";
    const isSimulation = url.pathname === "/api/ir-email";
    if (!isTalent && !isCheckup && !isSimulation) return env.ASSETS.fetch(request);

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

    if (isTalent) {
      const talent = parseTalentSubmission(payload);
      if (!talent) return json({ error: "Confira os campos obrigatórios e a autorização de cadastro." }, 400);
      const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
      if (!token || token.length > 2048 || !(await verifyTurnstile(request, token, env.TURNSTILE_SECRET_KEY, "road_talent_apply"))) {
        return json({ error: "Verificação de segurança inválida. Tente novamente." }, 403);
      }
      if (!env.CHECKUP_EMAIL_RATE_LIMIT) return json({ error: "Serviço temporariamente indisponível." }, 503);
      try {
        const {success} = await env.CHECKUP_EMAIL_RATE_LIMIT.limit({ key: "talent:"+talent.email });
        if (!success) return json({ error: "Limite de inscrições atingido. Tente novamente mais tarde." }, 429);
      } catch {
        return json({ error: "Não foi possível verificar o limite de envios." }, 503);
      }
      try {
        // A notificação interna é o recebimento principal antes do D1 estar ativo.
        // Não confirmamos a inscrição ao candidato se essa etapa falhar.
        await env.EMAIL.send(talentInternalEmail(talent));
      } catch (error) {
        console.error("ROAD talent internal delivery failed", error?.code || "UNKNOWN");
        return json({ error: "Não foi possível receber sua apresentação agora. Tente novamente." }, 503);
      }
      let confirmationSent = true;
      try {
        await env.EMAIL.send(talentAcknowledgementEmail(talent));
      } catch (error) {
        confirmationSent = false;
        console.error("ROAD talent confirmation failed", error?.code || "UNKNOWN");
      }
      const registerTalent = async () => {
        try {
          await saveTalent(env,talent);
        } catch (error) {
          console.error("ROAD talent database write failed", error?.code || "UNKNOWN");
        }
      };
      if (ctx?.waitUntil) ctx.waitUntil(registerTalent());
      else await registerTalent();
      return json({
        success:true,
        message: confirmationSent
          ? "Sua apresentação foi recebida. Enviamos uma confirmação para seu e-mail."
          : "Sua apresentação foi recebida. A confirmação por e-mail não pôde ser enviada, mas não é necessário reenviar."
      },202);
    }

    const email = typeof payload?.email === "string" ? payload.email.trim() : "";
    if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[A-Za-z]{2,}$/.test(email)) {
      return json({ error: "Informe um e-mail válido." }, 400);
    }
    if (payload.consent !== true) {
      return json({ error: "É necessário autorizar o envio do resultado." }, 400);
    }
    const contact = parseContact(payload);
    if (!contact) return json({ error: "Confira o nome e o telefone informados." }, 400);
    const report = isCheckup
      ? evaluateCheckup(payload.answers, payload.profile)
      : calculateIr(payload.inputs);
    if (!report) return json({ error: isCheckup ? "Respostas do Check-up incompletas." : "Dados da simulação inválidos." }, 400);
    const token = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
    const action = isCheckup ? "road_checkup_email" : "road_simulator_email";
    if (!token || token.length > 2048 || !(await verifyTurnstile(request, token, env.TURNSTILE_SECRET_KEY, action))) {
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
      const message = isCheckup ? buildEmail(report) : buildIrEmail(report, contact.name);
      const attachments = isCheckup ? [{
        filename: "Diagnostico-Check-up-ROAD.pdf",
        type: "application/pdf",
        disposition: "attachment",
        content: await generateCheckupPdf(report),
      }] : [];
      await env.EMAIL.send({
        from: { email: "contato@roadwealth.com.br", name: "ROAD Wealth" },
        to: contact.email,
        replyTo: "contato@roadwealth.com.br",
        subject: isCheckup ? "Seu resultado — Check-up ROAD" : "Sua simulação — IR e Doações | ROAD Wealth",
        ...message,
        ...(attachments.length ? {attachments} : {}),
      });
      const registerDelivery = async () => {
        try {
          await saveLeadEvent(env,contact,isCheckup?"checkup":"ir_doacoes",isCheckup?payload.profile:null);
        } catch (dbError) {
          console.error("ROAD lead registration failed",dbError?.code||"UNKNOWN");
        }
        try {
          if (isCheckup) {
            // Só encaminhar internamente após a aceitação do envio ao cliente.
            // Falha na cópia interna não solicita reenvio ao cliente nem duplica relatórios.
            await env.EMAIL.send(buildCheckupInternalCopy(report, contact, message, attachments));
          } else {
            // A calculadora mantém apenas o aviso mínimo, sem valores fiscais.
            await notifyLead(env,contact,"ir_doacoes");
          }
        } catch (notifyError) {
          console.error(isCheckup?"ROAD checkup internal copy failed":"ROAD lead notification failed",
            notifyError?.code||"UNKNOWN");
        }
      };
      // No Worker real, a gravação e o aviso interno seguem via waitUntil sem
      // atrasar a confirmação do e-mail do visitante.
      if (ctx?.waitUntil) ctx.waitUntil(registerDelivery());
      else await registerDelivery();
      return json({ success: true, message: "Solicitação de envio recebida." }, 202);
    } catch (error) {
      console.error("Check-up email send failed", error?.code || "UNKNOWN");
      return json({ error: "Não foi possível enviar o resultado. Tente novamente." }, 503);
    }
  },
};
