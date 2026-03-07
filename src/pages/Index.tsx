import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Trajetoria from "@/components/Trajetoria";
import MissaoVisaoValores from "@/components/MissaoVisaoValores";
import Footer from "@/components/Footer";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const Index = () => {
  const { config } = useSiteConfig();

  return (
    <div className="min-h-screen bg-background">
      <Navbar items={config.navbar} />
      <Hero
        name={config.identity.name}
        subtitle={config.identity.subtitle}
        crp={config.identity.crp}
        description={config.hero.description}
        customPhoto={config.customPhoto || undefined}
      />
      <Sobre
        card1Title={config.sobre.card1Title}
        card1Text={config.sobre.card1Text}
        card2Title={config.sobre.card2Title}
        card2Text={config.sobre.card2Text}
      />
      <Trajetoria
        aulas={config.trajetoria.aulas}
        palestras={config.trajetoria.palestras}
        publicacoes={config.trajetoria.publicacoes}
        experiencias={config.trajetoria.experiencias}
      />
      <MissaoVisaoValores
        missao={config.missaoVisaoValores.missao}
        visao={config.missaoVisaoValores.visao}
        valores={config.missaoVisaoValores.valores}
      />
      <Footer
        email={config.contato.email}
        telefone={config.contato.telefone}
        instagram={config.contato.instagram}
        linkedin={config.contato.linkedin}
        name={config.identity.name}
      />
    </div>
  );
};

export default Index;
