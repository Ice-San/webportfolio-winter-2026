'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { shots } from '@/content/images'
import { REST, useStill } from '../motion/useStill'

const LINE = '#ECEAE3'
const DARK = '#0F1322'

// The last scene: Ruben's real desk at night, with the AI companion floating in the dark beside the monitor.
// Three depths: the photo drifts slowly, the companion rises faster, its glow pulses on its own.
export function PhotoScene({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(pass, [0, 1], ['-7%', '7%'])
  const botY = useTransform(pass, [0, 1], [70, -70])

  return (
    <div ref={ref} className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
      <motion.div style={still ? REST : { y: photoY }} className="absolute inset-x-0 -inset-y-[9%]">
        <Image
          src={shots.coding}
          alt={label}
          fill
          placeholder="blur"
          sizes="(min-width: 1152px) 72rem, 100vw"
          className="object-cover object-[72%_50%] lg:object-[60%_50%]"
        />
      </motion.div>
      {/* Night grade: the left falls off into the dark the companion floats in. */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_19_34/0.92)_0%,rgb(15_19_34/0.35)_45%,rgb(15_19_34/0.15)_100%)]" />

      <motion.div aria-hidden style={still ? REST : { y: botY }} className="absolute left-[8%] top-[22%] w-[22%] max-w-44 sm:left-[14%]">
        <div className={still ? '' : 'motion-safe:animate-[float_4s_ease-in-out_infinite]'}>
          <svg viewBox="0 0 120 120" className="h-auto w-full overflow-visible" fill="none" strokeLinecap="round">
            <circle cx="60" cy="66" r="54" fill="#8DD2FF" opacity="0.14" className="motion-safe:animate-pulse" />
            <path d="M60 34 v-14" stroke={LINE} strokeWidth="2.5" />
            <circle cx="60" cy="16" r="5" fill="#E0241B" />
            <rect x="22" y="34" width="76" height="60" rx="22" fill={DARK} stroke={LINE} strokeWidth="2.5" />
            <g style={{ transformOrigin: '60px 64px', animation: still ? undefined : 'blink 4s steps(1) infinite' }}>
              <ellipse cx="47" cy="64" rx="5.5" ry="8" fill="#8DD2FF" />
              <ellipse cx="73" cy="64" rx="5.5" ry="8" fill="#8DD2FF" />
            </g>
            <path d="M40 104 Q60 112 80 104" stroke="#8DD2FF" strokeOpacity="0.5" strokeWidth="2" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
