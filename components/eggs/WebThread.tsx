'use client'
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useStill } from '../motion/useStill'

// The page hangs from a web: a thread runs down the left margin as you read, with a small spider at its tip
// that swings with your scroll speed. It sits just outside the content column and behind it (-z-10), so the
// full-bleed project shelf slides over it instead of being crossed by it.
export function WebThread() {
  const still = useStill()
  const { scrollY, scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0, 1], ['4%', '94%'])
  const swing = useSpring(useTransform(useVelocity(scrollY), [-3000, 0, 3000], [28, 0, -28]), { stiffness: 140, damping: 9 })
  if (still) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-14 left-[max(0.25rem,calc((100vw-72rem)/2-2.75rem))] -z-10 hidden w-4 xl:block">
      <motion.div style={{ height }} className="relative mx-auto w-px bg-ink/35">
        <motion.svg style={{ x: '-50%', rotate: swing, originY: 0 }} viewBox="-13 -4 26 34" className="absolute left-0 top-full h-8 w-6">
          <line x1={0} y1={-4} x2={0} y2={4} stroke="#111110" strokeWidth={0.8} />
          <g fill="none" stroke="#111110" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
            <path d="M-2.5 9 L-8 5 L-10.5 0 M-3.5 12 L-10 11 L-12 7 M-3.5 14.5 L-10 18 L-12 22 M-2.5 17 L-7 22.5 L-8.5 28" />
            <path d="M2.5 9 L8 5 L10.5 0 M3.5 12 L10 11 L12 7 M3.5 14.5 L10 18 L12 22 M2.5 17 L7 22.5 L8.5 28" />
          </g>
          <circle cx={0} cy={6.5} r={2.6} fill="#111110" />
          <ellipse cx={0} cy={14} rx={3.8} ry={5} fill="#111110" />
          <circle cx={0} cy={13} r={1.1} fill="#E0241B" />
        </motion.svg>
      </motion.div>
    </div>
  )
}
