'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useStill } from '../motion/useStill'
import { ByteSvg } from './drone/ByteSvg'
import { Dialogue } from './drone/Dialogue'
import { useLane } from './drone/useLane'
import { useSpeech } from './drone/useSpeech'
import { DRONE_STOPS, type Stop } from './drone/stops'
import { useWebHit } from './WebShooter'

export { DRONE_STOPS }

// Byte, the little drone that flies the whole page with the visitor and says one line per section. It flies in the
// empty margin right of the content (never over text), trailing the scroll and leaning into it; where there's no
// margin it waits in the HUD corner (useLane). A homemade drone with a red web on its shell, and a spider-sense
// tingle when you scroll fast. Shoot a web at a section and Byte sums that section up (`web`).
// Decorative: everything it says is flavour, so it stays out of the accessibility tree.
export function Drone({ lines, web }: { lines: Record<Stop, string>; web: Record<Stop, string> }) {
  const still = useStill()
  const { stop, line, talking, setTalking, typed, say } = useSpeech(DRONE_STOPS, lines)
  const { fly, away, lane, sway, dockRight } = useLane(still)
  const hit = useWebHit()
  const [tingle, setTingle] = useState(false)
  const { scrollY, scrollYProgress: p } = useScroll()
  const speed = useVelocity(scrollY)

  useEffect(() => {
    if (hit) say(web[hit.stop])
  }, [hit, web, say])

  // Flight path: loose loops down the gutter. Sideways it stays inside the gutter; up and down it is sprung so it lags.
  const left = useTransform([p, lane, sway], ([v, l, s]: number[]) => `${l + Math.sin(v * Math.PI * 9) * s}px`)
  const fy = useTransform(p, (v) => 26 + (Math.cos(v * Math.PI * 6) * 0.5 + 0.5) * 42)
  const top = useTransform(useSpring(fy, { stiffness: 38, damping: 13 }), (v) => `${v}%`)
  const lean = useSpring(useTransform(speed, [-3000, 0, 3000], [-18, 0, 18]), { stiffness: 120, damping: 12 })

  useMotionValueEvent(speed, 'change', (v) => {
    if (still) return
    if (Math.abs(v) > 2200) setTingle(true)
    else if (Math.abs(v) < 300) setTingle(false)
  })

  return (
    <>
      <Dialogue line={line} typed={typed} talking={talking} still={still} />

      <motion.div
        aria-hidden
        animate={{ opacity: away ? 0 : 1 }}
        // Docked: explicit 'auto' clears the flight position framer wrote before.
        style={fly ? { left, top, right: 'auto' } : { left: 'auto', top: 'auto', right: dockRight }}
        className={`fixed z-40 ${away ? 'pointer-events-none' : ''} ${fly ? '-translate-x-1/2 -translate-y-1/2' : 'bottom-4'}`}
      >
        <motion.button
          id={away ? undefined : 'byte'}
          type="button"
          tabIndex={-1}
          aria-label="Byte"
          onMouseEnter={() => setTalking(true)}
          onClick={() => setTalking((t) => !t)}
          key={fly ? stop : 'dock'}
          initial={still ? false : { y: -14, scale: 0.9 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 12 }}
          style={fly ? { rotate: lean } : { rotate: 0 }}
          className={
            fly
              ? 'relative block w-14'
              : 'grid size-10 place-items-center rounded-full border border-line bg-paper/90 backdrop-blur-sm transition-colors hover:border-ink'
          }
        >
          <span className={fly ? 'block animate-[float_3.2s_ease-in-out_infinite]' : 'block w-7'}>
            <ByteSvg still={still} tingle={tingle && fly} />
          </span>
        </motion.button>
      </motion.div>
    </>
  )
}
