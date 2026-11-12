'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { InOut } from '../motion/Scroll'
import { REST, useStill } from '../motion/useStill'

// Between episodes: a spider drops on its thread and swings across as you scroll past, next to an anime-style
// "next episode" line. Decorative only; the label is the next section's name, which follows anyway.
export function WebSwing({ label, flip = false }: { sfx?: string; label: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], flip ? [-38, 0, 38] : [38, 0, -38])
  const drop = useTransform(scrollYProgress, [0, 0.45], ['30%', '100%'])

  return (
    <div ref={ref} aria-hidden className="relative mx-auto grid h-[26svh] max-w-6xl grid-cols-2 items-center gap-6 overflow-x-clip px-4 sm:px-6">
      <motion.div style={still ? REST : { rotate, originY: 0 }} className="relative h-[14svh] w-8 self-start justify-self-center sm:h-[18svh]">
        <motion.div style={still ? { height: '100%' } : { height: drop }} className="relative mx-auto w-px bg-ink/50">
          <svg viewBox="-13 -2 26 32" className="absolute left-1/2 top-full h-9 w-7 -translate-x-1/2">
            <g fill="none" stroke="#111110" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
              <path d="M-2.5 9 L-8 5 L-10.5 0 M-3.5 12 L-10 11 L-12 7 M-3.5 14.5 L-10 18 L-12 22 M-2.5 17 L-7 22.5 L-8.5 28" />
              <path d="M2.5 9 L8 5 L10.5 0 M3.5 12 L10 11 L12 7 M3.5 14.5 L10 18 L12 22 M2.5 17 L7 22.5 L8.5 28" />
            </g>
            <circle cx={0} cy={6.5} r={2.6} fill="#111110" />
            <ellipse cx={0} cy={14} rx={3.8} ry={5} fill="#111110" />
            <circle cx={0} cy={13} r={1.1} fill="#E0241B" />
          </svg>
        </motion.div>
      </motion.div>
      <InOut innerClassName="grid gap-1 border-l border-line pl-6">
        <span className="slate">→</span>
        <span className="font-mono text-sm">{label}</span>
      </InOut>
    </div>
  )
}
