'use client'
import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useStill } from '../motion/useStill'
import { attempts, read, SAVE_KEY, write } from './return-by-death/storage'
import { useKonami } from './return-by-death/useKonami'
import { Hud } from './return-by-death/Hud'
import { DeathScreen } from './return-by-death/DeathScreen'

export { SAVE_KEY }

// Subaru's Return by Death as the page's game layer: save points record where you are, and dying
// (the HUD skull or the Konami code) glitches the page and rewinds you to the last save, one attempt later.
type Labels = { attempt: string; die: string; saved: string; died: string; returning: string; console: string }
type Death = { save: (id: string) => void; die: () => void }

const DeathContext = createContext<Death>({ save: () => {}, die: () => {} })
export const useDeath = () => useContext(DeathContext)

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

  useKonami(die)

  return (
    <DeathContext value={{ save, die }}>
      {children}
      <Hud attempt={attempt} toast={toast} onDie={die} labels={labels} />
      <DeathScreen dying={dying} still={still} labels={labels} />
    </DeathContext>
  )
}
