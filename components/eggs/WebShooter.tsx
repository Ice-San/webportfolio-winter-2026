'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useStill } from '../motion/useStill'
import { STOP_SELECTOR, type Stop } from './drone/stops'
import { Splat, type Shot } from './web-shooter/Splat'

// Easter egg: switch the web-shooter on in the nav, then click any empty spot to shoot a web to it. The web fires
// from Byte when it's on screen, and Byte explains the section it landed on (see Drone, `useWebHit`).
type Hit = { stop: Stop; at: number }
const WebContext = createContext<{ on: boolean; toggle: () => void; hit: Hit | null }>({ on: false, toggle: () => {}, hit: null })
export const useWebHit = () => useContext(WebContext).hit

export function WebShooter({ sfx, children }: { sfx: string; children: React.ReactNode }) {
  const still = useStill()
  const [on, setOn] = useState(false)
  const [shots, setShots] = useState<Shot[]>([])
  const [hit, setHit] = useState<Hit | null>(null)

  useEffect(() => {
    if (!on) return
    document.documentElement.style.cursor = 'crosshair'
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, input, summary, label, [role="button"]')) return
      const id = e.timeStamp
      const byte = document.getElementById('byte')?.getBoundingClientRect()
      const [ox, oy] = byte?.width ? [byte.left + byte.width / 2, byte.top + byte.height / 2] : [innerWidth - 24, innerHeight + 8]
      setShots((s) => [...s.slice(-4), { id, x: e.clientX, y: e.clientY, ox, oy }])
      setTimeout(() => setShots((s) => s.filter((t) => t.id !== id)), 1400)
      const section = target.closest(STOP_SELECTOR)
      if (section) setHit({ stop: section.id as Stop, at: id })
    }
    document.addEventListener('click', onClick)
    return () => {
      document.documentElement.style.cursor = ''
      document.removeEventListener('click', onClick)
    }
  }, [on])

  return (
    <WebContext value={{ on, toggle: () => setOn((v) => !v), hit }}>
      {children}
      <svg aria-hidden className="pointer-events-none fixed inset-0 z-[65] h-full w-full">
        <AnimatePresence>
          {shots.map((s) => (
            <Splat key={s.id} s={s} still={still} sfx={sfx} />
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
