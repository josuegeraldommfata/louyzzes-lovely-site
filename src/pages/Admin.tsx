import { useState, useRef } from "react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { SiteConfig, SiteColors, defaultColors, builtInSections, slugify, CustomSection } from "@/data/mockData";
import { LogOut, RotateCcw, Eye, Upload, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "admin123") setAuthenticated(true);
    else setLoginError("Credenciais inválidas");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="card-elevated w-full max-w-sm">
          <h2 className="font-heading text-2xl text-primary mb-6 text-center">Painel Admin</h2>
          {loginError && <p className="text-destructive text-sm mb-4 text-center">{loginError}</p>}
          <div className="space-y-4">
            <Input placeholder="Usuário" value={user} onChange={(e) => setUser(e.target.value)} />
            <Input
              type="password"
              placeholder="Senha"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button className="w-full" onClick={handleLogin}>Entrar</Button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}

// --- Color helpers ---
function hslToHex(hslStr: string): string {
  const parts = hslStr.trim().split(/\s+/);
  if (parts.length < 3) return "#8e6fae";
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// --- Dashboard ---
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { config, updateConfig, resetConfig } = useSiteConfig();
  const navigate = useNavigate();
  const [tab, setTab] = useState<string>("identity");

  // Find custom navbar items
  const customNavItems = config.navbar.filter((item) => !builtInSections.includes(item));

  const tabs = [
    { id: "identity", label: "Identidade" },
    { id: "hero", label: "Hero" },
    { id: "photo", label: "Foto" },
    { id: "sobre", label: "Sobre Mim" },
    { id: "comoAjudar", label: "Como Posso Te Ajudar" },
    { id: "condicoes", label: "Condições Atendidas" },
    { id: "recursos", label: "Recursos Terapêuticos" },
    { id: "conteudos", label: "Conteúdos" },
    { id: "trajetoria", label: "Trajetória" },
    { id: "missao", label: "Missão/Visão/Valores" },
    { id: "contato", label: "Contato" },
    { id: "navbar", label: "Navbar" },
    ...customNavItems.map((item) => ({ id: `custom-${slugify(item)}`, label: `📄 ${item}` })),
    { id: "colors", label: "🎨 Cores" },
  ];

  const updateNested = <K extends keyof SiteConfig>(section: K, field: string, value: unknown) => {
    const current = config[section];
    if (typeof current === "object" && current !== null && !Array.isArray(current)) {
      updateConfig({ [section]: { ...(current as Record<string, unknown>), [field]: value } } as Partial<SiteConfig>);
    }
  };

  const updateArrayItem = <K extends keyof SiteConfig>(section: K, field: string, index: number, value: string) => {
    const current = config[section] as Record<string, unknown>;
    const arr = [...(current[field] as string[])];
    arr[index] = value;
    updateConfig({ [section]: { ...current, [field]: arr } } as Partial<SiteConfig>);
  };

  const addArrayItem = <K extends keyof SiteConfig>(section: K, field: string) => {
    const current = config[section] as Record<string, unknown>;
    const arr = [...(current[field] as string[]), ""];
    updateConfig({ [section]: { ...current, [field]: arr } } as Partial<SiteConfig>);
  };

  const removeArrayItem = <K extends keyof SiteConfig>(section: K, field: string, index: number) => {
    const current = config[section] as Record<string, unknown>;
    const arr = (current[field] as string[]).filter((_, i) => i !== index);
    updateConfig({ [section]: { ...current, [field]: arr } } as Partial<SiteConfig>);
  };

  const updateCustomSection = (slug: string, field: keyof CustomSection, value: unknown) => {
    const sections = { ...config.customSections };
    const current = sections[slug] || { title: "", description: "", items: [] };
    sections[slug] = { ...current, [field]: value };
    updateConfig({ customSections: sections });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-heading text-lg text-primary font-semibold">Painel Admin</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Eye size={16} className="mr-1" /> Ver Site
            </Button>
            <Button variant="outline" size="sm" onClick={resetConfig}>
              <RotateCcw size={16} className="mr-1" /> Resetar
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut size={16} className="mr-1" /> Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg font-body text-sm transition-colors ${
                tab === t.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="card-elevated max-w-3xl">
          {tab === "identity" && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-primary mb-4">Identidade</h3>
              <FieldInput label="Nome" value={config.identity.name} onChange={(v) => updateNested("identity", "name", v)} />
              <FieldInput label="Subtítulo" value={config.identity.subtitle} onChange={(v) => updateNested("identity", "subtitle", v)} />
              <FieldInput label="CRP" value={config.identity.crp} onChange={(v) => updateNested("identity", "crp", v)} />
            </div>
          )}

          {tab === "hero" && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-primary mb-4">Hero Section</h3>
              <FieldTextarea label="Descrição" value={config.hero.description} onChange={(v) => updateNested("hero", "description", v)} />
            </div>
          )}

          {tab === "photo" && <PhotoTab config={config} updateConfig={updateConfig} />}

          {tab === "sobre" && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-primary mb-4">Sobre Mim</h3>
              <FieldInput label="Título Card 1" value={config.sobre.card1Title} onChange={(v) => updateNested("sobre", "card1Title", v)} />
              <FieldTextarea label="Texto Card 1" value={config.sobre.card1Text} onChange={(v) => updateNested("sobre", "card1Text", v)} />
              <FieldInput label="Título Card 2" value={config.sobre.card2Title} onChange={(v) => updateNested("sobre", "card2Title", v)} />
              <FieldTextarea label="Texto Card 2" value={config.sobre.card2Text} onChange={(v) => updateNested("sobre", "card2Text", v)} />
            </div>
          )}

          {tab === "comoAjudar" && (
            <SectionEditor
              title="Como Posso Te Ajudar"
              description={config.comoAjudar.description}
              items={config.comoAjudar.items}
              onDescChange={(v) => updateNested("comoAjudar", "description", v)}
              onItemChange={(i, v) => updateArrayItem("comoAjudar", "items", i, v)}
              onItemAdd={() => addArrayItem("comoAjudar", "items")}
              onItemRemove={(i) => removeArrayItem("comoAjudar", "items", i)}
            />
          )}

          {tab === "condicoes" && (
            <SectionEditor
              title="Condições Atendidas"
              description={config.condicoesAtendidas.description}
              items={config.condicoesAtendidas.items}
              onDescChange={(v) => updateNested("condicoesAtendidas", "description", v)}
              onItemChange={(i, v) => updateArrayItem("condicoesAtendidas", "items", i, v)}
              onItemAdd={() => addArrayItem("condicoesAtendidas", "items")}
              onItemRemove={(i) => removeArrayItem("condicoesAtendidas", "items", i)}
            />
          )}

          {tab === "recursos" && (
            <SectionEditor
              title="Recursos Terapêuticos"
              description={config.recursosTerapeuticos.description}
              items={config.recursosTerapeuticos.items}
              onDescChange={(v) => updateNested("recursosTerapeuticos", "description", v)}
              onItemChange={(i, v) => updateArrayItem("recursosTerapeuticos", "items", i, v)}
              onItemAdd={() => addArrayItem("recursosTerapeuticos", "items")}
              onItemRemove={(i) => removeArrayItem("recursosTerapeuticos", "items", i)}
            />
          )}

          {tab === "conteudos" && (
            <SectionEditor
              title="Conteúdos"
              description={config.conteudos.description}
              items={config.conteudos.items}
              onDescChange={(v) => updateNested("conteudos", "description", v)}
              onItemChange={(i, v) => updateArrayItem("conteudos", "items", i, v)}
              onItemAdd={() => addArrayItem("conteudos", "items")}
              onItemRemove={(i) => removeArrayItem("conteudos", "items", i)}
            />
          )}

          {tab === "trajetoria" && (
            <div className="space-y-6">
              <h3 className="font-heading text-xl text-primary mb-4">Trajetória</h3>
              {(["aulas", "palestras", "publicacoes", "experiencias"] as const).map((field) => (
                <div key={field}>
                  <label className="font-body text-sm font-semibold text-foreground mb-2 block capitalize">{field}</label>
                  {config.trajetoria[field].map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Input value={item} onChange={(e) => updateArrayItem("trajetoria", field, i, e.target.value)} className="flex-1" />
                      <Button variant="outline" size="sm" onClick={() => removeArrayItem("trajetoria", field, i)}>✕</Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addArrayItem("trajetoria", field)}>+ Adicionar</Button>
                </div>
              ))}
            </div>
          )}

          {tab === "missao" && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-primary mb-4">Missão, Visão e Valores</h3>
              <FieldTextarea label="Missão" value={config.missaoVisaoValores.missao} onChange={(v) => updateNested("missaoVisaoValores", "missao", v)} />
              <FieldTextarea label="Visão" value={config.missaoVisaoValores.visao} onChange={(v) => updateNested("missaoVisaoValores", "visao", v)} />
              <div>
                <label className="font-body text-sm font-semibold text-foreground mb-2 block">Valores</label>
                {config.missaoVisaoValores.valores.map((v, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input value={v} onChange={(e) => updateArrayItem("missaoVisaoValores", "valores", i, e.target.value)} className="flex-1" />
                    <Button variant="outline" size="sm" onClick={() => removeArrayItem("missaoVisaoValores", "valores", i)}>✕</Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addArrayItem("missaoVisaoValores", "valores")}>+ Adicionar</Button>
              </div>
            </div>
          )}

          {tab === "contato" && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-primary mb-4">Contato</h3>
              <FieldInput label="Email" value={config.contato.email} onChange={(v) => updateNested("contato", "email", v)} />
              <FieldInput label="Telefone" value={config.contato.telefone} onChange={(v) => updateNested("contato", "telefone", v)} />
              <FieldInput label="Instagram" value={config.contato.instagram} onChange={(v) => updateNested("contato", "instagram", v)} />
              <FieldInput label="LinkedIn" value={config.contato.linkedin} onChange={(v) => updateNested("contato", "linkedin", v)} />
            </div>
          )}

          {tab === "navbar" && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-primary mb-4">Itens do Menu</h3>
              <p className="text-muted-foreground text-xs mb-4">
                Ao adicionar um novo item, uma seção será criada automaticamente no site. Edite-a na aba correspondente.
              </p>
              {config.navbar.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => {
                      const arr = [...config.navbar];
                      arr[i] = e.target.value;
                      updateConfig({ navbar: arr });
                    }}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={() => updateConfig({ navbar: config.navbar.filter((_, idx) => idx !== i) })}>✕</Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newName = "Nova Seção";
                  const slug = slugify(newName);
                  const sections = { ...config.customSections };
                  if (!sections[slug]) {
                    sections[slug] = { title: newName, description: "Descrição da seção", items: ["Item de exemplo"] };
                  }
                  updateConfig({ navbar: [...config.navbar, newName], customSections: sections });
                }}
              >
                + Adicionar Menu
              </Button>
            </div>
          )}

          {/* Custom section tabs */}
          {tab.startsWith("custom-") && (() => {
            const slug = tab.replace("custom-", "");
            const section = config.customSections?.[slug] || { title: "", description: "", items: [] };
            return (
              <SectionEditor
                title={section.title || "Seção Personalizada"}
                description={section.description}
                items={section.items}
                onDescChange={(v) => updateCustomSection(slug, "description", v)}
                onItemChange={(i, v) => {
                  const items = [...section.items];
                  items[i] = v;
                  updateCustomSection(slug, "items", items);
                }}
                onItemAdd={() => updateCustomSection(slug, "items", [...section.items, ""])}
                onItemRemove={(i) => updateCustomSection(slug, "items", section.items.filter((_, idx) => idx !== i))}
                showTitleEdit
                onTitleChange={(v) => updateCustomSection(slug, "title", v)}
              />
            );
          })()}

          {tab === "colors" && <ColorsTab config={config} updateConfig={updateConfig} />}
        </div>
      </div>
    </div>
  );
}

// --- Section Editor ---
function SectionEditor({
  title, description, items,
  onDescChange, onItemChange, onItemAdd, onItemRemove,
  showTitleEdit, onTitleChange,
}: {
  title: string; description: string; items: string[];
  onDescChange: (v: string) => void;
  onItemChange: (i: number, v: string) => void;
  onItemAdd: () => void;
  onItemRemove: (i: number) => void;
  showTitleEdit?: boolean;
  onTitleChange?: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl text-primary mb-4">{title}</h3>
      {showTitleEdit && onTitleChange && (
        <FieldInput label="Título da Seção" value={title} onChange={onTitleChange} />
      )}
      <FieldTextarea label="Descrição" value={description} onChange={onDescChange} />
      <div>
        <label className="font-body text-sm font-semibold text-foreground mb-2 block">Itens</label>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Input value={item} onChange={(e) => onItemChange(i, e.target.value)} className="flex-1" />
            <Button variant="outline" size="sm" onClick={() => onItemRemove(i)}>✕</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={onItemAdd}>+ Adicionar Item</Button>
      </div>
    </div>
  );
}

// --- Photo Tab ---
function PhotoTab({ config, updateConfig }: { config: SiteConfig; updateConfig: (p: Partial<SiteConfig>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateConfig({ customPhoto: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl text-primary mb-4">Foto da Psicóloga</h3>
      {config.customPhoto && (
        <div className="w-48 h-60 rounded-xl overflow-hidden shadow-md mx-auto">
          <img src={config.customPhoto} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex gap-3 justify-center">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <Button onClick={() => fileRef.current?.click()}>
          <Upload size={16} className="mr-2" /> Enviar Foto
        </Button>
        {config.customPhoto && (
          <Button variant="outline" onClick={() => updateConfig({ customPhoto: "" })}>
            <Image size={16} className="mr-2" /> Usar Padrão
          </Button>
        )}
      </div>
      <p className="text-muted-foreground text-xs text-center">A foto será salva localmente no navegador.</p>
    </div>
  );
}

// --- Colors Tab ---
function ColorsTab({ config, updateConfig }: { config: SiteConfig; updateConfig: (p: Partial<SiteConfig>) => void }) {
  const colors = config.colors || defaultColors;
  const colorFields: { key: keyof SiteColors; label: string }[] = [
    { key: "primary", label: "Roxo Principal" },
    { key: "secondary", label: "Roxo Claro / Secundário" },
    { key: "accent", label: "Verde Suave / Destaque" },
    { key: "background", label: "Fundo do Site" },
    { key: "foreground", label: "Cor do Texto" },
    { key: "card", label: "Fundo dos Cards" },
    { key: "cardForeground", label: "Texto dos Cards" },
  ];

  const updateColor = (key: keyof SiteColors, hex: string) => {
    updateConfig({ colors: { ...colors, [key]: hexToHsl(hex) } });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl text-primary mb-4">🎨 Personalizar Cores</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {colorFields.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-3">
            <input
              type="color"
              value={hslToHex(colors[key])}
              onChange={(e) => updateColor(key, e.target.value)}
              className="w-10 h-10 rounded-lg border border-border cursor-pointer"
            />
            <div>
              <p className="font-body text-sm font-semibold text-foreground">{label}</p>
              <p className="font-body text-xs text-muted-foreground">{hslToHex(colors[key])}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={() => updateConfig({ colors: { ...defaultColors } })}>
        <RotateCcw size={14} className="mr-1" /> Resetar Cores
      </Button>
    </div>
  );
}

// --- Field helpers ---
function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="font-body text-sm font-semibold text-foreground mb-1 block">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function FieldTextarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="font-body text-sm font-semibold text-foreground mb-1 block">{label}</label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
    </div>
  );
}
