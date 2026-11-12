'use client'
import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useStill } from './motion/useStill'

// The header folds up into the top edge while you read down, and drops back when you scroll up, point at the top
// edge, or tab into it.
export function AutoHide({ className, children }: { className: string; children: React.ReactNode }) {
  const still = useStill()
  const { scrollY } = useScroll()
  const [away, setAway] = useState(false)
  const [held, setHeld] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const dy = y - (scrollY.getPrevious() ?? y)
    if (y < 96) setAway(false)
    else if (dy > 6) setAway(true)
    else if (dy < -6) setAway(false)
  })

  const shown = !away || held
  return (
    <>
      {/* While folded away, the top edge is a hover target that brings it back. */}
      {!shown && <div aria-hidden onMouseEnter={() => setHeld(true)} className="fixed inset-x-0 top-0 z-50 h-5" />}
      <motion.header
        initial={false}
        animate={shown ? { y: 0, scaleY: 1, opacity: 1 } : { y: '-100%', scaleY: 0.4, opacity: 0 }}
        transition={still ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
        style={{ originY: 0 }}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false)
        }}
        className={className}
      >
        {children}
      </motion.header>
    </>
  )
}
