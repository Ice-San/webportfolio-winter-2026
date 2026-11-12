'use client'
import { useRef } from 'react'
import { motion, useTransform } from 'framer-motion'
import { useInOut } from '../motion/Scroll'
import { REST, useStill } from '../motion/useStill'

// A minimal manga panel (one hairline) that slides in from `from` as it enters and drifts out as it leaves.
// The wrapper is measured, the inner frame moves, so the transform never skews the scroll measurement.
export function Panel({
  from = {},
  night = false,
  bare = false,
  className = '',
  frameClassName = '',
  children,
}: {
  from?: { x?: number; y?: number }
  night?: boolean
  /** No border: for chat lines and notes that should still move in and out. */
  bare?: boolean
  className?: string
  frameClassName?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { enter, opacity, y } = useInOut(ref, from.y ?? 60)
  const x = useTransform(enter, [0, 1], [from.x ?? 0, 0])

  return (
    <div ref={ref} className={className}>
      <motion.div
        data-reveal
        style={still ? REST : { x, y, opacity }}
        className={`${bare ? '' : 'panel h-full'} ${night ? 'panel-night' : ''} ${frameClassName}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
