import type { Locale } from '../../lib/i18n.ts'

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

// Shared by the three personal projects.
export const personal: L = { en: 'Personal', pt: 'Pessoal' }
