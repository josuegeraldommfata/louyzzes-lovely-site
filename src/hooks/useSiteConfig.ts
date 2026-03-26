import { useState, useEffect, useCallback } from "react";
import { SiteConfig, defaultConfig } from "@/data/mockData";
import { fetchConfig, saveConfig, resetConfig as resetConfigApi } from "@/services/api";

function applyColors(colors: SiteConfig["colors"]) {
  const root = document.documentElement;
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--secondary", colors.secondary);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--background", colors.background);
  root.style.setProperty("--foreground", colors.foreground);
  root.style.setProperty("--card", colors.card);
  root.style.setProperty("--card-foreground", colors.cardForeground);
  root.style.setProperty("--ring", colors.primary);
  root.style.setProperty("--border", colors.secondary);
  root.style.setProperty("--input", colors.secondary);
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Carregar config do backend - SEM MOCK
  useEffect(() => {
    fetchConfig()
      .then((data) => {
        setConfig(data.config);
        if (data.config.colors) applyColors(data.config.colors);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro backend:', err);
        setLoading(false);
      });
  }, []);


  // Salvar no backend quando config mudar (debounce 1s)
  useEffect(() => {
    if (loading) return;

    const timeout = setTimeout(() => {
      saveConfig(config).catch((err) => {
        console.error('Erro ao salvar config:', err);
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [config]);

  // Aplicar cores sempre que mudarem
  useEffect(() => {
    if (config.colors) applyColors(config.colors);
  }, [config.colors]);

  const updateConfig = useCallback((partial: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetConfig = useCallback(async () => {
    try {
      await resetConfigApi();
      setConfig(defaultConfig);
      applyColors(defaultConfig.colors);
    } catch (err) {
      console.error('Erro ao resetar:', err);
    }
  }, []);

  return {
    config,
    updateConfig,
    resetConfig,
    loading,
    error
  };
}

