import type { Slug } from './projects.ts'

export type Skill = {
  name: string
  group: 'frontend' | 'backend' | 'data' | 'practices'
  label: 'used' | 'familiar' | 'learning'
  evidence: Slug[]
}

// Labels are Ruben's to confirm (spec §5); only "used in projects" claims carry evidence.
export const skills: Skill[] = [
  { name: 'React', group: 'frontend', label: 'used', evidence: ['manager', 'geekhatch'] },
  { name: 'Next.js', group: 'frontend', label: 'used', evidence: ['geekhatch', 'budget-builder'] },
  { name: 'TypeScript', group: 'frontend', label: 'used', evidence: ['manager', 'budget-builder', 'geekhatch'] },
  { name: 'HTML, CSS, JavaScript', group: 'frontend', label: 'used', evidence: ['pathpals'] },
  { name: 'Tailwind CSS', group: 'frontend', label: 'used', evidence: ['budget-builder'] },
  { name: 'i18n (EN/PT)', group: 'frontend', label: 'used', evidence: ['manager', 'budget-builder'] },
  { name: 'Node.js + Express', group: 'backend', label: 'used', evidence: ['manager', 'budget-builder', 'geekhatch'] },
  { name: 'REST APIs', group: 'backend', label: 'used', evidence: ['manager', 'geekhatch'] },
  { name: 'Auth (JWT, bcrypt)', group: 'backend', label: 'used', evidence: ['manager'] },
  { name: 'PHP', group: 'backend', label: 'used', evidence: ['pathpals'] },
  { name: 'PostgreSQL', group: 'data', label: 'used', evidence: ['manager', 'budget-builder', 'geekhatch'] },
  { name: 'SQL', group: 'data', label: 'used', evidence: ['manager'] },
  { name: 'Prisma', group: 'data', label: 'used', evidence: ['budget-builder', 'geekhatch'] },
  { name: 'Git + GitHub', group: 'practices', label: 'used', evidence: ['manager'] },
  { name: 'Monorepos (Turborepo, pnpm)', group: 'practices', label: 'used', evidence: ['budget-builder', 'geekhatch'] },
  { name: 'Docker', group: 'practices', label: 'used', evidence: ['budget-builder', 'geekhatch'] },
  { name: 'End-to-end testing (Playwright)', group: 'practices', label: 'used', evidence: ['budget-builder', 'geekhatch'] },
  { name: 'CI/CD', group: 'practices', label: 'used', evidence: ['budget-builder', 'geekhatch'] },
]
