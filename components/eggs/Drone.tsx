'use client'
import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useMedia } from '../motion/useMedia'
import { useStill } from '../motion/useStill'
import { ByteSvg } from './drone/ByteSvg'
import { Dialogue } from './drone/Dialogue'
import { useSpeech } from './drone/useSpeech'

export const DRONE_STOPS = ['top', 'ch01', 'ch02', 'ch03', 'work', 'skills', 'offscreen', 'ch04', 'credits'] as const
type Stop = (typeof DRONE_STOPS)[number]

// Byte, the little drone that flies the whole page with the visitor and says one line per section. It weaves around
// the picture side of the screen (text lives on the left), trailing a little behind the scroll and leaning into it.
// A homemade drone with a red web on its shell, and a spider-sense tingle when you scroll fast.
// Decorative: everything it says is flavour, so it stays out of the accessibility tree.
export function Drone({ lines }: { lines: Record<Stop, string> }) {
  const still = useStill()
  const { stop, talking, setTalking, typed } = useSpeech(DRONE_STOPS, lines)
  const [tingle, setTingle] = useState(false)
  const { scrollY, scrollYProgress: p } = useScroll()
  const speed = useVelocity(scrollY)
  const wide = useMedia('(min-width: 640px)')

  // Flight path, in % of the viewport: a few loose loops down the right half, sprung so it lags like it's flying.
  const [lo, span] = wide ? [58, 32] : [82, 10]
  const fx = useTransform(p, (v) => lo + (Math.sin(v * Math.PI * 9) * 0.5 + 0.5) * span)
  const fy = useTransform(p, (v) => 26 + (Math.cos(v * Math.PI * 6) * 0.5 + 0.5) * 42)
  const left = useTransform(useSpring(fx, { stiffness: 38, damping: 13 }), (v) => `${v}%`)
  const top = useTransform(useSpring(fy, { stiffness: 38, damping: 13 }), (v) => `${v}%`)
  const lean = useSpring(useTransform(speed, [-3000, 0, 3000], [-18, 0, 18]), { stiffness: 120, damping: 12 })

  useMotionValueEvent(speed, 'change', (v) => {
    if (still) return
    if (Math.abs(v) > 2200) setTingle(true)
    else if (Math.abs(v) < 300) setTingle(false)
  })

  return (
    <>
      <Dialogue line={lines[stop]} typed={typed} talking={talking} still={still} />

      <motion.div
        aria-hidden
        // Motion off: parked in the corner. Explicit 'auto' clears the flight position framer wrote before.
        style={still ? { left: 'auto', top: 'auto' } : { left, top }}
        className={`pointer-events-none fixed z-40 ${still ? 'bottom-[8.5rem] right-3 sm:bottom-24 sm:right-5' : '-translate-x-1/2 -translate-y-1/2'}`}
      >
        <motion.button
          type="button"
          tabIndex={-1}
          aria-label="Byte"
          onMouseEnter={() => setTalking(true)}
          onClick={() => setTalking((t) => !t)}
          key={still ? 'still' : stop}
          initial={still ? false : { y: -14, scale: 0.9 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 12 }}
          style={still ? undefined : { rotate: lean }}
          className="pointer-events-auto relative block w-10 sm:w-14"
        >
          <span className={`block ${still ? '' : 'animate-[float_3.2s_ease-in-out_infinite]'}`}>
            <ByteSvg still={still} tingle={tingle} />
          </span>
        </motion.button>
      </motion.div>
    </>
  )
}
