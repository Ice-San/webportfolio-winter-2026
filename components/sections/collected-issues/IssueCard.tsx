import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { projectShots } from '@/content/images'
import { Placeholder } from '../../Placeholder'
import { ProjectLinks } from '../../ProjectLinks'
import { Stamp } from '../../Stamp'

// One quest card: number and status, cover image, summary, tech chips, then the case-study link with the big quest
// number beside it (in the flow, so it stays inside the card). `shelf` = the wide sideways layout (fixed card width).
export function IssueCard({ p, dict, lang, shelf }: { p: Project; dict: Dictionary; lang: Locale; shelf: boolean }) {
  const t = dict.work
  return (
    <article
      id={`issue-${p.slug}`}
      aria-labelledby={`${p.slug}-title`}
      className={`panel flex shrink-0 flex-col gap-4 rounded-2xl p-5 transition-colors hover:border-ink sm:p-6 ${shelf ? 'w-[27rem]' : 'w-full max-w-xl'}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <p className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted">
          {t.issue} 0{p.reel} · {p.period}
        </p>
        <Stamp tone={p.tone} label={p.status[lang]} />
      </div>
      {p.slug === 'geekhatch' && <p className="kicker">{t.payoff}</p>}
      <h3 id={`${p.slug}-title`} className="title text-[clamp(2rem,3.4vw,2.75rem)] [overflow-wrap:anywhere]">
        {p.title}
      </h3>
      <div className="overflow-hidden rounded-xl">
        <Placeholder description={p.cover[lang]} label={dict.common.image} src={projectShots[p.slug].cover} sizes="27rem" />
      </div>
      <p className="text-sm leading-relaxed text-muted">{p.summary[lang]}</p>
      <ul className="flex flex-wrap gap-1.5" aria-label={dict.case.technology}>
        {p.technology.slice(0, 6).map((tech) => (
          <li key={tech.name} className="chip">
            {tech.name}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end justify-between gap-4">
        <div className="grid min-w-0 gap-3">
          <Link href={`/${lang}/projects/${p.slug}`} className="btn btn-solid w-fit">
            {t.caseStudy}
            <span className="sr-only">: {p.title}</span>
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <ProjectLinks project={p} dict={dict} />
        </div>
        <span aria-hidden className="outline-num shrink-0 select-none text-[clamp(4rem,9vw,6rem)]">
          0{p.reel}
        </span>
      </div>
    </article>
  )
}
