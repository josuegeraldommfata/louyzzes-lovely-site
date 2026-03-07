import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import SectionBlock from "@/components/SectionBlock";
import Trajetoria from "@/components/Trajetoria";
import MissaoVisaoValores from "@/components/MissaoVisaoValores";
import Footer from "@/components/Footer";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { builtInSections, slugify } from "@/data/mockData";

const sectionVariants = ["default", "accent", "muted"] as const;

const Index = () => {
  const { config } = useSiteConfig();

  // Find custom navbar items (not built-in)
  const customNavItems = config.navbar.filter((item) => !builtInSections.includes(item));

  return (
    <div className="min-h-screen bg-background">
      <Navbar items={config.navbar} />
      
      {/* Render sections based on navbar order */}
      {config.navbar.map((item, idx) => {
        switch (item) {
          case "Início":
            return (
              <Hero
                key={item}
                name={config.identity.name}
                subtitle={config.identity.subtitle}
                crp={config.identity.crp}
                description={config.hero.description}
                customPhoto={config.customPhoto || undefined}
              />
            );
          case "Quem Sou Eu":
            return (
              <Sobre
                key={item}
                card1Title={config.sobre.card1Title}
                card1Text={config.sobre.card1Text}
                card2Title={config.sobre.card2Title}
                card2Text={config.sobre.card2Text}
              />
            );
          case "Como Posso Te Ajudar":
            return (
              <SectionBlock
                key={item}
                id="como-posso-te-ajudar"
                title="Como Posso Te Ajudar"
                description={config.comoAjudar.description}
                items={config.comoAjudar.items}
                variant="accent"
              />
            );
          case "Condições Atendidas":
            return (
              <SectionBlock
                key={item}
                id="condicoes-atendidas"
                title="Condições Atendidas"
                description={config.condicoesAtendidas.description}
                items={config.condicoesAtendidas.items}
                variant="default"
              />
            );
          case "Recursos Terapêuticos":
            return (
              <SectionBlock
                key={item}
                id="recursos-terapeuticos"
                title="Recursos Terapêuticos"
                description={config.recursosTerapeuticos.description}
                items={config.recursosTerapeuticos.items}
                variant="muted"
              />
            );
          case "Conteúdos":
            return (
              <SectionBlock
                key={item}
                id="conteudos"
                title="Conteúdos"
                description={config.conteudos.description}
                items={config.conteudos.items}
                variant="accent"
              />
            );
          case "Contato":
            return null; // Footer handles this
          default: {
            // Dynamic custom section
            const slug = slugify(item);
            const section = config.customSections?.[slug] || {
              title: item,
              description: "Seção personalizada",
              items: [],
            };
            const variantIdx = idx % sectionVariants.length;
            return (
              <SectionBlock
                key={item}
                id={slug}
                title={section.title}
                description={section.description}
                items={section.items}
                variant={sectionVariants[variantIdx]}
              />
            );
          }
        }
      })}

      {/* Trajetória and Missão always shown */}
      {config.navbar.includes("Contato") && (
        <>
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
        </>
      )}

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
