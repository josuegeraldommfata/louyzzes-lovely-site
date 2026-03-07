export interface SiteColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
}

export interface SiteConfig {
  identity: {
    name: string;
    subtitle: string;
    crp: string;
  };
  hero: {
    description: string;
  };
  customPhoto: string;
  sobre: {
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
  };
  trajetoria: {
    aulas: string[];
    palestras: string[];
    publicacoes: string[];
    experiencias: string[];
  };
  missaoVisaoValores: {
    missao: string;
    visao: string;
    valores: string[];
  };
  contato: {
    email: string;
    telefone: string;
    instagram: string;
    linkedin: string;
  };
  navbar: string[];
  colors: SiteColors;
}

export const defaultColors: SiteColors = {
  primary: "270 28% 55%",
  secondary: "270 30% 74%",
  accent: "155 30% 88%",
  background: "280 20% 96%",
  foreground: "0 0% 37%",
  card: "0 0% 100%",
  cardForeground: "0 0% 37%",
};

export const defaultConfig: SiteConfig = {
  identity: {
    name: "Louyzze Medrado",
    subtitle: "Psicóloga",
    crp: "CRP 00/00000",
  },
  customPhoto: "",
  hero: {
    description:
      "Sou psicóloga, com atuação voltada à psicologia da saúde, cuidado em doenças crônicas, raras e oncológicas, e ao acompanhamento de pacientes, familiares e profissionais que enfrentam desafios importantes em contextos de adoecimento, tratamento e mudanças significativas de vida.",
  },
  sobre: {
    card1Title: "Um pouco de mim",
    card1Text:
      "Nasci e fui criada em Uberaba, Minas Gerais. Em 2016, movida pelo desejo de crescer profissionalmente, busquei oportunidades que me levaram a trilhar um caminho dedicado ao cuidado humano. A importância da escuta atenta e do acolhimento genuíno sempre guiaram minha trajetória, me levando a compreender que cada pessoa carrega uma história única que merece ser ouvida e respeitada.",
    card2Title: "Minha atuação profissional",
    card2Text:
      "Psicóloga em saúde oncológica, doenças raras, saúde e profissionais que enfrentam desafios e familiares, profissionais que enfrentam momentos de crise, luto, esgotamento, saúde e mudanças significativas de vida. Experta em acompanhamento profissional focado em compreender os aspectos emocionais, psicológicos, empresas, de saúde, satisfação, doenças crônicas, raras, e também nos contextos que enfrentam de adoecimento, tratamento e luto.",
  },
  trajetoria: {
    aulas: [
      "Formação em Psicologia, com especialização em Psicologia da Saúde",
      "Temas de Cuidado",
    ],
    palestras: [
      "Palestras, apresentações, saúde em Psicologia em saúde",
      "Trajetos em cuidado, idoso, paciente crônico",
    ],
    publicacoes: [
      "Artigos em revistas de psicologia",
      "Capítulo de livros",
      "Catálogos de eventos e artigos",
    ],
    experiencias: [
      "Atividades clínicas, pesquisas, supervisões, experiências",
      "Supervisão de outros psicólogos",
      "Senolabilidade na manicação e ações sociais",
    ],
  },
  missaoVisaoValores: {
    missao:
      "Oferecer acolhimento e apoio humanizado a pessoas que enfrentam desafios significativos da saúde.",
    visao:
      "Contribuir para um modelo de saúde que integre a dimensão psicológica no cuidado completo aos pacientes.",
    valores: [
      "Ética",
      "Empatia",
      "Ciência e prática baseada em evidências",
      "Sensibilidade e humanização",
      "Respeito à singularidade",
    ],
  },
  contato: {
    email: "contato@louyzzemedrado.com.br",
    telefone: "(34) 99999-9999",
    instagram: "@louyzzemedrado",
    linkedin: "louyzze-medrado",
  },
  navbar: [
    "Início",
    "Quem Sou Eu",
    "Como Posso Te Ajudar",
    "Condições Atendidas",
    "Recursos Terapêuticos",
    "Conteúdos",
    "Contato",
  ],
  colors: { ...defaultColors },
};
