'use client'
import { AnimatePresence, motion } from 'framer-motion'

// The full-screen "you died" card: VHS rewind lines and a glitching title while the page rewinds.
export function DeathScreen({ dying, still, labels }: { dying: boolean; still: boolean; labels: { died: string; returning: string } }) {
  return (
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
  )
}
