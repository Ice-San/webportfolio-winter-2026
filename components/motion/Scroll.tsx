'use client'
import { useRef, type RefObject } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useMedia } from './useMedia'
import { REST, useStill } from './useStill'

// In and out: a block rises and fades in as it enters, rests while it's read, then drifts up and fades as it leaves.
// Two measured windows, so a tall block never starts fading while its bottom is still being read.
export function useInOut(ref: RefObject<HTMLElement | null>, distance = 60) {
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 82%'] })
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ['end 18%', 'end start'] })
  const opacity = useTransform([enter, leave], ([i, o]: number[]) => Math.min(i, 1 - o))
  const y = useTransform([enter, leave], ([i, o]: number[]) => (1 - i) * distance - o * distance * 0.6)
  return { enter, opacity, y }
}

/** A block with the in-and-out motion. The wrapper is measured, the inner element moves. */
export function InOut({ distance = 60, className = '', innerClassName = '', children }: { distance?: number; className?: string; innerClassName?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { opacity, y } = useInOut(ref, distance)
  return (
    <div ref={ref} className={className}>
      <motion.div data-reveal style={still ? REST : { opacity, y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  )
}

/**
 * A parallax layer: moves `speed` × 400px across its pass through the viewport (negative speeds sink instead of rise).
 * Phones get half the travel.
 */
export function Parallax({
  speed = 0.2,
  className = '',
  innerClassName = '',
  children,
}: {
  speed?: number
  className?: string
  innerClassName?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const wide = useMedia('(min-width: 640px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const range = 400 * speed * (wide ? 1 : 0.5)
  const y = useTransform(scrollYProgress, [0, 1], [range, -range])
  return (
    <div ref={ref} className={className}>
      <motion.div data-reveal style={still ? REST : { y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  )
}

function Word({ p, range, still, children }: { p: MotionValue<number>; range: [number, number]; still: boolean; children: string }) {
  const opacity = useTransform(p, range, [0.2, 1])
  return (
    <>
      <motion.span data-reveal style={still ? REST : { opacity }}>
        {children}
      </motion.span>{' '}
    </>
  )
}

/** A statement that inks in word by word as you scroll through it. */
export function Words({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const still = useStill()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={still}>
          {w}
        </Word>
      ))}
    </p>
  )
}
