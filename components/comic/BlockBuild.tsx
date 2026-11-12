'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useStill } from '../motion/useStill'

// Isometric blocks that stack one at a time as you scroll: the server built with friends that never shipped.
// Bottom row first, left to right, so later blocks overlap earlier ones correctly.
const BLOCKS = [
  [0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2],
].map(([col, row]) => ({ x: 64 + col * 46, y: 168 - row * 28 }))

function Cube({ x, y, style }: { x: number; y: number; style?: { opacity: MotionValue<number>; y: MotionValue<number> } }) {
  return (
    <motion.g data-reveal style={style}>
      <path d={`M${x} ${y} l23 -12 l23 12 l-23 12 Z`} fill="#F6F5F1" stroke="#111110" strokeWidth={1.2} />
      <path d={`M${x} ${y} l23 12 v28 l-23 -12 Z`} fill="#ECEAE4" stroke="#111110" strokeWidth={1.2} />
      <path d={`M${x + 46} ${y} l-23 12 v28 l23 -12 Z`} fill="#DAD7CF" stroke="#111110" strokeWidth={1.2} />
    </motion.g>
  )
}

function StackedCube({ x, y, i, p }: { x: number; y: number; i: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, (v): number => (v * BLOCKS.length > i ? 1 : 0))
  const drop = useTransform(opacity, [0, 1], [-28, 0])
  return <Cube x={x} y={y} style={{ opacity, y: drop }} />
}

export function BlockBuild({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  return (
    <div ref={ref} className={className}>
      <svg viewBox="50 90 170 120" aria-hidden className="h-auto w-full">
        {BLOCKS.map((b, i) => (still ? <Cube key={i} x={b.x} y={b.y} /> : <StackedCube key={i} x={b.x} y={b.y} i={i} p={scrollYProgress} />))}
      </svg>
    </div>
  )
}
