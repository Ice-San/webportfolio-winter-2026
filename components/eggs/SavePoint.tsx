'use client'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { useDeath } from './ReturnByDeath'

// A game checkpoint between episodes: crossing it records it as the place Return by Death rewinds to.
// The diamond fills while you're on it.
export function SavePoint({ id, label, sfx }: { id: string; label: string; sfx: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const { save } = useDeath()
  useEffect(() => {
    if (inView) save(id)
  }, [inView, id, save])

  return (
    <div id={id} ref={ref} className="mx-auto flex max-w-6xl scroll-mt-24 items-center gap-3 px-4 py-4 sm:px-6">
      <span aria-hidden className={`size-2.5 shrink-0 rotate-45 border border-ink transition-colors duration-500 ${inView ? 'bg-red' : ''}`} />
      <span className="slate">{label}</span>
      <span aria-hidden className="h-px flex-1 bg-line" />
      <span aria-hidden className={`font-mono text-xs transition-opacity duration-500 ${inView ? 'text-red-text opacity-100' : 'opacity-0'}`}>
        {sfx}
      </span>
    </div>
  )
}
