'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, FileDown } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import { CV_HREF } from '../Nav'
import { Words } from '../motion/Scroll'
import { REST, useStill } from '../motion/useStill'
import { Figure } from './cover/Figure'

// The opening: a quiet hero on four parallax depths. On the way out the name splits and lags, Ruben rises fastest,
// the katakana sinks and the speed lines widen. Then the headline inks in word by word.
export function Cover({ dict }: { dict: Dictionary }) {
  const t = dict.cover
  const [first, ...rest] = t.name.split(' ')
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(p, [0, 1], [0, 180])
  const leftX = useTransform(p, [0, 1], ['0%', '-24%'])
  const rightX = useTransform(p, [0, 1], ['0%', '24%'])
  const fade = useTransform(p, [0, 0.7], [1, 0])
  const jpY = useTransform(p, [0, 1], [0, 280])

  return (
    <div className="relative isolate">
      <div ref={ref} className="mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-6xl grid-rows-[auto_1fr_auto] gap-8 px-4 pb-6 pt-6 sm:px-6 sm:pt-10">
        <p className="kicker">{t.kicker}</p>

        <div className="relative grid content-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <motion.div style={still ? REST : { y: nameY, opacity: fade }} className="relative z-10 grid gap-6">
            <h1 className="title text-[clamp(3.75rem,15vw,13rem)] leading-[0.84]">
              <motion.span className="block" style={still ? REST : { x: leftX }}>
                {first}
              </motion.span>
              <motion.span className="block pl-[0.55em]" style={still ? REST : { x: rightX }}>
                {rest.join(' ')}
              </motion.span>
            </h1>
            <p className="font-mono text-sm sm:text-base">
              <span className="text-muted">&lt;</span>Developer role=<span className="text-red-text">&quot;{t.role}&quot;</span>{' '}
              <span className="text-muted">/&gt;</span>
            </p>
            <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{t.subline}</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#ch01" className="btn btn-solid">
                {t.ctaStory}
                <ArrowDown aria-hidden className="size-4" />
              </a>
              <a href="#work" className="btn">
                {t.ctaWork}
                <ArrowRight aria-hidden className="size-4" />
              </a>
              <a href={CV_HREF} download className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-medium underline underline-offset-4 hover:text-red-text">
                <FileDown aria-hidden className="size-4" />
                {t.ctaCv}
              </a>
            </div>
          </motion.div>

          <Figure p={p} still={still} alt={t.photoAlt} />

          {/* His name in katakana, set vertically like an anime title card. */}
          <motion.p
            aria-hidden
            style={still ? REST : { y: jpY, opacity: fade }}
            className="jp absolute -right-12 top-0 hidden text-xs text-muted xl:block"
          >
            ルーベン・コスタ
          </motion.p>
        </div>

        <div className="flex items-end justify-between">
          <p className="slate flex items-center gap-3">
            <span aria-hidden className="relative h-10 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 bg-ink motion-safe:animate-[cue_2.4s_ease-in-out_infinite]" />
            </span>
            {t.scroll}
          </p>
          <p aria-hidden className="slate hidden sm:block">
            EP.00 / 04
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Words text={t.headline} className="title max-w-[17ch] text-[clamp(2.25rem,6vw,5.25rem)]" />
      </div>
    </div>
  )
}
