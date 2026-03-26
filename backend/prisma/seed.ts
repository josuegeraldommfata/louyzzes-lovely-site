import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário admin
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'admin123',
      email: 'admin@louyzze.com',
      role: 'admin'
    }
  });

  // Criar site default
  const siteId = 'default-site';
  await prisma.site.upsert({
    where: { id: siteId },
    update: {},
    create: {
      id: siteId,
      identity: {
        create: {
          name: "Louyzze Medrado",
          subtitle: "Psicóloga",
          crp: "CRP 00/00000"
        }
      },
      hero: {
        create: {
          description: "Sou psicóloga, com atuação voltada à psicologia da saúde, cuidado em doenças crônicas, raras e oncológicas, e ao acompanhamento de pacientes, familiares e profissionais que enfrentam desafios importantes em contextos de adoecimento, tratamento e mudanças significativas de vida."
        }
      },
      photo: {
        create: {}
      },
      sobre: {
        create: {
          card1Title: "Um pouco de mim",
          card1Text: "Nasci e fui criada em Uberaba, Minas Gerais. Em 2016, movida pelo desejo de crescer profissionalmente, busquei oportunidades que me levaram a trilhar um caminho dedicado ao cuidado humano. A importância da escuta atenta e do acolhimento genuíno sempre guiaram minha trajetória.",
          card2Title: "Minha atuação profissional",
          card2Text: "Psicóloga em saúde oncológica, doenças raras, saúde e profissionais que enfrentam desafios e familiares, profissionais que enfrentam momentos de crise, luto, esgotamento, saúde e mudanças significativas de vida."
        }
      },
      missaoVisao: {
        create: {
          missao: "Oferecer acolhimento e apoio humanizado a pessoas que enfrentam desafios significativos da saúde.",
          visao: "Contribuir para um modelo de saúde que integre a dimensão psicológica no cuidado completo aos pacientes.",
          valores: {
            createMany: {
              data: [
                { value: "Ética" },
                { value: "Empatia" },
                { value: "Ciência e prática baseada em evidências" },
                { value: "Sensibilidade e humanização" },
                { value: "Respeito à singularidade" }
              ]
            }
          }
        }
      },
      contato: {
        create: {
          email: "contato@louyzzemedrado.com.br",
          telefone: "(34) 99999-9999",
          instagram: "@louyzzemedrado",
          linkedin: "louyzze-medrado"
        }
      },
      sections: {
        create: [
          {
            type: "COMO_AJUDAR",
            description: "Ofereço acompanhamento psicológico para pessoas que enfrentam desafios significativos em diferentes momentos da vida. Meu trabalho é baseado em escuta qualificada, acolhimento e técnicas validadas cientificamente.",
            items: {
              createMany: {
                data: [
                  { content: "Acompanhamento individual para adultos" },
                  { content: "Suporte psicológico em processos de adoecimento" },
                  { content: "Apoio a familiares e cuidadores" },
                  { content: "Orientação para profissionais de saúde" },
                  { content: "Psicoterapia online e presencial" }
                ]
              }
            }
          },
          {
            type: "CONDICOES_ATENDIDAS",
            description: "Atuo com diversas condições e contextos clínicos, sempre com foco na singularidade de cada pessoa e em seu processo de cuidado.",
            items: {
              createMany: {
                data: [
                  { content: "Doenças crônicas e raras" },
                  { content: "Oncologia e cuidados paliativos" },
                  { content: "Luto e perdas significativas" },
                  { content: "Ansiedade e depressão" },
                  { content: "Burnout e esgotamento profissional" },
                  { content: "Adaptação a mudanças de vida" },
                  { content: "Estresse pós-traumático" }
                ]
              }
            }
          },
          {
            type: "RECURSOS_TERAPEUTICOS",
            description: "Utilizo recursos terapêuticos baseados em evidências científicas, adaptados às necessidades de cada paciente.",
            items: {
              createMany: {
                data: [
                  { content: "Terapia Cognitivo-Comportamental (TCC)" },
                  { content: "Psicologia da Saúde" },
                  { content: "Intervenções em crise" },
                  { content: "Técnicas de mindfulness e relaxamento" },
                  { content: "Psicoeducação" },
                  { content: "Acolhimento e escuta qualificada" }
                ]
              }
            }
          },
          {
            type: "CONTEUDOS",
            description: "Compartilho reflexões, informações e conteúdos sobre psicologia da saúde, bem-estar emocional e cuidado humano.",
            items: {
              createMany: {
                data: [
                  { content: "Artigos sobre saúde mental e bem-estar" },
                  { content: "Dicas de autocuidado emocional" },
                  { content: "Reflexões sobre o processo terapêutico" },
                  { content: "Conteúdos sobre doenças crônicas e saúde" }
                ]
              }
            }
          }
        ]
      },
      trajetoria: {
        createMany: {
          data: [
            { content: "Formação em Psicologia, com especialização em Psicologia da Saúde", category: "aulas" },
            { content: "Temas de Cuidado", category: "aulas" },
            { content: "Palestras e apresentações em Psicologia da Saúde", category: "palestras" },
            { content: "Trajetos em cuidado, idoso, paciente crônico", category: "palestras" },
            { content: "Artigos em revistas de psicologia", category: "publicacoes" },
            { content: "Capítulo de livros", category: "publicacoes" },
            { content: "Atividades clínicas, pesquisas, supervisões", category: "experiencias" },
            { content: "Supervisão de outros psicólogos", category: "experiencias" }
          ]
        }
      },
      navbarItems: {
        createMany: {
          data: [
            { title: "Início" },
            { title: "Quem Sou Eu" },
            { title: "Como Posso Te Ajudar" },
            { title: "Condições Atendidas" },
            { title: "Recursos Terapêuticos" },
            { title: "Conteúdos" },
            { title: "Contato" }
          ]
        }
      },
      colors: {
        primary: "270 28% 55%",
        secondary: "270 30% 74%",
        accent: "155 30% 88%",
        background: "280 20% 96%",
        foreground: "0 0% 37%",
        card: "0 0% 100%",
        cardForeground: "0 0% 37%"
      }
    }
  });

  console.log('✅ Site default populado com dados do dashboard!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

