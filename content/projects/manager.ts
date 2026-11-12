import { personal, type Project } from './types.ts'

export const manager: Project = {
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
}
