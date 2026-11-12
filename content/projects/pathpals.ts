import type { Project } from './types.ts'

export const pathpals: Project = {
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
}
