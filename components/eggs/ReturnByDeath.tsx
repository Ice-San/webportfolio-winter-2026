'use client'
import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Save, Skull } from 'lucide-react'
import { useStill } from '../motion/useStill'

// Subaru's Return by Death as the page's game layer: save points record where you are, and dying
// (the HUD skull or the Konami code) glitches the page and rewinds you to the last save, one attempt later.
type Labels = { attempt: string; die: string; saved: string; died: string; returning: string; console: string }
type Death = { save: (id: string) => void; die: () => void }

const DeathContext = createContext<Death>({ save: () => {}, die: () => {} })
export const useDeath = () => useContext(DeathContext)

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']
export const SAVE_KEY = 'rc-save'
const ATTEMPT_KEY = 'rc-attempt'

// Storage can be blocked (private mode, sandboxed previews): the game still works, it just forgets.
const read = (k: string) => {
  try {
    return sessionStorage.getItem(k)
  } catch {
    return null
  }
}
const write = (k: string, v: string) => {
  try {
    sessionStorage.setItem(k, v)
  } catch {}
}

// The attempt count lives in sessionStorage (survives reloads in this visit), with a memory fallback when it's blocked.
let memAttempt = 1
const listeners = new Set<() => void>()
const attempts = {
  subscribe: (cb: () => void) => {
    listeners.add(cb)
    return () => listeners.delete(cb)
  },
  get: () => Number(read(ATTEMPT_KEY)) || memAttempt,
  bump: () => {
    memAttempt = attempts.get() + 1
    write(ATTEMPT_KEY, String(memAttempt))
    listeners.forEach((l) => l())
  },
}

export function ReturnByDeath({ labels, children }: { labels: Labels; children: React.ReactNode }) {
  const still = useStill()
  const attempt = useSyncExternalStore(attempts.subscribe, attempts.get, () => 1)
  const [dying, setDying] = useState(false)
  const [toast, setToast] = useState('')
  const last = useRef('top')
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    last.current = read(SAVE_KEY) ?? 'top'
    if (!read('rc-console')) {
      console.log('%c' + labels.console, 'font: 600 13px system-ui; color: #16120F; background: #F6C619; padding: 6px 10px; border: 2px solid #16120F')
      write('rc-console', '1')
    }
  }, [labels.console])

  const save = useCallback(
    (id: string) => {
      if (last.current === id) return
      last.current = id
      write(SAVE_KEY, id)
      setToast(labels.saved)
      clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToast(''), 1800)
    },
    [labels.saved],
  )

  const busy = useRef(false)
  const die = useCallback(() => {
    if (busy.current) return
    busy.current = true
    setDying(true)
    setTimeout(
      () => {
        const el = document.getElementById(last.current)
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
        else window.scrollTo({ top: 0, behavior: 'instant' })
        attempts.bump()
        setDying(false)
        busy.current = false
      },
      still ? 500 : 1700,
    )
  }, [still])

  useEffect(() => {
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input, textarea, select, [contenteditable="true"]')) return
      const k = e.key.toLowerCase()
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0
      if (i === KONAMI.length) {
        i = 0
        die()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [die])

  return (
    <DeathContext value={{ save, die }}>
      {children}

      <button
        type="button"
        onClick={die}
        aria-label={labels.die}
        className="fixed bottom-4 right-4 z-50 inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-paper/90 px-3.5 font-mono text-[0.6875rem] uppercase tracking-widest backdrop-blur-sm transition-colors hover:border-ink"
      >
        <Skull aria-hidden className="size-4" />
        {labels.attempt} #{String(attempt).padStart(2, '0')}
      </button>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.p
              key={toast + attempt}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-xs text-paper"
            >
              <Save aria-hidden className="size-4" />
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {dying && (
          <motion.div
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: still ? 0 : 0.25 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink text-night-fg"
          >
            {!still && (
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 6px, rgb(239 231 214 / 0.25) 6px 8px)',
                  animation: 'rewind 0.35s linear infinite',
                }}
              />
            )}
            <div className="relative grid justify-items-center gap-4 px-4 text-center">
              <p className="title text-[clamp(2.5rem,11vw,10rem)] text-red [overflow-wrap:anywhere]" style={still ? undefined : { animation: 'glitch 0.5s steps(4) 2' }}>
                {labels.died}
              </p>
              <p className="font-mono text-sm uppercase tracking-[0.2em]">◀◀ {labels.returning}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DeathContext>
  )
}
