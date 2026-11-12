import type { Locale } from '../lib/i18n.ts'

export type L = Record<Locale, string>
export type Slug = 'pathpals' | 'manager' | 'budget-builder' | 'geekhatch'
export type Project = {
  slug: Slug
  reel: 1 | 2 | 3 | 4
  title: string
  period: string
  type: L
  status: L
  tone: 'done' | 'progress' | 'beta'
  summary: L
  // null = Ruben hasn't written it yet; the section is left out, never invented.
  idea: L | null
  challenge: L | null
  approach: L | null
  implementation: L
  technology: { name: string; how: L }[]
  result: L | null
  learned: L | null
  demoUrl: string | null
  repoUrls: string[]
  cover: L
  gallery: L[]
}

const personal: L = { en: 'Personal', pt: 'Pessoal' }

export const projects: Project[] = [
  {
    slug: 'pathpals',
    reel: 1,
    title: 'PathPals',
    period: '2024',
    type: { en: 'Personal · School final project (PAP)', pt: 'Pessoal · Prova de Aptidão Profissional (PAP)' },
    status: { en: 'Completed', pt: 'Concluído' },
    tone: 'done',
    summary: {
      en: 'A school-transport app: students request a ride to school, the school confirms it, and a one-tap alert asks for help if something goes wrong on the way.',
      pt: 'Uma aplicação de transporte escolar: os alunos pedem boleia para a escola, a escola confirma e um alerta de um toque pede ajuda se algo correr mal pelo caminho.',
    },
    idea: null,
    challenge: null,
    approach: null,
    implementation: {
      en: 'Accounts with sign-up and sign-in, linked to a school. Students request transport, the school confirms the trip, and the trip is marked as done. Profiles (name, class, role, about me), notifications when offers or requests are created, and a help button that alerts the school if something dangerous happens during the trip. Privacy policy, terms of service and cookie pages.',
      pt: 'Contas com registo e início de sessão, associadas a uma escola. Os alunos pedem transporte, a escola confirma a viagem e a viagem fica concluída. Perfis (nome, turma, função, sobre mim), notificações quando são criadas ofertas ou pedidos e um botão de ajuda que alerta a escola se acontecer algo perigoso durante a viagem. Páginas de política de privacidade, termos de serviço e cookies.',
    },
    technology: [
      { name: 'PHP', how: { en: 'Server-side pages and authentication (sign-up, sign-in, accounts).', pt: 'Páginas do lado do servidor e autenticação (registo, início de sessão, contas).' } },
      { name: 'HTML, CSS, JavaScript', how: { en: 'The interface and the request flow.', pt: 'A interface e o fluxo de pedidos.' } },
    ],
    result: { en: 'Presented as my PAP in 2024. My first full-stack app.', pt: 'Apresentado como a minha PAP em 2024. A minha primeira aplicação full-stack.' },
    learned: null,
    demoUrl: null,
    repoUrls: [],
    cover: { en: 'PathPals landing page: the hand-drawn logo over two students outside a school', pt: 'Página inicial do PathPals: o logótipo escrito à mão sobre dois alunos à porta de uma escola' },
    gallery: [
      { en: 'PathPals requests page: requested, offers and orders tabs, with my requests and global requests', pt: 'Página de pedidos do PathPals: separadores solicitadas, ofertas e pedidos, com as minhas solicitações e as globais' },
      { en: 'Student profile settings', pt: 'Configuração do perfil do aluno' },
    ],
  },
  {
    slug: 'manager',
    reel: 2,
    title: 'Manager',
    period: '2025',
    type: personal,
    status: { en: 'Completed', pt: 'Concluído' },
    tone: 'done',
    summary: {
      en: 'A user-management dashboard with JWT sign-in, user stats, and create, edit, deactivate and reactivate flows, in two languages.',
      pt: 'Um painel de gestão de utilizadores com início de sessão por JWT, estatísticas e fluxos para criar, editar, desativar e reativar utilizadores, em duas línguas.',
    },
    idea: null,
    challenge: null,
    approach: null,
    implementation: {
      en: 'A React and TypeScript dashboard with a user list, an add-user form, KPI stats and a profile page, translated through a language context. An Express API with sign-in, JWT verification middleware, bcrypt password hashing and password validation, plus routes to create, update, delete and reactivate users and change passwords. PostgreSQL with hand-written SQL.',
      pt: 'Um painel em React e TypeScript com lista de utilizadores, formulário para adicionar utilizadores, estatísticas (KPI) e página de perfil, traduzido através de um contexto de idioma. Uma API em Express com início de sessão, middleware de verificação de JWT, hashing de palavras-passe com bcrypt e validação de palavras-passe, e rotas para criar, atualizar, apagar e reativar utilizadores e mudar a palavra-passe. PostgreSQL com SQL escrito à mão.',
    },
    technology: [
      { name: 'React + TypeScript', how: { en: 'Dashboard pages, components and the language context.', pt: 'Páginas do painel, componentes e o contexto de idioma.' } },
      { name: 'Express', how: { en: 'REST API: auth, users and KPI routes with controllers.', pt: 'API REST: rotas de autenticação, utilizadores e KPI com controladores.' } },
      { name: 'JWT + bcrypt', how: { en: 'Signed sessions checked by middleware; hashed passwords.', pt: 'Sessões assinadas verificadas por middleware; palavras-passe com hash.' } },
      { name: 'PostgreSQL', how: { en: 'Users and stats, queried with the pg driver and raw SQL.', pt: 'Utilizadores e estatísticas, consultados com o driver pg e SQL.' } },
    ],
    result: { en: 'A live demo is online and both repositories are public.', pt: 'Há uma demo online e os dois repositórios são públicos.' },
    learned: null,
    demoUrl: 'https://manager-front-end.vercel.app',
    repoUrls: ['https://github.com/Ice-San/manager-front-end', 'https://github.com/Ice-San/manager-back-end'],
    cover: { en: 'Manager dashboard: the add-user form, the searchable user list and the stats row', pt: 'Painel do Manager: o formulário de novo utilizador, a lista pesquisável e a linha de estatísticas' },
    gallery: [
      { en: 'Add-user form with validation', pt: 'Formulário de novo utilizador com validação' },
      { en: 'Language selector switching the dashboard to Portuguese', pt: 'Seletor de idioma a mudar o painel para português' },
    ],
  },
  {
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
  },
  {
    slug: 'geekhatch',
    reel: 4,
    title: 'GeekHatch',
    period: '2026',
    type: personal,
    status: { en: 'Beta · access only', pt: 'Beta · acesso restrito' },
    tone: 'beta',
    summary: {
      en: 'The anime and manga community: a web app that grew out of the Animes Cold Discord server. A Turborepo monorepo with Docker, Playwright end-to-end tests and CI/CD.',
      pt: 'A comunidade de anime e manga: uma aplicação web que nasceu do servidor de Discord Animes Cold. Um monorepo Turborepo com Docker, testes end-to-end com Playwright e CI/CD.',
    },
    idea: {
      en: 'Animes Cold started as a simple Discord server, then became a community with bots and a website. GeekHatch is the next step: a web app of its own.',
      pt: 'O Animes Cold começou como um simples servidor de Discord e tornou-se uma comunidade com bots e um site. O GeekHatch é o passo seguinte: uma aplicação web própria.',
    },
    challenge: null,
    approach: {
      en: 'A Turborepo monorepo with pnpm workspaces: a Next.js web app, an Express API and a shared package for locales and the EU country list. The browser only ever talks to the web origin: /api/* is rewritten to the API, and the API refuses any request without a shared proxy secret.',
      pt: 'Um monorepo Turborepo com workspaces pnpm: uma aplicação web em Next.js, uma API em Express e um pacote partilhado para idiomas e a lista de países da UE. O browser só fala com a origem da web: /api/* é reencaminhado para a API, e a API recusa qualquer pedido sem um segredo partilhado do proxy.',
    },
    implementation: {
      en: 'The web app, the API, the data model and the shared locales, plus the project documentation (PRD, design system, architecture and plans).',
      pt: 'A aplicação web, a API, o modelo de dados e os idiomas partilhados, além da documentação do projeto (PRD, design system, arquitetura e planos).',
    },
    technology: [
      { name: 'Turborepo monorepo', how: { en: 'pnpm workspaces for the web app, the API and the shared package.', pt: 'Workspaces pnpm para a aplicação web, a API e o pacote partilhado.' } },
      { name: 'Next.js 16', how: { en: 'The web app and the /api proxy rewrite.', pt: 'A aplicação web e o reencaminhamento /api.' } },
      { name: 'Express 5', how: { en: 'The API, which only accepts proxied requests.', pt: 'A API, que só aceita pedidos vindos do proxy.' } },
      { name: 'Docker', how: { en: 'Runs the stack in containers.', pt: 'Corre a stack em contentores.' } },
      { name: 'Playwright', how: { en: 'End-to-end tests for the web app.', pt: 'Testes end-to-end da aplicação web.' } },
      { name: 'CI/CD', how: { en: 'A pipeline that builds and tests the monorepo on every change.', pt: 'Uma pipeline que faz o build e corre os testes do monorepo a cada alteração.' } },
      { name: 'Prisma 7 + PostgreSQL 18', how: { en: 'The data model and database access.', pt: 'O modelo de dados e o acesso à base de dados.' } },
    ],
    result: { en: 'Running as an access-only beta.', pt: 'Em beta com acesso restrito.' },
    learned: null,
    demoUrl: 'https://geekhatch.com',
    repoUrls: [],
    cover: { en: 'GeekHatch home feed in the beta: a Re:Zero review, a daily streak and the next stamp', pt: 'O feed inicial do GeekHatch na beta: uma crítica de Re:Zero, a sequência diária e o próximo selo' },
    gallery: [
      { en: 'A community page with posts about an anime', pt: 'Uma página da comunidade com publicações sobre um anime' },
      { en: 'The same page on a phone', pt: 'A mesma página num telemóvel' },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
