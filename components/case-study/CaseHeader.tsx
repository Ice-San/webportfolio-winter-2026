import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { Stamp } from '../Stamp'
import { ProjectLinks } from '../ProjectLinks'
import { Title } from '../comic/Title'

// Top of a case study: back link, issue number and status, title, summary, the facts row and the project links.
export function CaseHeader({ project, dict, lang }: { project: Project; dict: Dictionary; lang: Locale }) {
  const t = dict.case
  const facts = [
    [t.type, project.type[lang], 'font-medium'],
    [t.status, project.status[lang], 'font-medium'],
    [t.role, t.roleValue, 'font-medium'],
    [t.timeline, project.period, 'font-mono font-medium'],
  ]
  return (
    <header className="relative isolate grid gap-6">
      <span aria-hidden className="outline-num pointer-events-none absolute -top-4 right-0 -z-10 hidden select-none text-[clamp(9rem,26vw,20rem)] sm:block">
        0{project.reel}
      </span>
      <Link href={`/${lang}#issue-${project.slug}`} className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium hover:text-red-text">
        <ArrowLeft aria-hidden className="size-4" />
        {t.back}
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <p className="kicker">
          {dict.work.issue} 0{project.reel} <span className="text-muted">· {project.period}</span>
        </p>
        <Stamp tone={project.tone} label={project.status[lang]} />
      </div>
      <Title as="h1" className="text-[clamp(3rem,10vw,8rem)] [overflow-wrap:anywhere]">
        {project.title}
      </Title>
      <p className="max-w-[56ch] text-xl leading-relaxed text-muted">{project.summary[lang]}</p>
      <dl className="grid gap-x-8 gap-y-4 border-t border-ink pt-5 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([label, value, cls]) => (
          <div key={label} className="grid gap-1">
            <dt className="slate">{label}</dt>
            <dd className={cls}>{value}</dd>
          </div>
        ))}
      </dl>
      <ProjectLinks project={project} dict={dict} />
    </header>
  )
}
