'use client'
import { motion } from 'framer-motion'
import { REST, useStill } from './useStill'

const tags = { div: motion.div, p: motion.p, li: motion.li }

// The one entrance used outside the set pieces. data-reveal lets the <noscript> style show it without JS.
export function Reveal({
  children,
  delay = 0,
  as = 'div',
  className,
}: {
  children: React.ReactNode
  delay?: number
  as?: keyof typeof tags
  className?: string
}) {
  const M = tags[as]
  const still = useStill()
  return (
    <M
      data-reveal
      className={className}
      animate={still ? REST : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={still ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}
