'use client'
import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'
const subscribe = (cb: () => void) => {
  const m = matchMedia(query)
  m.addEventListener('change', cb)
  return () => m.removeEventListener('change', cb)
}

// Reduced-motion flag that matches the server render during hydration (framer's useReducedMotion reads it too early).
export const useStill = () => useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false)

// Motion off: hand framer explicit resting values. Passing `style={undefined}` would leave the server-rendered
// starting state (opacity 0, offset) stuck on the element, because framer never clears values it already wrote.
export const REST = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
