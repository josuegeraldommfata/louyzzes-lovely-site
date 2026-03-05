import psicologaImg from "@/assets/psicologa.jpg";

interface HeroProps {
  name: string;
  subtitle: string;
  crp: string;
  description: string;
  customPhoto?: string;
}

export default function Hero({ name, subtitle, crp, description, customPhoto }: HeroProps) {
  return (
    <section id="inicio" className="relative pt-16 overflow-hidden">
      {/* Decorative wave bg */}
      <div className="absolute inset-0 gradient-hero" />
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
          fill="hsl(280 20% 96%)"
        />
      </svg>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Photo */}
          <div className="w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
            <img
              src={customPhoto || psicologaImg}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-2">
              {name}
            </h1>
            <p className="font-body text-lg text-secondary mb-6">
              {subtitle} • {crp}
            </p>
            <p className="font-body text-foreground leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
