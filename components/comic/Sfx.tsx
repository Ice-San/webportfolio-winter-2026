'use client'
import { motion } from 'framer-motion'
import { onTwos } from '../motion/frames'

// Sound-effect lettering. Decorative, so hidden from assistive tech; it pops in on stepped frames.
export function Sfx({ children, className = '', rotate = -8 }: { children: React.ReactNode; className?: string; rotate?: number }) {
  return (
    <motion.span
      aria-hidden
      data-reveal
      className={`sfx inline-block select-none ${className}`}
      initial={{ scale: 0.2, rotate: rotate - 25, opacity: 0 }}
      whileInView={{ scale: 1, rotate, opacity: 1 }}
      viewport={{ once: false, margin: '-15% 0px' }}
      transition={{ duration: 0.45, ease: (t: number) => onTwos(1 - Math.pow(1 - t, 3), 6) }}
    >
      {children}
    </motion.span>
  )
}
