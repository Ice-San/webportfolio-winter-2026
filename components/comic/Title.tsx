'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInOut } from '../motion/Scroll'
import { REST, useStill } from '../motion/useStill'

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 }

// A heading that rises in as it enters and lifts away as it leaves.
export function Title({
  as = 'h2',
  className = '',
  id,
  children,
}: {
  as?: keyof typeof tags
  className?: string
  id?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { opacity, y } = useInOut(ref, 40)
  const M = tags[as]
  return (
    <div ref={ref}>
      <M id={id} data-reveal style={still ? REST : { opacity, y }} className={`title ${className}`}>
        {children}
      </M>
    </div>
  )
}
