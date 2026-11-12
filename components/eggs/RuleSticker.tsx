'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStill } from '../motion/useStill'

// Easter egg on the side-quests section: a card that flips over to show the house rule.
export function RuleSticker({ front, back, label }: { front: string; back: string; label: string }) {
  const [flipped, setFlipped] = useState(false)
  const still = useStill()
  return (
    <button type="button" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped} aria-label={label} className="relative h-36 w-60 [perspective:800px]">
      <motion.span
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: still ? 0 : 0.6, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        <span className="absolute inset-0 grid place-items-center rounded-2xl bg-red text-paper [backface-visibility:hidden]">
          <span className="title text-4xl">{front}</span>
          <span className="absolute bottom-3 right-4 font-mono text-[0.625rem] uppercase tracking-widest opacity-80">↻</span>
        </span>
        <span
          aria-live="polite"
          className="absolute inset-0 grid place-items-center rounded-2xl border border-ink bg-paper p-5 text-left text-sm font-medium leading-relaxed [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          {flipped ? back : ''}
        </span>
      </motion.span>
    </button>
  )
}
