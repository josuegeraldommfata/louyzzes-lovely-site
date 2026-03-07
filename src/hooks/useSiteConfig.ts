import { useState, useEffect, useCallback } from "react";
import { SiteConfig, defaultConfig } from "@/data/mockData";

const STORAGE_KEY = "siteConfig";

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
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaultConfig, ...JSON.parse(stored) };
    } catch {}
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    if (config.colors) applyColors(config.colors);
  }, [config]);

  // Apply colors on mount
  useEffect(() => {
    if (config.colors) applyColors(config.colors);
  }, []);

  const updateConfig = useCallback((partial: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    localStorage.removeItem(STORAGE_KEY);
    applyColors(defaultConfig.colors);
  }, []);

  return { config, updateConfig, resetConfig };
}
