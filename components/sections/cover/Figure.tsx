'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import photo from '@/public/ruben1.webp'
import { REST } from '../../motion/useStill'

// Manga speed lines behind the character. Rounded, because server and browser trig can differ in the last digit.
const r2 = (n: number) => Math.round(n * 100) / 100
const RAYS = Array.from({ length: 64 }, (_, i) => {
  const a = (i / 64) * Math.PI * 2
  return { x1: r2(Math.cos(a) * 21), y1: r2(Math.sin(a) * 21), x2: r2(Math.cos(a) * 50), y2: r2(Math.sin(a) * 50) }
})

// Ruben's photo on the cover: it wipes up on load, drifts inside its frame and rises fastest on the way out,
// with the speed lines widening behind it. `p` is the cover's scroll progress.
export function Figure({ p, still, alt }: { p: MotionValue<number>; still: boolean; alt: string }) {
  const figureY = useTransform(p, [0, 1], [0, -200])
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
            alt={alt}
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
  )
}
