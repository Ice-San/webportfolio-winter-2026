import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { projectShots } from '@/content/images'
import { Placeholder } from '../../Placeholder'
import { ProjectLinks } from '../../ProjectLinks'
import { Stamp } from '../../Stamp'

// One quest card: number and status, cover image, summary, tech chips, and the case-study link.
// `shelf` = the wide sideways layout (fixed card width, no image drift).
export function IssueCard({ p, dict, lang, shelf }: { p: Project; dict: Dictionary; lang: Locale; shelf: boolean }) {
  const t = dict.work
  return (
    <article
      id={`issue-${p.slug}`}
      aria-labelledby={`${p.slug}-title`}
      className={`panel relative grid shrink-0 content-start gap-4 rounded-2xl p-5 transition-colors hover:border-ink sm:p-6 ${shelf ? 'w-[27rem]' : 'w-full max-w-xl'}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <p className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted">
          {t.issue} 0{p.reel} · {p.period}
        </p>
        <Stamp tone={p.tone} label={p.status[lang]} />
      </div>
      <span aria-hidden className="outline-num pointer-events-none absolute -bottom-3 right-4 select-none text-[7rem]">
        0{p.reel}
      </span>
      {p.slug === 'geekhatch' && <p className="kicker">{t.payoff}</p>}
      <h3 id={`${p.slug}-title`} className="title text-[clamp(2rem,3.4vw,2.75rem)] [overflow-wrap:anywhere]">
        {p.title}
      </h3>
      <div className="overflow-hidden rounded-xl">
        <Placeholder description={p.cover[lang]} label={dict.common.image} src={projectShots[p.slug].cover} position="object-top" sizes="27rem" ratio="16/9" drift={!shelf} />
      </div>
      <p className="text-sm leading-relaxed text-muted">{p.summary[lang]}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label={dict.case.technology}>
        {p.technology.slice(0, 6).map((tech) => (
          <li key={tech.name} className="chip">
            {tech.name}
          </li>
        ))}
      </ul>
      <div className="relative grid gap-3">
        <Link href={`/${lang}/projects/${p.slug}`} className="btn btn-solid w-fit">
          {t.caseStudy}
          <span className="sr-only">: {p.title}</span>
          <ArrowRight aria-hidden className="size-4" />
        </Link>
        <ProjectLinks project={p} dict={dict} />
      </div>
    </article>
  )
}
