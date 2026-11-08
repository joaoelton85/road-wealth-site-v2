// Cadastro mínimo de leads, sem respostas do Check-up ou valores das simulações.
// O e-mail do resultado é uma finalidade separada do aceite de comunicações.
export function parseContact(payload) {
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[A-Za-z]{2,}$/.test(email)) return null;
  if (payload.consent !== true) return null;

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (name.length > 80 || /[\x00-\x1F\x7F]/.test(name)) return null;
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  if (phone.length > 28 || (phone && (!/^[+()\d\s.-]+$/.test(phone) || phone.replace(/\D/g, "").length < 8 || phone.replace(/\D/g, "").length > 15))) return null;
  return { email, name, phone, marketingConsent: payload.marketingConsent === true };
}

// Falha no CRM não impede o envio solicitado pelo visitante.
// Só grava dados de identificação, origem, data e consentimento de marketing.
export async function saveLeadEvent(env, contact, origin, profile = null) {
  if (!env.LEADS_DB) return false;
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await env.LEADS_DB.prepare(`
    INSERT INTO road_leads
      (id, email, name, phone, marketing_opt_in, marketing_opt_in_at, first_seen_at, last_seen_at, deliveries)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT(email) DO UPDATE SET
      name = CASE WHEN excluded.name <> '' THEN excluded.name ELSE road_leads.name END,
      phone = CASE WHEN excluded.phone <> '' THEN excluded.phone ELSE road_leads.phone END,
      marketing_opt_in = CASE WHEN excluded.marketing_opt_in = 1 THEN 1 ELSE road_leads.marketing_opt_in END,
      marketing_opt_in_at = CASE WHEN excluded.marketing_opt_in = 1 THEN excluded.marketing_opt_in_at ELSE road_leads.marketing_opt_in_at END,
      last_seen_at = excluded.last_seen_at,
      deliveries = road_leads.deliveries + 1
  `).bind(id,contact.email,contact.name,contact.phone,contact.marketingConsent?1:0,contact.marketingConsent?now:null,now,now).run();
  const lead = await env.LEADS_DB.prepare("SELECT id FROM road_leads WHERE email = ?").bind(contact.email).first();
  if (!lead?.id) throw new Error("ROAD_LEAD_NOT_FOUND");
  await env.LEADS_DB.prepare(`
    INSERT INTO road_lead_events (id, lead_id, origin, profile, event, created_at)
    VALUES (?, ?, ?, ?, 'email_sent', ?)
  `).bind(crypto.randomUUID(),lead.id,origin,profile,now).run();
  return true;
}

// Notificação interna de atendimento; funciona mesmo antes da criação do D1.
// Não inclui respostas do Check-up nem valores fiscais. Não é uma lista de marketing.
export async function notifyLead(env, contact, origin, profile = null) {
  if (env.LEAD_NOTIFICATIONS !== "enabled") return false;
  const description = origin === "checkup" ? "Check-up ROAD" : "Simulação IR e Doações";
  const marketing = contact.marketingConsent ? "SIM — aceite expresso" : "NÃO — somente envio do resultado";
  const text = [
    "NOVO ENVIO NO SITE ROAD",
    "Ferramenta: " + description,
    "Nome: " + (contact.name || "Não informado"),
    "E-mail: " + contact.email,
    "Telefone: " + (contact.phone || "Não informado"),
    "Perfil: " + (profile || "Não aplicável"),
    "Comunicações comerciais: " + marketing,
    "Registrado em: " + new Date().toISOString(),
    "",
    "Não encaminhe ofertas a contatos sem autorização para comunicações.",
    "Nenhuma resposta ou valor fiscal integra esta mensagem.",
  ].join("\n");
  await env.EMAIL.send({
    from: { email: "contato@roadwealth.com.br", name: "ROAD Wealth" },
    to: "contato@roadwealth.com.br",
    subject: "[ROAD] Novo contato — " + description,
    text,
  });
  return true;
}
