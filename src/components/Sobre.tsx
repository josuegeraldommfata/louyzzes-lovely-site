interface SobreProps {
  card1Title: string;
  card1Text: string;
  card2Title: string;
  card2Text: string;
}

export default function Sobre({ card1Title, card1Text, card2Title, card2Text }: SobreProps) {
  return (
    <section id="sobre" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Sobre Mim</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-elevated">
            <h3 className="font-heading text-xl font-semibold text-primary mb-4">{card1Title}</h3>
            <p className="font-body text-foreground leading-relaxed">{card1Text}</p>
          </div>
          <div className="card-elevated">
            <h3 className="font-heading text-xl font-semibold text-primary mb-4">{card2Title}</h3>
            <p className="font-body text-foreground leading-relaxed">{card2Text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
