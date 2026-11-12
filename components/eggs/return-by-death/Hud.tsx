'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Save, Skull } from 'lucide-react'

// The game HUD: the skull button with the attempt count, and the "saved" toast above it.
export function Hud({ attempt, toast, onDie, labels }: { attempt: number; toast: string; onDie: () => void; labels: { attempt: string; die: string } }) {
  return (
    <>
      <button
        type="button"
        onClick={onDie}
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
    </>
  )
}
