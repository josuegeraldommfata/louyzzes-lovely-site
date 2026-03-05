import { Heart, Mountain, CheckCircle } from "lucide-react";

interface Props {
  missao: string;
  visao: string;
  valores: string[];
}

export default function MissaoVisaoValores({ missao, visao, valores }: Props) {
  return (
    <section id="missao" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Missão, Visão e Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Missão */}
          <div className="card-elevated text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Heart size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-primary mb-3">Missão</h3>
            <p className="font-body text-foreground leading-relaxed">{missao}</p>
          </div>

          {/* Visão */}
          <div className="card-elevated text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
              <Mountain size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-primary mb-3">Visão</h3>
            <p className="font-body text-foreground leading-relaxed">{visao}</p>
          </div>

          {/* Valores */}
          <div className="card-elevated">
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
