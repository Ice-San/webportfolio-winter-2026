'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStill } from '../motion/useStill'

// Easter egg: switch the web-shooter on in the nav, then click any empty spot to shoot a web line to it.
type Shot = { id: number; x: number; y: number; ox: number; oy: number }
const WebContext = createContext<{ on: boolean; toggle: () => void }>({ on: false, toggle: () => {} })

export function WebShooter({ sfx, children }: { sfx: string; children: React.ReactNode }) {
  const still = useStill()
  const [on, setOn] = useState(false)
  const [shots, setShots] = useState<Shot[]>([])

  useEffect(() => {
    if (!on) return
    document.documentElement.style.cursor = 'crosshair'
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, input, summary, label, [role="button"]')) return
      const id = e.timeStamp
      setShots((s) => [...s.slice(-4), { id, x: e.clientX, y: e.clientY, ox: innerWidth - 24, oy: innerHeight + 8 }])
      setTimeout(() => setShots((s) => s.filter((t) => t.id !== id)), 1400)
    }
    document.addEventListener('click', onClick)
    return () => {
      document.documentElement.style.cursor = ''
      document.removeEventListener('click', onClick)
    }
  }, [on])

  return (
    <WebContext value={{ on, toggle: () => setOn((v) => !v) }}>
      {children}
      <svg aria-hidden className="pointer-events-none fixed inset-0 z-[65] h-full w-full">
        <AnimatePresence>
          {shots.map((s) => (
            <motion.g key={s.id} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
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
              {/* the splat: spokes and two rings where the web lands */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <line
                  key={a}
                  x1={s.x}
                  y1={s.y}
                  x2={s.x + Math.cos((a * Math.PI) / 180) * 22}
                  y2={s.y + Math.sin((a * Math.PI) / 180) * 22}
                  stroke="#111110"
                  strokeWidth={0.8}
                />
              ))}
              <circle cx={s.x} cy={s.y} r={9} fill="none" stroke="#111110" strokeWidth={0.8} />
              <circle cx={s.x} cy={s.y} r={17} fill="none" stroke="#111110" strokeWidth={0.8} />
              <text x={s.x + 24} y={s.y - 14} fill="#BA1C14" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.12em' }}>
                {sfx}
              </text>
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>
    </WebContext>
  )
}

export function WebToggle({ label }: { label: string }) {
  const { on, toggle } = useContext(WebContext)
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={label}
      title={label}
      className={`grid min-h-10 min-w-10 place-items-center rounded-full border transition-colors ${on ? 'border-red bg-red text-paper' : 'border-line hover:border-ink'}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
        <path d="M12 6.5 15.9 8.1 17.5 12 15.9 15.9 12 17.5 8.1 15.9 6.5 12 8.1 8.1Z" />
        <path d="M12 9.5 13.8 10.2 14.5 12 13.8 13.8 12 14.5 10.2 13.8 9.5 12 10.2 10.2Z" />
      </svg>
    </button>
  )
}
