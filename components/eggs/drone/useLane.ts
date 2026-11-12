'use client'
import { useEffect, useState } from 'react'
import { useMotionValue } from 'framer-motion'

const BYTE = 56 // flying width in px (w-14)
const MIN_GUTTER = BYTE + 24

// Where Byte may be, so it never covers text. It flies only in the empty gutter right of the content column
// (measured from a real .column). Where there's no such gutter (phones, tablets, small laptops), with reduced
// motion, or while the projects shelf (the one full-bleed section) is on screen, it docks in the HUD corner
// beside the Attempt pill. `away`: the last scene's own Byte (#byte-home) is on screen, so this one steps out.
export function useLane(still: boolean) {
  const lane = useMotionValue(0) // centre of the gutter, px
  const sway = useMotionValue(0) // how far it may drift sideways inside the gutter, px
  const [roomy, setRoomy] = useState(false)
  const [dockRight, setDockRight] = useState(176)
  const [seen, setSeen] = useState({ work: false, home: false })

  useEffect(() => {
    const measure = () => {
      const w = document.documentElement.clientWidth
      const col = document.querySelector('.column')
      if (col) {
        const right = col.getBoundingClientRect().right - parseFloat(getComputedStyle(col).paddingRight)
        const gutter = w - right
        lane.set(right + gutter / 2)
        sway.set(Math.max(0, (gutter - BYTE) / 2 - 8))
        setRoomy(gutter >= MIN_GUTTER)
      }
      const pill = document.getElementById('hud-attempt')
      if (pill) setDockRight(w - pill.getBoundingClientRect().left + 8)
    }
    measure()
    addEventListener('resize', measure)
    const io = new IntersectionObserver((entries) =>
      setSeen((s) => {
        const next = { ...s }
        for (const e of entries) next[e.target.id === 'work' ? 'work' : 'home'] = e.isIntersecting
        return next
      }),
    )
    for (const id of ['work', 'byte-home']) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => {
      removeEventListener('resize', measure)
      io.disconnect()
    }
  }, [lane, sway])

  return { fly: roomy && !still && !seen.work, away: seen.home, lane, sway, dockRight }
}
