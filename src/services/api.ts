const API_BASE = 'http://localhost:3001/api';

type SiteConfigResponse = {
  config: any;
  colors: any;
  photo?: string;
  sections: any;
  updatedAt?: string;
};

type LoginResponse = {
  success: boolean;
  user?: {
    id: string;
    username: string;
    role: string;
  };
  error?: string;
};

// GET config atual
export async function fetchConfig(): Promise<SiteConfigResponse> {
  const response = await fetch(`${API_BASE}/config`);
  if (!response.ok) throw new Error('Erro ao carregar config');
  return response.json();
}

// Salvar config
export async function saveConfig(config: any): Promise<{success: boolean}> {
  const response = await fetch(`${API_BASE}/config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao salvar');
  }

  return response.json();
}

// Login admin
export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

// Reset config
export async function resetConfig(): Promise<{success: boolean}> {
  const response = await fetch(`${API_BASE}/config`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao resetar');
  return response.json();
}

