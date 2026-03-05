import { useState } from "react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { SiteConfig } from "@/data/mockData";
import { LogOut, Save, RotateCcw, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="card-elevated w-full max-w-sm">
          <h2 className="font-heading text-2xl text-primary mb-6 text-center">Painel Admin</h2>
          {loginError && <p className="text-destructive text-sm mb-4 text-center">{loginError}</p>}
          <div className="space-y-4">
            <Input
              placeholder="Usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (user === "admin" && pass === "admin123") setAuthenticated(true);
                  else setLoginError("Credenciais inválidas");
                }
              }}
            />
            <Button
              className="w-full"
              onClick={() => {
                if (user === "admin" && pass === "admin123") setAuthenticated(true);
                else setLoginError("Credenciais inválidas");
              }}
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { config, updateConfig, resetConfig } = useSiteConfig();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"identity" | "hero" | "sobre" | "trajetoria" | "missao" | "contato" | "navbar">("identity");

  const tabs = [
    { id: "identity" as const, label: "Identidade" },
    { id: "hero" as const, label: "Hero" },
    { id: "sobre" as const, label: "Sobre Mim" },
    { id: "trajetoria" as const, label: "Trajetória" },
    { id: "missao" as const, label: "Missão/Visão/Valores" },
    { id: "contato" as const, label: "Contato" },
    { id: "navbar" as const, label: "Navbar" },
  ];

  const updateNested = <K extends keyof SiteConfig>(
    section: K,
    field: keyof SiteConfig[K],
    value: SiteConfig[K][keyof SiteConfig[K]]
  ) => {
    updateConfig({ [section]: { ...config[section], [field]: value } } as Partial<SiteConfig>);
  };

  const updateArrayItem = <K extends keyof SiteConfig>(
    section: K,
    field: keyof SiteConfig[K],
    index: number,
    value: string
  ) => {
    const arr = [...(config[section][field] as string[])];
    arr[index] = value;
    updateConfig({ [section]: { ...config[section], [field]: arr } } as Partial<SiteConfig>);
  };

  const addArrayItem = <K extends keyof SiteConfig>(section: K, field: keyof SiteConfig[K]) => {
    const arr = [...(config[section][field] as string[]), ""];
    updateConfig({ [section]: { ...config[section], [field]: arr } } as Partial<SiteConfig>);
  };

  const removeArrayItem = <K extends keyof SiteConfig>(section: K, field: keyof SiteConfig[K], index: number) => {
    const arr = (config[section][field] as string[]).filter((_, i) => i !== index);
    updateConfig({ [section]: { ...config[section], [field]: arr } } as Partial<SiteConfig>);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
        {/* Tabs */}
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

        {/* Content */}
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

          {tab === "sobre" && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-primary mb-4">Sobre Mim</h3>
              <FieldInput label="Título Card 1" value={config.sobre.card1Title} onChange={(v) => updateNested("sobre", "card1Title", v)} />
              <FieldTextarea label="Texto Card 1" value={config.sobre.card1Text} onChange={(v) => updateNested("sobre", "card1Text", v)} />
              <FieldInput label="Título Card 2" value={config.sobre.card2Title} onChange={(v) => updateNested("sobre", "card2Title", v)} />
              <FieldTextarea label="Texto Card 2" value={config.sobre.card2Text} onChange={(v) => updateNested("sobre", "card2Text", v)} />
            </div>
          )}

          {tab === "trajetoria" && (
            <div className="space-y-6">
              <h3 className="font-heading text-xl text-primary mb-4">Trajetória</h3>
              {(["aulas", "palestras", "publicacoes", "experiencias"] as const).map((field) => (
                <div key={field}>
                  <label className="font-body text-sm font-semibold text-foreground mb-2 block capitalize">{field}</label>
                  {config.trajetoria[field].map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayItem("trajetoria", field, i, e.target.value)}
                        className="flex-1"
                      />
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
                    <Input
                      value={v}
                      onChange={(e) => updateArrayItem("missaoVisaoValores", "valores", i, e.target.value)}
                      className="flex-1"
                    />
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateConfig({ navbar: config.navbar.filter((_, idx) => idx !== i) })}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => updateConfig({ navbar: [...config.navbar, "Novo Item"] })}>
                + Adicionar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
