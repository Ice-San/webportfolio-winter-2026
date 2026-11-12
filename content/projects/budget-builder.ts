import { personal, type Project } from './types.ts'

export const budgetBuilder: Project = {
  slug: 'budget-builder',
  reel: 3,
  title: 'Budget Builder',
  period: '2026',
  type: personal,
  status: { en: 'In progress', pt: 'Em desenvolvimento' },
  tone: 'progress',
  summary: {
    en: 'Lets Portuguese contractors (plumbers, electricians, builders) write quotes and email them to clients as PDFs. Portuguese first, English second. Built as a Turborepo monorepo with Docker, Playwright end-to-end tests and CI/CD.',
    pt: 'Permite a profissionais portugueses (canalizadores, eletricistas, empreiteiros) criar orçamentos e enviá-los por email aos clientes em PDF. Primeiro em português, depois em inglês. Feito como um monorepo Turborepo com Docker, testes end-to-end com Playwright e CI/CD.',
  },
  idea: null,
  challenge: null,
  approach: {
    en: 'A rebuild of an earlier version as a smaller Express and Next.js monorepo, with PostgreSQL running in Docker.',
    pt: 'Uma reconstrução de uma versão anterior como um monorepo mais pequeno em Express e Next.js, com PostgreSQL a correr em Docker.',
  },
  implementation: {
    en: 'One-step company sign-up with a starter catalogue, quote settings and an example quote. A catalogue of services by category, each with unit, price and VAT rate. Clients with NIF checks and erasure on request (RGPD). Quotes built in sections and lines with live totals that match the database to the cent. A PDF preview, an email that is sent exactly once even after a double click or a lost response, and delivery tracking (sent, delivered, opened) with the quote\'s full history.',
    pt: 'Registo da empresa num só passo, com catálogo inicial, definições de orçamento e um orçamento de exemplo. Um catálogo de serviços por categoria, cada um com unidade, preço e taxa de IVA. Clientes com validação de NIF e eliminação a pedido (RGPD). Orçamentos em secções e linhas com totais em tempo real que batem certo com a base de dados ao cêntimo. Pré-visualização do PDF, um email enviado exatamente uma vez mesmo depois de um duplo clique ou de uma resposta perdida, e acompanhamento da entrega (enviado, entregue, aberto) com o histórico completo do orçamento.',
  },
  technology: [
    { name: 'Turborepo monorepo', how: { en: 'The API and web workspaces in one repository, run and built together.', pt: 'Os workspaces da API e da web num só repositório, a correr e a compilar em conjunto.' } },
    { name: 'Next.js + Tailwind CSS', how: { en: 'The web app, served at /pt and /en.', pt: 'A aplicação web, servida em /pt e /en.' } },
    { name: 'Express + Zod', how: { en: 'The API and its request validation.', pt: 'A API e a validação dos pedidos.' } },
    { name: 'Docker', how: { en: 'PostgreSQL runs in a Docker container.', pt: 'O PostgreSQL corre num contentor Docker.' } },
    { name: 'Playwright', how: { en: 'End-to-end tests for the web app.', pt: 'Testes end-to-end da aplicação web.' } },
    { name: 'CI/CD', how: { en: 'A pipeline that builds and tests the monorepo on every change.', pt: 'Uma pipeline que faz o build e corre os testes do monorepo a cada alteração.' } },
    { name: 'Prisma + PostgreSQL', how: { en: 'Data model and queries.', pt: 'Modelo de dados e consultas.' } },
    { name: 'Resend', how: { en: 'Sending quote emails and tracking their delivery.', pt: 'Envio dos emails de orçamento e acompanhamento da entrega.' } },
  ],
  result: { en: 'In development, with a live demo online.', pt: 'Em desenvolvimento, com uma demo online.' },
  learned: null,
  demoUrl: 'https://budgetb-gamma.vercel.app',
  repoUrls: [],
  cover: { en: 'Budget Builder quote editor: the price catalogue by trade and a roof-renovation quote', pt: 'Editor de orçamentos do Budget Builder: o catálogo de preços por especialidade e um orçamento de renovação de telhado' },
  gallery: [
    { en: 'The PDF preview the client receives', pt: 'A pré-visualização do PDF que o cliente recebe' },
    { en: 'Quote history with delivery status (sent, delivered, opened)', pt: 'Histórico do orçamento com estado de entrega (enviado, entregue, aberto)' },
  ],
}
