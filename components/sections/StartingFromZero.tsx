import type { Dictionary } from '@/app/[lang]/dictionaries'
import { BlockBuild } from '../comic/BlockBuild'
import { Episode } from '../comic/Episode'
import { Panel } from '../comic/Panel'
import { InOut } from '../motion/Scroll'
import { Placeholder } from '../Placeholder'
import { shots } from '@/content/images'

// EP.01: Minecraft at 12–15. The screenshot rides its panel, the blocks stack one per scroll step,
// and the episode ends on Attempt #01 (Return by Death: every retry starts from zero).
export function StartingFromZero({ dict }: { dict: Dictionary }) {
  const t = dict.ch01
  return (
    <div className="column grid gap-10">
      <Episode n="01" slate={t.slate} title={t.title} nod={t.nod} />

      {/* Text on the left, pictures on the right: the same reading line in every episode. */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="grid content-start gap-8 lg:col-span-6">
          <InOut>
            <p className="prose-story text-xl">{t.body[0]}</p>
          </InOut>
          <InOut innerClassName="grid gap-2">
            <p className="slate">{t.friends}</p>
            <p className="prose-story">{t.body[1]}</p>
          </InOut>
          <InOut className="border-t border-line pt-8" innerClassName="grid gap-3">
            <p className="font-mono text-sm text-red-text">{t.attempt}</p>
            <p className="title max-w-[22ch] text-[clamp(1.75rem,3vw,2.5rem)]">{t.body[2]}</p>
          </InOut>
        </div>

        <div className="grid content-start gap-8 lg:col-span-6">
          <Panel>
            <Placeholder description={t.image} label={dict.common.image} src={shots.minecraft} />
          </Panel>
          <Panel from={{ x: 40, y: 80 }} frameClassName="grid place-items-center p-6">
            <BlockBuild className="w-full max-w-xs" />
          </Panel>
        </div>
      </div>
    </div>
  )
}
