import { personal, type Project } from './types.ts'

export const geekhatch: Project = {
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
}
