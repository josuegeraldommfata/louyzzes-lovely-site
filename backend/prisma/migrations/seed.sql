-- Seed: Usuário admin mockado
INSERT INTO "users" (username, password, email, role)
VALUES ('admin', 'admin123', 'admin@louyzze.com', 'admin')
ON CONFLICT (username) DO NOTHING;

