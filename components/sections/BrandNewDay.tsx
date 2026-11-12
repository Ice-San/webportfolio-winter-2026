import type { Dictionary } from '@/app/[lang]/dictionaries'
import { Episode } from '../comic/Episode'
import { PhotoScene } from '../comic/PhotoScene'
import { Panel } from '../comic/Panel'
import { InOut } from '../motion/Scroll'
import { Chat } from './brand-new-day/Chat'
import { Credits } from './brand-new-day/Credits'

// The final episode and the thing to remember: Ruben at home at night, building with his AI.
// The conversation ends with the AI handing over his contact details.
export function BrandNewDay({ dict }: { dict: Dictionary }) {
  const t = dict.ch04
  const c = dict.credits

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6">
      <Episode n="04" slate={t.slate} title={t.title} nod={t.nod} />

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
        <Chat t={t} />
      </div>

      <Credits c={c} />

      <footer className="grid gap-3 border-t border-line pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="grid gap-2">
          <p className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
            {t.end}
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
