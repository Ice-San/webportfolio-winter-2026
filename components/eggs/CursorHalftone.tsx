'use client'
import { useEffect, useRef } from 'react'
import { useMedia } from '../motion/frames'
import { useStill } from '../motion/useStill'

// The cursor leaves a fading trail of Ben-Day dots, like ink from an offset press. Mouse only, never with reduced motion.
const STEP = 9
const RADIUS = 34
const LIFE = 650

export function CursorHalftone() {
  const ref = useRef<HTMLCanvasElement>(null)
  const still = useStill()
  const fine = useMedia('(pointer: fine)')

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || still || !fine) return
    let pts: { x: number; y: number; t: number }[] = []
    let raf = 0
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const frame = (now: number) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      pts = pts.filter((p) => now - p.t < LIFE)
      const cells = new Map<string, number>()
      for (const p of pts) {
        const fade = 1 - (now - p.t) / LIFE
        for (let gx = Math.floor((p.x - RADIUS) / STEP); gx <= Math.ceil((p.x + RADIUS) / STEP); gx++)
          for (let gy = Math.floor((p.y - RADIUS) / STEP); gy <= Math.ceil((p.y + RADIUS) / STEP); gy++) {
            const d = Math.hypot(gx * STEP - p.x, gy * STEP - p.y)
            if (d >= RADIUS) continue
            const key = `${gx},${gy}`
            cells.set(key, Math.max(cells.get(key) ?? 0, (1 - d / RADIUS) * fade))
          }
      }
      ctx.fillStyle = 'rgba(215, 38, 46, 0.5)'
      for (const [key, v] of cells) {
        const [gx, gy] = key.split(',').map(Number)
        ctx.beginPath()
        ctx.arc(gx * STEP, gy * STEP, v * STEP * 0.55, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = pts.length ? requestAnimationFrame(frame) : 0
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      if (pts.length > 28) pts.shift()
      if (!raf) raf = requestAnimationFrame(frame)
    }
    resize()
    addEventListener('resize', resize)
    addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onMove)
      ctx.clearRect(0, 0, innerWidth, innerHeight)
    }
  }, [still, fine])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[60] h-full w-full mix-blend-multiply" />
}
