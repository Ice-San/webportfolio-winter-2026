// The four featured projects, in reel order. Each project's text lives in content/projects/<slug>.ts.
import type { Project } from './projects/types.ts'
import { pathpals } from './projects/pathpals.ts'
import { manager } from './projects/manager.ts'
import { budgetBuilder } from './projects/budget-builder.ts'
import { geekhatch } from './projects/geekhatch.ts'

export type { L, Project, Slug } from './projects/types.ts'

export const projects: Project[] = [pathpals, manager, budgetBuilder, geekhatch]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
