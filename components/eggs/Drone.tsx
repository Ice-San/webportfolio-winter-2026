'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useMedia } from '../motion/frames'
import { useStill } from '../motion/useStill'

export const DRONE_STOPS = ['top', 'ch01', 'ch02', 'ch03', 'work', 'skills', 'offscreen', 'ch04', 'credits'] as const
type Stop = (typeof DRONE_STOPS)[number]

// Byte, the little drone that flies the whole page with the visitor and says one line per section. It weaves around
// the picture side of the screen (text lives on the left), trailing a little behind the scroll and leaning into it.
// A homemade spider-drone: red spider on the shell, and a spider-sense tingle when you scroll fast.
// What it says always lands in the same place: an RPG-style dialogue box at the bottom of the screen, typed out.
// Decorative: everything it says is flavour, so it stays out of the accessibility tree.
export function Drone({ lines }: { lines: Record<Stop, string> }) {
  const still = useStill()
  const [stop, setStop] = useState<Stop>('top')
  const [talking, setTalking] = useState(true)
  const [tingle, setTingle] = useState(false)
  const [typed, setTyped] = useState(0)
  const quiet = useRef<ReturnType<typeof setTimeout>>(undefined)
  const typing = useRef<ReturnType<typeof setInterval>>(undefined)
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

  // Whichever section crosses the middle of the screen is where Byte is. A new section: speak, then go quiet after
  // a few seconds so the line never sits over the content.
  useEffect(() => {
    let here: Stop = 'top'
    const speak = () => {
      const n = lines[here].length
      setTalking(true)
      setTyped(0)
      clearInterval(typing.current)
      typing.current = setInterval(() => setTyped((c) => (c >= n ? (clearInterval(typing.current), c) : c + 2)), 24)
      clearTimeout(quiet.current)
      quiet.current = setTimeout(() => setTalking(false), 8000)
    }
    speak()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || e.target.id === here) continue
          here = e.target.id as Stop
          setStop(here)
          speak()
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const id of DRONE_STOPS) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => {
      io.disconnect()
      clearTimeout(quiet.current)
      clearInterval(typing.current)
    }
  }, [lines])

  useMotionValueEvent(speed, 'change', (v) => {
    if (still) return
    if (Math.abs(v) > 2200) setTingle(true)
    else if (Math.abs(v) < 300) setTingle(false)
  })

  const done = still || typed >= lines[stop].length
  return (
    <>
      <AnimatePresence>
        {talking && (
          <motion.div
            aria-hidden
            initial={still ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? undefined : { opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-x-0 top-16 z-40 flex justify-center px-4 lg:inset-x-auto lg:bottom-[4.5rem] lg:right-4 lg:top-auto lg:px-0"
          >
            <div className="grid w-full max-w-md gap-1.5 rounded-2xl border border-ink bg-paper/95 px-4 py-3 shadow-[0_2px_0_var(--ink)] backdrop-blur-sm">
              <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-widest text-red-text">
                <span className="size-1.5 rounded-full bg-red" />
                Byte
              </p>
              <p className="min-h-[2.8em] text-sm leading-snug">
                {still ? lines[stop] : lines[stop].slice(0, typed)}
                {done && <span className="ml-1 inline-block text-red motion-safe:animate-bounce">▼</span>}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <svg viewBox="-34 -30 68 64" className="h-auto w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* spider-sense */}
            {tingle && (
              <g stroke="#E0241B" strokeWidth={1.6}>
                <path d="M-22 -22 l-6 -5 M-12 -27 l-2 -7 M12 -27 l2 -7 M22 -22 l6 -5" />
                <path d="M-27 -12 l-7 -1 M27 -12 l7 -1" />
              </g>
            )}
            {/* rotors */}
            <path d="M-20 -14 V-19 M20 -14 V-19" stroke="#111110" strokeWidth={1.6} />
            <g className={still ? '' : 'animate-[spin_0.35s_linear_infinite]'} style={{ transformOrigin: '-20px -20px', transformBox: 'view-box' }}>
              <path d="M-30 -20 H-10" stroke="#111110" strokeWidth={1.8} />
            </g>
            <g className={still ? '' : 'animate-[spin_0.35s_linear_infinite]'} style={{ transformOrigin: '20px -20px', transformBox: 'view-box' }}>
              <path d="M10 -20 H30" stroke="#111110" strokeWidth={1.8} />
            </g>
            <path d="M-20 -14 Q-12 -10 -8 -8 M20 -14 Q12 -10 8 -8" stroke="#111110" strokeWidth={1.6} />
            {/* shell with the spider */}
            <circle cx={0} cy={2} r={16} fill="#F6F5F1" stroke="#111110" strokeWidth={1.8} />
            <g stroke="#E0241B" strokeWidth={1.1}>
              <path d="M-2 -3 L-6 -7 L-7 -10 M-2.5 -1 L-7 -2 L-9 -5 M-2.5 1 L-7 3 L-8 6 M-2 3 L-5 6 L-5 9" />
              <path d="M2 -3 L6 -7 L7 -10 M2.5 -1 L7 -2 L9 -5 M2.5 1 L7 3 L8 6 M2 3 L5 6 L5 9" />
            </g>
            <ellipse cx={0} cy={0} rx={2.4} ry={4} fill="#E0241B" />
            {/* lens */}
            <path d="M-9 12 Q0 18 9 12" stroke="#111110" strokeWidth={1.6} />
            <circle cx={0} cy={14} r={2.2} fill="#2350D8" />
          </svg>
        </span>
      </motion.button>
      </motion.div>
    </>
  )
}
