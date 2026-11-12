import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'

// The big link at the bottom of a case study: the next project, or back to the work list after the last one.
export function NextProject({ next, dict, lang }: { next: Project | undefined; dict: Dictionary; lang: Locale }) {
  const t = dict.case
  return (
    <nav aria-label={t.next}>
      <Link href={next ? `/${lang}/projects/${next.slug}` : `/${lang}#work`} className="group grid gap-2 border-t border-ink pt-8">
        <span className="slate">{next ? t.next : t.end}</span>
        <span className="title inline-flex items-center gap-4 text-[clamp(2rem,6vw,4.5rem)] transition-colors group-hover:text-red-text">
          {next ? next.title : dict.work.slate}
          <ArrowRight aria-hidden className="size-10 shrink-0" />
        </span>
      </Link>
    </nav>
  )
}
