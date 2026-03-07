export interface SiteColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
}

export interface CustomSection {
  title: string;
  description: string;
  items: string[];
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
  comoAjudar: {
    description: string;
    items: string[];
  };
  condicoesAtendidas: {
    description: string;
    items: string[];
  };
  recursosTerapeuticos: {
    description: string;
    items: string[];
  };
  conteudos: {
    description: string;
    items: string[];
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
  customSections: Record<string, CustomSection>;
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

// Known navbar items that map to built-in sections
export const builtInSections: string[] = [
  "Início",
  "Quem Sou Eu",
  "Como Posso Te Ajudar",
  "Condições Atendidas",
  "Recursos Terapêuticos",
  "Conteúdos",
  "Contato",
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
      "Nasci e fui criada em Uberaba, Minas Gerais. Em 2016, movida pelo desejo de crescer profissionalmente, busquei oportunidades que me levaram a trilhar um caminho dedicado ao cuidado humano. A importância da escuta atenta e do acolhimento genuíno sempre guiaram minha trajetória.",
    card2Title: "Minha atuação profissional",
    card2Text:
      "Psicóloga em saúde oncológica, doenças raras, saúde e profissionais que enfrentam desafios e familiares, profissionais que enfrentam momentos de crise, luto, esgotamento, saúde e mudanças significativas de vida.",
  },
  comoAjudar: {
    description:
      "Ofereço acompanhamento psicológico para pessoas que enfrentam desafios significativos em diferentes momentos da vida. Meu trabalho é baseado em escuta qualificada, acolhimento e técnicas validadas cientificamente.",
    items: [
      "Acompanhamento individual para adultos",
      "Suporte psicológico em processos de adoecimento",
      "Apoio a familiares e cuidadores",
      "Orientação para profissionais de saúde",
      "Psicoterapia online e presencial",
    ],
  },
  condicoesAtendidas: {
    description:
      "Atuo com diversas condições e contextos clínicos, sempre com foco na singularidade de cada pessoa e em seu processo de cuidado.",
    items: [
      "Doenças crônicas e raras",
      "Oncologia e cuidados paliativos",
      "Luto e perdas significativas",
      "Ansiedade e depressão",
      "Burnout e esgotamento profissional",
      "Adaptação a mudanças de vida",
      "Estresse pós-traumático",
    ],
  },
  recursosTerapeuticos: {
    description:
      "Utilizo recursos terapêuticos baseados em evidências científicas, adaptados às necessidades de cada paciente.",
    items: [
      "Terapia Cognitivo-Comportamental (TCC)",
      "Psicologia da Saúde",
      "Intervenções em crise",
      "Técnicas de mindfulness e relaxamento",
      "Psicoeducação",
      "Acolhimento e escuta qualificada",
    ],
  },
  conteudos: {
    description:
      "Compartilho reflexões, informações e conteúdos sobre psicologia da saúde, bem-estar emocional e cuidado humano.",
    items: [
      "Artigos sobre saúde mental e bem-estar",
      "Dicas de autocuidado emocional",
      "Reflexões sobre o processo terapêutico",
      "Conteúdos sobre doenças crônicas e saúde",
    ],
  },
  trajetoria: {
    aulas: [
      "Formação em Psicologia, com especialização em Psicologia da Saúde",
      "Temas de Cuidado",
    ],
    palestras: [
      "Palestras e apresentações em Psicologia da Saúde",
      "Trajetos em cuidado, idoso, paciente crônico",
    ],
    publicacoes: [
      "Artigos em revistas de psicologia",
      "Capítulo de livros",
      "Catálogos de eventos e artigos",
    ],
    experiencias: [
      "Atividades clínicas, pesquisas, supervisões",
      "Supervisão de outros psicólogos",
      "Sensibilidade na comunicação e ações sociais",
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
  customSections: {},
};
