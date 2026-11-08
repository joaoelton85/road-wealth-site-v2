-- ROAD | Leads: somente cadastro e histórico de envios; sem informações financeiras.
CREATE TABLE IF NOT EXISTS road_leads (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  marketing_opt_in INTEGER NOT NULL DEFAULT 0 CHECK(marketing_opt_in IN (0,1)),
  marketing_opt_in_at TEXT,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  deliveries INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_road_leads_last_seen ON road_leads(last_seen_at);
CREATE INDEX IF NOT EXISTS idx_road_leads_marketing ON road_leads(marketing_opt_in);
CREATE TABLE IF NOT EXISTS road_lead_events (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES road_leads(id) ON DELETE CASCADE,
  origin TEXT NOT NULL CHECK(origin IN ('checkup','ir_doacoes')),
  profile TEXT,
  event TEXT NOT NULL DEFAULT 'email_sent',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_road_lead_events_lead_date ON road_lead_events(lead_id,created_at);
CREATE INDEX IF NOT EXISTS idx_road_lead_events_origin ON road_lead_events(origin,created_at);
