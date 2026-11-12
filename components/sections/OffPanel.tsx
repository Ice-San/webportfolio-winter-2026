import type { Dictionary } from '@/app/[lang]/dictionaries'
import { Panel } from '../comic/Panel'
import { Title } from '../comic/Title'
import { InOut, Parallax } from '../motion/Scroll'
import { Placeholder } from '../Placeholder'
import { shots } from '@/content/images'
import { RuleSticker } from '../eggs/RuleSticker'

// Side quests: the person outside the code (Fight Club nod), with a rule card to flip.
export function OffPanel({ dict }: { dict: Dictionary }) {
  const t = dict.offscreen
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="grid gap-6">
        <p className="kicker">{t.slate}</p>
        <Title className="text-[clamp(2.5rem,7vw,5.5rem)]">{t.title}</Title>
        {t.body.map((b) => (
          <InOut key={b}>
            <p className="prose-story text-muted">{b}</p>
          </InOut>
        ))}
        <InOut>
          <RuleSticker front={t.ruleFront} back={t.ruleBack} label={t.ruleLabel} />
        </InOut>
      </div>
      <Parallax speed={0.18}>
        <Panel from={{ x: 40 }} frameClassName="overflow-hidden rounded-2xl">
          <Placeholder description={t.image} label={dict.common.image} src={shots.cafe} position="object-[50%_35%]" sizes="(min-width: 1024px) 32rem, 100vw" ratio="4/5" drift />
        </Panel>
      </Parallax>
    </div>
  )
}
