import type { Dictionary } from '@/app/[lang]/dictionaries'
import { Episode } from '../comic/Episode'
import { Panel } from '../comic/Panel'
import { InOut } from '../motion/Scroll'
import { Placeholder } from '../Placeholder'
import { projectShots } from '@/content/images'

// Decorative short hashes for the commit-log look (not real commits).
const HASHES = ['3f1a9c2', '8b04e71', 'c52d0fa', 'e917b3d']

// EP.03: self-taught → PAP → CTeSP, told as a git log, with PathPals pinned beside it.
export function SelfMade({ dict }: { dict: Dictionary }) {
  const t = dict.ch03

  return (
    <div className="column grid gap-10">
      <Episode n="03" slate={t.slate} title={t.title} nod={t.nod} />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-10">
          <p aria-hidden className="font-mono text-sm text-muted">$ git log --reverse</p>
          <ol className="relative grid gap-10 border-l border-line pl-8">
            {t.steps.map((s, i) => (
              <li key={s.when} className="relative">
                <span aria-hidden className="absolute -left-[2.3rem] top-1.5 size-3 rounded-full border-2 border-paper bg-ink ring-1 ring-line" />
                <InOut innerClassName="grid gap-2">
                  <p className="font-mono text-xs">
                    <span aria-hidden className="text-red-text">{HASHES[i]} </span>
                    <span className="uppercase tracking-widest text-muted">{s.when}</span>
                  </p>
                  <p className="prose-story">{s.text}</p>
                </InOut>
              </li>
            ))}
          </ol>
        </div>

        <aside className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start">
          <Panel frameClassName="overflow-hidden rounded-2xl">
            <Placeholder description={t.image} label={dict.common.image} src={projectShots.pathpals.gallery[0]} />
          </Panel>
        </aside>
      </div>
    </div>
  )
}
