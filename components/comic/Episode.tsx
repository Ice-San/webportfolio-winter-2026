import { InOut, Parallax } from '../motion/Scroll'
import { Title } from './Title'

// An anime-style episode header: a "// EP.01" kicker, the title and a one-line note, over two parallax layers:
// a huge outlined episode number that rises and the episode number in Japanese (第一話 = "episode one") that sinks.
export function Episode({ n, jp, slate, title, nod }: { n: string; jp: string; slate: string; title: string; nod: string }) {
  return (
    <header className="relative isolate grid gap-5 pb-4 pt-8 sm:pb-6 sm:pt-12">
      <Parallax speed={0.35} className="pointer-events-none absolute -top-6 right-0 -z-10 select-none">
        <span aria-hidden className="outline-num block text-[clamp(9rem,30vw,24rem)]">
          {n}
        </span>
      </Parallax>
      <Parallax speed={-0.2} className="absolute right-1 top-16 hidden md:block">
        <span aria-hidden className="jp text-sm text-muted">
          {jp}
        </span>
      </Parallax>
      <p className="kicker">
        EP.{n} <span className="text-muted">· {slate}</span>
      </p>
      <Title className="text-[clamp(2.75rem,8vw,6.5rem)]">{title}</Title>
      <InOut>
        <p className="note max-w-[46ch] text-lg">{nod}</p>
      </InOut>
    </header>
  )
}
