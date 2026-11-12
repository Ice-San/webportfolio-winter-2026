import { ArrowUpRight, BriefcaseBusiness, FileDown, FolderGit2, Mail } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import { CV_HREF } from '../Nav'
import { CopyEmail } from '../CopyEmail'
import { Episode } from '../comic/Episode'
import { PhotoScene } from '../comic/PhotoScene'
import { Panel } from '../comic/Panel'
import { InOut } from '../motion/Scroll'
import { EMAIL, GITHUB, LINKEDIN } from '@/lib/site'


function AiAvatar() {
  return (
    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-night">
      <span className="flex gap-1">
        <span className="h-2.5 w-1.5 rounded-full bg-glow" />
        <span className="h-2.5 w-1.5 rounded-full bg-glow" />
      </span>
    </span>
  )
}

// The final episode and the thing to remember: Ruben at home at night, building with his AI.
// The conversation ends with the AI handing over his contact details.
export function BrandNewDay({ dict }: { dict: Dictionary }) {
  const t = dict.ch04
  const c = dict.credits
  const link = 'inline-flex min-h-11 items-center gap-2 font-medium underline decoration-line underline-offset-4 hover:text-red-text hover:decoration-current'

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6">
      <Episode n="04" jp="最終話" slate={t.slate} title={t.title} nod={t.nod} />

      <div className="grid gap-6 lg:w-1/2 lg:pr-6">
        {t.body.map((b) => (
          <InOut key={b}>
            <p className="prose-story">{b}</p>
          </InOut>
        ))}
      </div>

      <Panel from={{ y: 100 }} night frameClassName="overflow-hidden rounded-2xl">
        <PhotoScene label={t.scene} />
      </Panel>

      <div className="grid gap-12 lg:grid-cols-2">
        <ol className="grid gap-5" aria-label={`${t.aiName} · ${t.meName}`}>
          <li>
            <Panel bare from={{ x: -40, y: 30 }}>
              <div className="flex items-end gap-3">
                <AiAvatar />
                <p className="chat">
                  <span className="sr-only">{t.aiName}: </span>
                  {t.ai1}
                </p>
              </div>
            </Panel>
          </li>
          <li>
            <Panel bare from={{ x: 40, y: 30 }}>
              <p className="chat chat-me ml-auto w-fit max-w-[36ch]">
                <span className="sr-only">{t.meName}: </span>
                {t.me1}
              </p>
            </Panel>
          </li>
          <li>
            <Panel bare from={{ x: -40, y: 30 }}>
              <div className="flex items-end gap-3">
                <AiAvatar />
                <p className="chat">
                  <span className="sr-only">{t.aiName}: </span>
                  {t.ai2}
                </p>
              </div>
            </Panel>
          </li>
        </ol>
      </div>

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

      <footer className="grid gap-3 border-t border-line pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="grid gap-2">
          <p className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
            {t.end}
            {/* "Tsuzuku": the "to be continued" card at the end of an anime episode. */}
            <span aria-hidden className="font-[family-name:var(--font-jp)] text-base text-red-text">
              つづく
            </span>
          </p>
          <p className="text-sm text-muted">
            {c.writtenBy} Ruben Costa · {c.footer}
          </p>
        </div>
        <p className="font-mono text-xs text-muted">{dict.hud.konami}</p>
      </footer>
    </div>
  )
}
