'use client'
import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { RotateCcw } from 'lucide-react'
import { SAVE_KEY } from './ReturnByDeath'

const savedId = () => {
  try {
    return sessionStorage.getItem(SAVE_KEY) ?? ''
  } catch {
    return ''
  }
}

// The 404 button returns you to the last save point you crossed this visit (or the cover, if none).
export function RewindLink({ lang, label }: { lang: string; label: string }) {
  const save = useSyncExternalStore(
    () => () => {},
    savedId,
    () => '',
  )
  return (
    <Link href={`/${lang}${save ? `#${save}` : ''}`} className="btn relative w-fit border-night-fg bg-night-fg text-night hover:border-red hover:bg-red hover:text-paper">
      <RotateCcw aria-hidden className="size-4" />
      {label}
    </Link>
  )
}
