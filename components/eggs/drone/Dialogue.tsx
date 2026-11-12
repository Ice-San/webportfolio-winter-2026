'use client'
import { AnimatePresence, motion } from 'framer-motion'

// What Byte says always lands in the same place: an RPG-style dialogue box, typed out `typed` characters at a time.
export function Dialogue({ line, typed, talking, still }: { line: string; typed: number; talking: boolean; still: boolean }) {
  const done = still || typed >= line.length
  return (
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
              {still ? line : line.slice(0, typed)}
              {done && <span className="ml-1 inline-block text-red motion-safe:animate-bounce">▼</span>}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
