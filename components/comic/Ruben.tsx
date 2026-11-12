'use client'
import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'

// Ruben, drawn from his photos: thick wavy brown hair with a fringe, a big grin, a white tee with an earphone cord,
// a hand-drawn red { } on the chest (the homemade suit) and red sneakers. Built from primitives so it can be inked line by line (`draw`) and posed for the web swing.
const C = {
  ink: '#16120F',
  skin: '#E8B088',
  hair: '#3A261B',
  hoodie: '#1F4FBF',
  hoodieDark: '#173B91',
  jeans: '#2A2E3B',
  shoe: '#D7262E',
  laptop: '#C9CDD3',
  white: '#FFFFFF',
  paper: '#F6F5F1',
}

// Line-art mode: paper fills and ink lines, keeping red only on the { } emblem and the sneakers.
const lineFill = (fill: string) => (fill === 'none' || fill === C.ink || fill === C.shoe ? fill : C.paper)
const lineStroke = (stroke: string) => (stroke === C.white ? C.ink : stroke)

type Shape =
  | { k: 'path'; d: string; fill: string; stroke?: string; w?: number }
  | { k: 'circle'; cx: number; cy: number; r: number; fill: string }
  | { k: 'ellipse'; cx: number; cy: number; rx: number; ry: number; fill: string }

// One full cap of hair, swept a little to his left, with a wavy fringe over the forehead.
const hair: Shape[] = [
  { k: 'path', d: 'M84 74 Q76 44 96 28 Q116 12 140 20 Q162 28 160 56 Q160 66 156 74 Q152 62 146 58 Q142 66 134 60 Q126 68 118 60 Q110 66 102 58 Q94 64 90 60 Q86 66 84 74 Z', fill: C.ink },
  { k: 'path', d: 'M98 36 Q112 26 124 34', fill: 'none', stroke: C.paper, w: 2 },
  { k: 'path', d: 'M128 28 Q142 26 150 38', fill: 'none', stroke: C.paper, w: 2 },
]

const body: Shape[] = [
  { k: 'path', d: 'M84 120 Q120 92 156 120 L150 132 Q120 116 90 132 Z', fill: C.hoodieDark },
  { k: 'path', d: 'M86 212 L120 216 L115 300 L94 300 Z', fill: C.jeans },
  { k: 'path', d: 'M120 216 L156 212 L146 300 L125 300 Z', fill: C.jeans },
  { k: 'path', d: 'M80 300 Q80 288 96 290 L116 292 Q122 300 118 310 L82 310 Q78 306 80 300 Z', fill: C.shoe },
  { k: 'path', d: 'M124 292 L144 290 Q160 288 160 300 Q162 306 158 310 L122 310 Q118 300 124 292 Z', fill: C.shoe },
  { k: 'path', d: 'M80 124 Q120 108 160 124 L168 214 Q120 226 72 214 Z', fill: C.hoodie },
  { k: 'path', d: 'M106 120 Q120 132 134 120', fill: 'none' },
  { k: 'path', d: 'M108 124 Q102 170 108 212', fill: 'none', w: 1.6 },
  { k: 'path', d: 'M132 124 Q140 160 134 196', fill: 'none', w: 1.6 },
  { k: 'path', d: 'M112 150 Q104 150 106 158 Q107 164 102 166 Q107 168 106 174 Q104 182 112 182', fill: 'none', stroke: C.shoe, w: 4 },
  { k: 'path', d: 'M128 150 Q136 150 134 158 Q133 164 138 166 Q133 168 134 174 Q136 182 128 182', fill: 'none', stroke: C.shoe, w: 4 },
]

const heroArms: Shape[] = [
  { k: 'path', d: 'M82 126 Q62 142 60 202 L76 204 Q78 156 94 140 Z', fill: C.hoodie },
  { k: 'circle', cx: 68, cy: 208, r: 9, fill: C.skin },
  { k: 'path', d: 'M138 150 L190 162 L184 198 L132 186 Z', fill: C.laptop },
  { k: 'circle', cx: 161, cy: 175, r: 5, fill: C.shoe },
  { k: 'path', d: 'M158 126 Q182 142 180 188 L164 192 Q164 152 146 140 Z', fill: C.hoodie },
  { k: 'circle', cx: 172, cy: 194, r: 9, fill: C.skin },
]

const swingArms: Shape[] = [
  { k: 'path', d: 'M84 128 Q58 132 40 160 L52 172 Q70 150 92 144 Z', fill: C.hoodie },
  { k: 'circle', cx: 44, cy: 170, r: 9, fill: C.skin },
  { k: 'path', d: 'M150 130 Q168 84 170 34 L186 36 Q186 92 164 134 Z', fill: C.hoodie },
  { k: 'circle', cx: 178, cy: 28, r: 10, fill: C.skin },
]

const head: Shape[] = [
  { k: 'path', d: 'M111 100 L129 100 L129 116 L111 116 Z', fill: C.skin },
  { k: 'ellipse', cx: 86, cy: 74, rx: 6, ry: 9, fill: C.skin },
  { k: 'ellipse', cx: 154, cy: 74, rx: 6, ry: 9, fill: C.skin },
  { k: 'ellipse', cx: 120, cy: 72, rx: 34, ry: 38, fill: C.skin },
  ...hair,
  { k: 'path', d: 'M100 80 Q107 73 114 80', fill: 'none' },
  { k: 'path', d: 'M126 80 Q133 73 140 80', fill: 'none' },
  { k: 'path', d: 'M100 70 Q107 66 114 69', fill: 'none', w: 2.4 },
  { k: 'path', d: 'M126 69 Q133 66 140 70', fill: 'none', w: 2.4 },
  { k: 'path', d: 'M105 90 Q120 108 135 90 Q120 95 105 90 Z', fill: C.white },
  { k: 'path', d: 'M120 78 Q118 85 122 86', fill: 'none', w: 2 },
]

/** Where the raised hand is, in the 240×340 viewBox: the web line attaches here in the swing pose. */
export const HAND = { x: 178, y: 24 }

export function Ruben({
  pose = 'hero',
  draw,
  line = false,
  className,
}: {
  pose?: 'hero' | 'swing'
  draw?: MotionValue<number>
  line?: boolean
  className?: string
}) {
  const full = useMotionValue(1)
  const p = draw ?? full
  const fillOpacity = useTransform(p, [0.75, 1], [0, 1])
  const shapes = [...body, ...(pose === 'hero' ? heroArms : swingArms), ...head]
  // Always bound: with motion off the stand-in value is 1, which also clears a half-inked server render.
  const inked = { pathLength: p, fillOpacity }

  return (
    <svg
      viewBox="0 0 240 340"
      aria-hidden
      data-draw={draw ? '' : undefined}
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes.map((s, i) => {
        const stroke = s.k === 'path' && s.stroke ? s.stroke : C.ink
        const common = {
          fill: line ? lineFill(s.fill) : s.fill,
          stroke: line ? lineStroke(stroke) : stroke,
          strokeWidth: (s.k === 'path' && s.w ? s.w : 3) * (line ? 0.7 : 1),
          style: inked,
        }
        if (s.k === 'circle') return <motion.circle key={i} {...common} cx={s.cx} cy={s.cy} r={s.r} />
        if (s.k === 'ellipse') return <motion.ellipse key={i} {...common} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />
        return <motion.path key={i} {...common} d={s.d} />
      })}
    </svg>
  )
}
