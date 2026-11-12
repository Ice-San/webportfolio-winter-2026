'use client'
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useStill } from '../motion/useStill'
import { WebGlyph } from '../comic/WebGlyph'

// The page hangs from a web: a thread runs down the left margin as you read, with a small web at its tip
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
        <motion.div style={{ x: '-50%', rotate: swing, originY: 0 }} className="absolute left-0 top-full grid w-6 justify-items-center">
          <span className="h-2 w-px bg-ink/35" />
          <WebGlyph className="size-6 text-ink" weight={0.9} />
        </motion.div>
      </motion.div>
    </div>
  )
}
