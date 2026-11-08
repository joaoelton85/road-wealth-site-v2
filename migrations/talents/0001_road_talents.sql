-- Banco de talentos ROAD: banco dedicado, separado de LEADS_DB.
-- Contém exclusivamente informações fornecidas voluntariamente no Faça Parte da ROAD.
CREATE TABLE IF NOT EXISTS road_talent_candidates (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  linkedin TEXT NOT NULL DEFAULT '',
  market_experience TEXT NOT NULL CHECK (market_experience IN ('sim','nao')),
  client_portfolio TEXT NOT NULL CHECK (client_portfolio IN ('sim','nao')),
  custody_range TEXT NOT NULL,
  interest_area TEXT NOT NULL,
  presentation TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  submissions INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'novo' CHECK (status IN ('novo','em_analise','contatado','arquivado'))
);
CREATE INDEX IF NOT EXISTS idx_talent_area ON road_talent_candidates(interest_area);
CREATE INDEX IF NOT EXISTS idx_talent_status ON road_talent_candidates(status);
CREATE INDEX IF NOT EXISTS idx_talent_last_seen ON road_talent_candidates(last_seen_at);
CREATE TABLE IF NOT EXISTS road_talent_events (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL REFERENCES road_talent_candidates(id) ON DELETE CASCADE,
  event TEXT NOT NULL DEFAULT 'application_received',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_talent_events_candidate ON road_talent_events(candidate_id,created_at);
