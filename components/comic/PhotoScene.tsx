'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { shots } from '@/content/images'
import { REST, useStill } from '../motion/useStill'
import { ByteSvg } from '../eggs/drone/ByteSvg'

// The last scene: Ruben's real desk at night, with Byte (the same drone that flies the page) hovering beside him.
// Three depths: the photo drifts slowly, Byte rises faster, its glow pulses on its own. id="byte-home" tells the
// flying Byte to step out while this one is on screen, so there are never two.
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

      <motion.div id="byte-home" aria-hidden style={still ? REST : { y: botY }} className="absolute left-[8%] top-[24%] w-[18%] max-w-36 sm:left-[14%]">
        <div className="absolute inset-[-35%] rounded-full bg-[radial-gradient(closest-side,rgb(246_245_241/0.22),transparent)] motion-safe:animate-pulse" />
        <div className={still ? 'relative' : 'relative motion-safe:animate-[float_4s_ease-in-out_infinite]'}>
          <ByteSvg still={still} tingle={false} ink="#ECEAE3" />
        </div>
      </motion.div>
    </div>
  )
}
