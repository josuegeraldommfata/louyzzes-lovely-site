import { Heart, Mountain, CheckCircle } from "lucide-react";

interface Props {
  missao: string;
  visao: string;
  valores: string[];
}

export default function MissaoVisaoValores({ missao, visao, valores }: Props) {
  return (
    <section id="missao" className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title">Missão, Visão e Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Missão */}
          <div className="card-elevated text-center border border-border/50">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Heart size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-primary mb-3">Missão</h3>
            <p className="font-body text-foreground leading-relaxed">{missao}</p>
          </div>

          {/* Visão */}
          <div className="card-elevated text-center border border-border/50">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Mountain size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-primary mb-3">Visão</h3>
            <p className="font-body text-foreground leading-relaxed">{visao}</p>
          </div>

          {/* Valores */}
          <div className="card-elevated border border-border/50">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <CheckCircle size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-primary mb-3 text-center">Valores</h3>
            <ul className="space-y-2">
              {valores.map((v, i) => (
                <li key={i} className="font-body text-foreground flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary flex-shrink-0" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
