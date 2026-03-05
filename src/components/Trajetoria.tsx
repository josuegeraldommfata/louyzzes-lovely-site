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
    <section id="trajetoria" className="py-16 md:py-24 gradient-wave relative">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Trajetória Acadêmica e Portfólio</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ key, title, icon: Icon }) => (
            <div key={key} className="card-elevated">
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
