import Image from 'next/image'
import { Globe } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import { Episode } from '../comic/Episode'
import { Panel } from '../comic/Panel'
import { InOut } from '../motion/Scroll'
import { Placeholder } from '../Placeholder'
import { shots } from '@/content/images'

// EP.02: Animes Cold. A Discord window slides in, the bots speak one line at a time, then the site and Attempt #02.
export function TheServer({ dict }: { dict: Dictionary }) {
  const t = dict.ch02
  // Bot #1 is Estela (moderation), Bot #2 is Emilia-Tan (community), each with their real Discord avatar.
  const botLine = (n: number, name: string, avatar: StaticImageData, text: string, x: number) => (
    <Panel bare from={{ x, y: 40 }}>
      <div className="flex items-start gap-3">
        <Image src={avatar} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full border border-line bg-paper" />
        <div className="grid gap-1">
          <p className="font-mono text-xs text-muted">
            <span className="font-semibold text-ink">{name}</span> · {t.botTag} #{n}
          </p>
          <p className="chat">{text}</p>
        </div>
      </div>
    </Panel>
  )

  return (
    <div className="column grid gap-10">
      <Episode n="02" slate={t.slate} title={t.title} nod={t.nod} />

      {/* Text on the left; the server card and the old site stay pinned on the right while you read. */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="grid content-start gap-8 lg:col-span-6">
          <InOut>
            <p className="prose-story text-xl">{t.body[0]}</p>
          </InOut>
          <p className="slate">{t.beats[1]}</p>
          {botLine(1, 'Estela', shots.estela, t.botMod, 40)}
          {botLine(2, 'Emilia-Tan', shots.emiliaTan, t.botCommunity, 60)}
          <InOut>
            <p className="note">{t.body[1]}</p>
          </InOut>
          <InOut>
            <p className="prose-story">{t.body[2]}</p>
          </InOut>
          <InOut className="border-t border-line pt-8" innerClassName="grid gap-3">
            <p className="font-mono text-sm text-red-text">{t.attemptLabel}</p>
            <p className="title text-[clamp(1.5rem,2.6vw,2.125rem)]">{t.attemptTwo}</p>
            <p className="text-muted">{t.body[3]}</p>
          </InOut>
        </div>

        <div className="grid content-start gap-8 lg:sticky lg:top-24 lg:col-span-6 lg:self-start">
          <Panel from={{ x: 40 }} night frameClassName="grid content-start gap-4 rounded-2xl p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-glow">{t.beats[0]}</p>
            <Image src={shots.anicolds} alt={t.serverAlt} placeholder="blur" sizes="(min-width: 1024px) 18rem, 90vw" className="w-full max-w-[18rem] rounded-xl" />
          </Panel>
          <Panel from={{ x: 40, y: 60 }} frameClassName="grid overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <Globe aria-hidden className="size-3.5" />
                {t.beats[2]}
              </span>
            </div>
            <Placeholder description={t.imageSite} label={dict.common.image} src={shots.anicoldsSite} />
          </Panel>
        </div>
      </div>
    </div>
  )
}
