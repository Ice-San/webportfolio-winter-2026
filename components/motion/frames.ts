'use client'
import { useSyncExternalStore } from 'react'

// ponytail: v2's stepped "on twos" timing; only the unused v2 Sfx still imports it. Delete both together.
export const onTwos = (v: number, steps = 12) => Math.round(v * steps) / steps

// Media-query flag that matches the server render (false) during hydration.
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => matchMedia(query).matches,
    () => false,
  )
}
