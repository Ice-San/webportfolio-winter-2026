'use client'
import { motion } from 'framer-motion'
import { WebGlyph } from '../../comic/WebGlyph'

export type Shot = { id: number; x: number; y: number; ox: number; oy: number }

// One web shot: a line from where it was fired (Byte, or the corner) to the click, a web where it lands and the sound.
export function Splat({ s, still, sfx }: { s: Shot; still: boolean; sfx: string }) {
  return (
    <motion.g initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <motion.line
        x1={s.ox}
        y1={s.oy}
        x2={s.x}
        y2={s.y}
        stroke="#111110"
        strokeWidth={1.2}
        initial={{ pathLength: still ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.14 }}
      />
      <WebGlyph x={s.x - 24} y={s.y - 24} width={48} height={48} color="#111110" weight={0.4} />
      <text x={s.x + 24} y={s.y - 14} fill="#BA1C14" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.12em' }}>
        {sfx}
      </text>
    </motion.g>
  )
}
