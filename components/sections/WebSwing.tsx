'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { InOut } from '../motion/Scroll'
import { REST, useStill } from '../motion/useStill'
import { WebGlyph } from '../comic/WebGlyph'

// Between episodes: a small web drops on its thread and swings across as you scroll past, next to an anime-style
// "next episode" line. Decorative only; the label is the next section's name, which follows anyway.
export function WebSwing({ label, flip = false }: { sfx?: string; label: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], flip ? [-38, 0, 38] : [38, 0, -38])
  const drop = useTransform(scrollYProgress, [0, 0.45], ['30%', '100%'])

  return (
    <div ref={ref} aria-hidden className="column relative grid h-[26svh] grid-cols-2 items-center gap-6 overflow-x-clip">
      <motion.div style={still ? REST : { rotate, originY: 0 }} className="relative h-[14svh] w-8 self-start justify-self-center sm:h-[18svh]">
        <motion.div style={still ? { height: '100%' } : { height: drop }} className="relative mx-auto w-px bg-ink/50">
          <WebGlyph className="absolute left-1/2 top-full size-8 -translate-x-1/2 text-ink" weight={0.9} />
        </motion.div>
      </motion.div>
      <InOut innerClassName="grid gap-1 border-l border-line pl-6">
        <span className="slate">→</span>
        <span className="font-mono text-sm">{label}</span>
      </InOut>
    </div>
  )
}
