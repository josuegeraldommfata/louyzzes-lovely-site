import { BookOpen, Mic, FileText, Briefcase } from "lucide-react";

interface TrajetoriaProps {
  aulas: string[];
  palestras: string[];
  publicacoes: string[];
  experiencias: string[];
}

const cards = [
  { key: "aulas" as const, title: "Aulas Ministradas", icon: BookOpen },
  { key: "palestras" as const, title: "Palestras", icon: Mic },
  { key: "publicacoes" as const, title: "Publicações", icon: FileText },
  { key: "experiencias" as const, title: "Experiências Profissionais", icon: Briefcase },
];

export default function Trajetoria(props: TrajetoriaProps) {
  return (
    <section id="trajetoria" className="py-16 md:py-24 relative overflow-hidden">
      {/* Wave top */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0,80 C360,0 720,60 1080,20 C1260,0 1380,40 1440,20 L1440,0 L0,0 Z"
          fill="hsl(280 20% 96%)"
        />
      </svg>
      
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-wave -z-10" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />

      {/* Wave bottom */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0,0 C360,60 720,10 1080,40 C1260,55 1380,20 1440,40 L1440,80 L0,80 Z"
          fill="hsl(280 20% 96%)"
        />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">Trajetória Acadêmica e Portfólio</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ key, title, icon: Icon }) => (
            <div key={key} className="card-elevated border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-primary">{title}</h3>
              </div>
              <ul className="space-y-2">
                {props[key].map((item, i) => (
                  <li key={i} className="font-body text-sm text-foreground flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
