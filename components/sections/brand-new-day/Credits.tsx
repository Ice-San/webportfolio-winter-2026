import { ArrowUpRight, BriefcaseBusiness, FileDown, FolderGit2, Mail } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import { CV_HREF } from '../../Nav'
import { CopyEmail } from '../../CopyEmail'
import { InOut } from '../../motion/Scroll'
import { EMAIL, GITHUB, LINKEDIN } from '@/lib/site'

const link = 'inline-flex min-h-11 items-center gap-2 font-medium underline decoration-line underline-offset-4 hover:text-red-text hover:decoration-current'

// The contact block: email (copy or mail), GitHub, LinkedIn and the CV. `id="credits"` is a drone stop and a nav anchor.
export function Credits({ c }: { c: Dictionary['credits'] }) {
  return (
    <section id="credits" aria-labelledby="credits-title" className="scroll-mt-24 border-t border-ink pt-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-4">
          <p className="kicker">{c.title}</p>
          <h2 id="credits-title" className="title text-[clamp(2.5rem,6vw,4.5rem)]">
            {c.lead}
          </h2>
        </div>
        <InOut innerClassName="grid content-start gap-8">
          <div className="grid gap-3">
            <p className="slate">{c.email}</p>
            <span id="credits-email" className="select-all break-all text-[clamp(1.25rem,2.6vw,1.75rem)] font-semibold tracking-tight">
              {EMAIL}
            </span>
            <span className="flex flex-wrap gap-3">
              <CopyEmail email={EMAIL} labels={{ copy: c.copy, copied: c.copied }} targetId="credits-email" />
              <a href={`mailto:${EMAIL}`} className="btn">
                <Mail aria-hidden className="size-4" />
                {c.email}
              </a>
            </span>
          </div>
          <dl className="grid gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
            <div className="grid gap-1">
              <dt className="slate">{c.github}</dt>
              <dd>
                <a href={GITHUB} target="_blank" rel="noreferrer" className={link}>
                  <FolderGit2 aria-hidden className="size-4" />
                  Ice-San
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="slate">{c.linkedin}</dt>
              <dd>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className={link}>
                  <BriefcaseBusiness aria-hidden className="size-4" />
                  devrubencosta
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="slate">{c.cv}</dt>
              <dd>
                <a href={CV_HREF} download className={link}>
                  <FileDown aria-hidden className="size-4" />
                  PDF
                  <span className="sr-only">: {c.cvLink}</span>
                </a>
              </dd>
            </div>
          </dl>
        </InOut>
      </div>
    </section>
  )
}
