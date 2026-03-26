-- SQL Raw Tables para Dashboard Admin - Sem Prisma
-- Execute: psql DATABASE_URL -f create-tables.sql

DROP TABLE IF EXISTS custom_section_items CASCADE;
DROP TABLE IF EXISTS custom_sections CASCADE;
DROP TABLE IF EXISTS trajetoria_items CASCADE;
DROP TABLE IF EXISTS section_items CASCADE;
DROP TABLE IF EXISTS sections CASCADE;
DROP TABLE IF EXISTS navbar_items CASCADE;
DROP TABLE IF EXISTS valores CASCADE;
DROP TABLE IF EXISTS missoes_visoes_valores CASCADE;
DROP TABLE IF EXISTS contatos CASCADE;
DROP TABLE IF EXISTS sobes CASCADE;
DROP TABLE IF EXISTS site_photos CASCADE;
DROP TABLE IF EXISTS heroes CASCADE;
DROP TABLE IF EXISTS identities CASCADE;
DROP TABLE IF EXISTS sites CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Sites (ID fixo default-site)
CREATE TABLE sites (
  id TEXT PRIMARY KEY DEFAULT 'default-site',
  colors JSONB DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Identity
CREATE TABLE identities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  crp TEXT NOT NULL,
  site_id TEXT UNIQUE REFERENCES sites(id) ON DELETE CASCADE
);

-- Hero
CREATE TABLE heroes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  site_id TEXT UNIQUE REFERENCES sites(id) ON DELETE CASCADE
);

-- SitePhoto
CREATE TABLE site_photos (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  photo TEXT,
  site_id TEXT UNIQUE REFERENCES sites(id) ON DELETE CASCADE
);

-- Sobre
CREATE TABLE sobes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  card1_title TEXT NOT NULL,
  card1_text TEXT NOT NULL,
  card2_title TEXT NOT NULL,
  card2_text TEXT NOT NULL,
  site_id TEXT UNIQUE REFERENCES sites(id) ON DELETE CASCADE
);

-- MissaoVisaoValores
CREATE TABLE missoes_visoes_valores (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  missao TEXT NOT NULL,
  visao TEXT NOT NULL,
  site_id TEXT UNIQUE REFERENCES sites(id) ON DELETE CASCADE
);

-- Valores
CREATE TABLE valores (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  missao_visao_id TEXT REFERENCES missoes_visoes_valores(id) ON DELETE CASCADE
);

-- Contato
CREATE TABLE contatos (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  instagram TEXT,
  linkedin TEXT,
  site_id TEXT UNIQUE REFERENCES sites(id) ON DELETE CASCADE
);

-- NavbarItems
CREATE TABLE navbar_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  site_id TEXT REFERENCES sites(id) ON DELETE CASCADE
);

-- SectionType enum simulado
CREATE TYPE section_type AS ENUM ('COMO_AJUDAR', 'CONDICOES_ATENDIDAS', 'RECURSOS_TERAPEUTICOS', 'CONTEUDOS');

-- Sections
CREATE TABLE sections (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  type section_type NOT NULL,
  description TEXT,
  site_id TEXT REFERENCES sites(id) ON DELETE CASCADE,
  UNIQUE(site_id, type)
);

-- SectionItems
CREATE TABLE section_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  section_id TEXT REFERENCES sections(id) ON DELETE CASCADE
);

-- TrajetoriaItems
CREATE TABLE trajetoria_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- 'aulas', 'palestras', etc
  site_id TEXT REFERENCES sites(id) ON DELETE CASCADE
);

-- CustomSections
CREATE TABLE custom_sections (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  site_id TEXT REFERENCES sites(id) ON DELETE CASCADE
);

-- CustomSectionItems
CREATE TABLE custom_section_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  custom_section_id TEXT REFERENCES custom_sections(id) ON DELETE CASCADE
);

-- Users
CREATE TABLE users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_sites_updated_at ON sites(updated_at);
CREATE INDEX idx_navbar_site ON navbar_items(site_id);
CREATE INDEX idx_section_site ON sections(site_id, type);
CREATE INDEX idx_trajetoria_site ON trajetoria_items(site_id);
CREATE INDEX idx_custom_section_slug ON custom_sections(slug);

-- INSERT Default Data (Dashboard mockData)
INSERT INTO sites (id, colors) VALUES
('default-site', '{
  "primary": "270 28% 55%",
  "secondary": "270 30% 74%",
  "accent": "155 30% 88%",
  "background": "280 20% 96%",
  "foreground": "0 0% 37%",
  "card": "0 0% 100%",
  "cardForeground": "0 0% 37%"
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO identities (site_id, name, subtitle, crp) VALUES
('default-site', 'Louyzze Medrado', 'Psicóloga', 'CRP 00/00000')
ON CONFLICT (site_id) DO NOTHING;

INSERT INTO heroes (site_id, description) VALUES
('default-site', 'Sou psicóloga, com atuação voltada à psicologia da saúde...')
ON CONFLICT (site_id) DO NOTHING;

INSERT INTO contatos (site_id, email, telefone, instagram, linkedin) VALUES
('default-site', 'contato@louyzzemedrado.com.br', '(34) 99999-9999', '@louyzzemedrado', 'louyzze-medrado')
ON CONFLICT (site_id) DO NOTHING;

INSERT INTO users (username, password, email, role) VALUES
('admin', 'admin123', 'admin@louyzze.com', 'admin')
ON CONFLICT (username) DO NOTHING;

-- + outros dados sections/navbar etc...

-- Execute: psql DATABASE_URL -f create-tables.sql
-- Backend usa pgpool raw queries OK!

