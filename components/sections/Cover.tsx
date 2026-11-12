'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, FileDown } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import { CV_HREF } from '../Nav'
import photo from '@/public/ruben1.webp'
import { Words } from '../motion/Scroll'
import { REST, useStill } from '../motion/useStill'

// Manga speed lines behind the character. Rounded, because server and browser trig can differ in the last digit.
const r2 = (n: number) => Math.round(n * 100) / 100
const RAYS = Array.from({ length: 64 }, (_, i) => {
  const a = (i / 64) * Math.PI * 2
  return { x1: r2(Math.cos(a) * 21), y1: r2(Math.sin(a) * 21), x2: r2(Math.cos(a) * 50), y2: r2(Math.sin(a) * 50) }
})

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
  const figureY = useTransform(p, [0, 1], [0, -200])
  const jpY = useTransform(p, [0, 1], [0, 280])
  const raysScale = useTransform(p, [0, 1], [1, 1.7])
  const raysOpacity = useTransform(p, [0, 0.8], [1, 0])
  const photoY = useTransform(p, [0, 1], ['-6%', '10%'])

  // The photo wipes up when the page opens.
  const draw = useMotionValue(0)
  const wipe = useTransform(draw, (v) => `inset(${Math.round((1 - Math.min(1, v * 1.6)) * 100)}% 0 0 0 round 1.75rem)`)
  useEffect(() => {
    if (still) {
      draw.set(1)
      return
    }
    const run = animate(draw, 1, { duration: 2.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] })
    return () => run.stop()
  }, [still, draw])

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

          <motion.div
            style={still ? REST : { y: figureY }}
            className="pointer-events-none relative order-first -mb-16 w-28 justify-self-end sm:-mb-28 sm:w-44 lg:order-none lg:mb-0 lg:w-80"
          >
            <motion.svg
              aria-hidden
              viewBox="-50 -50 100 100"
              style={still ? REST : { scale: raysScale, opacity: raysOpacity }}
              className="absolute left-1/2 top-1/2 -z-10 w-[190%] -translate-x-1/2 -translate-y-1/2 text-line"
            >
              {RAYS.map((r, i) => (
                <line key={i} {...r} stroke="currentColor" strokeWidth={0.35} />
              ))}
            </motion.svg>
            <motion.div style={still ? undefined : { clipPath: wipe }} className="group pointer-events-auto relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-paper-2">
              {/* The picture drifts inside its frame: a second parallax depth. */}
              <motion.div style={still ? REST : { y: photoY }} className="absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src={photo}
                  alt={t.photoAlt}
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 11rem, 7rem"
                  className="h-full w-full object-cover object-[50%_30%] grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </motion.div>
              {/* A corner web, drawn in a few hairlines. */}
              <svg aria-hidden viewBox="0 0 60 60" className="absolute right-0 top-0 hidden w-1/3 text-paper/80 sm:block" fill="none" stroke="currentColor" strokeWidth={0.6}>
                <path d="M60 0 L18 42 M60 0 L34 56 M60 0 L4 26 M60 0 L60 60 M60 0 L0 0" />
                <path d="M48 0 Q50 8 60 12 M36 0 Q40 16 60 24 M24 0 Q28 26 60 38 M10 0 Q14 38 60 52" />
              </svg>
            </motion.div>
          </motion.div>

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
