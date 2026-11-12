'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { REST, useStill } from '../motion/useStill'

// The last scene: night, Ruben at his desk at home, working with his AI while the city's windows light up as you scroll.
// Original line art: a person seen from behind, a monitor, a small floating AI companion and a web drawn on a poster.
// No film imagery. The room and the city sit on two parallax depths.
const WINDOWS = Array.from({ length: 26 }, (_, i) => {
  const b = i % 5
  return { x: 470 + b * 56 + (i % 3) * 9, y: 150 + Math.floor(i / 5) * 26 + (b % 2) * 8, on: ((i * 7) % 26) / 26 }
})
const BUILDINGS = [
  [452, 120, 48], [504, 92, 50], [560, 140, 44], [608, 104, 52], [664, 128, 56], [724, 150, 40],
]
const LINE = '#ECEAE3'
const DARK = '#0F1322'
const WEB = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2)
const r2 = (n: number) => Math.round(n * 100) / 100

function Light({ x, y, on, p }: { x: number; y: number; on: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, (v) => (v > on ? 1 : 0.08))
  return <motion.rect data-reveal x={x} y={y} width={10} height={12} rx={1.5} fill="#F2C230" style={{ opacity }} />
}

export function NightScene({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'center 45%'] })
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const cityY = useTransform(pass, [0, 1], [-18, 18])

  return (
    <div ref={ref} role="img" aria-label={label} className="relative">
      <svg viewBox="0 0 800 460" className="block h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <radialGradient id="screen" cx="50%" cy="60%" r="70%">
            <stop offset="0" stopColor="#8DD2FF" stopOpacity="0.35" />
            <stop offset="1" stopColor="#8DD2FF" stopOpacity="0" />
          </radialGradient>
          <clipPath id="window">
            <rect x="440" y="36" width="330" height="270" />
          </clipPath>
        </defs>

        <rect width="800" height="460" fill="#1A2034" />

        {/* window onto the city: the skyline drifts on its own depth */}
        <rect x="440" y="36" width="330" height="270" fill={DARK} />
        <g clipPath="url(#window)">
          <motion.g style={still ? REST : { y: cityY }}>
            <circle cx="700" cy="88" r="24" fill={LINE} opacity="0.9" />
            {BUILDINGS.map(([x, top, w]) => (
              <rect key={x} x={x} y={top} width={w} height={330 - top} fill="#0A0D18" stroke={LINE} strokeOpacity="0.25" strokeWidth="1.5" />
            ))}
            {WINDOWS.map((w, i) => (still ? <rect key={i} x={w.x} y={w.y} width={10} height={12} rx={1.5} fill="#F2C230" /> : <Light key={i} {...w} p={scrollYProgress} />))}
          </motion.g>
        </g>
        <rect x="440" y="36" width="330" height="270" stroke={LINE} strokeOpacity="0.6" strokeWidth="2" />
        <path d="M605 36 V306 M440 171 H770" stroke={LINE} strokeOpacity="0.6" strokeWidth="2" />

        {/* wall poster: a web, drawn in thin lines */}
        <g transform="translate(120 112)" stroke={LINE} strokeOpacity="0.55" strokeWidth="1.2">
          <rect x="-52" y="-66" width="104" height="132" />
          {WEB.map((a) => (
            <line key={a} x1={0} y1={0} x2={r2(Math.cos(a) * 46)} y2={r2(Math.sin(a) * 46)} />
          ))}
          {[12, 24, 36].map((r) => (
            <polygon key={r} points={WEB.map((a) => `${r2(Math.cos(a) * r)},${r2(Math.sin(a) * r)}`).join(' ')} />
          ))}
          <circle cx={0} cy={0} r={3} fill="#E0241B" stroke="none" />
        </g>

        {/* desk lamp light */}
        <polygon points="250,150 170,330 380,330" fill="#F2C230" opacity="0.07" />
        <path d="M250 150 l-20 -40 l50 -10 Z" stroke={LINE} strokeWidth="2" />

        {/* desk */}
        <path d="M40 330 H760 M40 352 H760 M79 352 V460 M719 352 V460" stroke={LINE} strokeOpacity="0.7" strokeWidth="2" />

        {/* monitor glow + monitor with code */}
        <ellipse cx="380" cy="250" rx="190" ry="120" fill="url(#screen)" />
        <rect x="290" y="190" width="190" height="122" rx="8" fill={DARK} stroke={LINE} strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((l) => (
          <rect key={l} x={304 + (l % 3) * 10} y={206 + l * 16} width={60 + ((l * 37) % 90)} height="5" rx="2.5" fill={['#8DD2FF', LINE, '#8DD2FF', '#E0241B'][l % 4]} opacity="0.75" />
        ))}
        <path d="M385 312 V330" stroke={LINE} strokeWidth="2" />

        {/* the AI companion, floating beside the monitor */}
        <g style={still ? undefined : { animation: 'type 1.8s ease-in-out infinite' }}>
          <circle cx="560" cy="246" r="46" fill="#8DD2FF" opacity="0.12" />
          <rect x="526" y="220" width="68" height="52" rx="18" fill={DARK} stroke={LINE} strokeWidth="2" />
          <g style={{ transformOrigin: '560px 246px', animation: still ? undefined : 'blink 4s steps(1) infinite' }}>
            <ellipse cx="549" cy="246" rx="4.5" ry="6.5" fill="#8DD2FF" />
            <ellipse cx="571" cy="246" rx="4.5" ry="6.5" fill="#8DD2FF" />
          </g>
          <path d="M560 220 v-12" stroke={LINE} strokeWidth="2" />
          <circle cx="560" cy="204" r="4" fill="#E0241B" />
        </g>

        {/* Ruben from behind, at the keyboard */}
        <rect x="130" y="300" width="150" height="160" rx="18" fill={DARK} stroke={LINE} strokeOpacity="0.5" strokeWidth="2" />
        <g style={still ? undefined : { animation: 'type 0.6s ease-in-out infinite' }}>
          <path d="M150 318 Q180 296 236 304 L290 322 L284 336 L232 322 Q190 320 160 334 Z" fill={DARK} stroke={LINE} strokeWidth="2" />
        </g>
        <path d="M140 300 Q205 250 270 300 L262 420 Q205 432 148 420 Z" fill={DARK} stroke={LINE} strokeWidth="2" />
        <path d="M165 296 Q205 268 245 296" stroke={LINE} strokeWidth="2" />
        <ellipse cx="205" cy="246" rx="34" ry="38" fill={DARK} stroke={LINE} strokeWidth="2" />
        {[[178, 228, 15], [194, 214, 17], [214, 210, 17], [232, 222, 15], [184, 250, 13], [228, 248, 13], [205, 232, 18], [205, 262, 14]].map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={DARK} stroke={LINE} strokeWidth="2" />
        ))}
      </svg>
    </div>
  )
}
