import type { Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { CaseSection } from './CaseSection'

// The "Technology" section: each tool and what it was used for in this project.
export function TechList({ project, heading, lang }: { project: Project; heading: string; lang: Locale }) {
  return (
    <CaseSection heading={heading}>
      <dl className="grid gap-4">
        {project.technology.map((tech) => (
          <div key={tech.name} className="grid gap-1 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
            <dt className="font-mono text-sm font-bold">{tech.name}</dt>
            <dd className="text-muted">{tech.how[lang]}</dd>
          </div>
        ))}
      </dl>
    </CaseSection>
  )
}
