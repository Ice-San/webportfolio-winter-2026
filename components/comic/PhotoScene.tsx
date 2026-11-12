'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { shots } from '@/content/images'
import { REST, useStill } from '../motion/useStill'
import { ByteSvg } from '../eggs/drone/ByteSvg'

// The last scene: Ruben's real desk at night, with Byte (the same drone that flies the page) hovering beside him.
// The frame keeps the photo's own 4:1 shape (nothing cropped); Byte rises over it and its glow pulses on its own.
// id="byte-home" tells the flying Byte to step out while this one is on screen, so there are never two.
export function PhotoScene({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const botY = useTransform(pass, [0, 1], ['40%', '-40%']) // of Byte's own height, so it scales with the strip

  return (
    <div ref={ref} className="relative aspect-[4/1] overflow-hidden">
      <Image src={shots.coding} alt={label} fill placeholder="blur" sizes="(min-width: 1152px) 72rem, 100vw" className="object-cover" />
      {/* Night grade: the left falls off into the dark the companion floats in. */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_19_34/0.92)_0%,rgb(15_19_34/0.35)_45%,rgb(15_19_34/0.15)_100%)]" />

      <motion.div id="byte-home" aria-hidden style={still ? REST : { y: botY }} className="absolute left-[10%] top-[22%] w-[10%] max-w-28">
        <div className="absolute inset-[-35%] rounded-full bg-[radial-gradient(closest-side,rgb(246_245_241/0.22),transparent)] motion-safe:animate-pulse" />
        <div className={still ? 'relative' : 'relative motion-safe:animate-[float_4s_ease-in-out_infinite]'}>
          <ByteSvg still={still} tingle={false} ink="#ECEAE3" />
        </div>
      </motion.div>
    </div>
  )
}
