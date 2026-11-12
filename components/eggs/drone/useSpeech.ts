'use client'
import { useEffect, useRef, useState } from 'react'

// Whichever section crosses the middle of the screen is where Byte is. A new section: speak (typed out two characters
// at a time), then go quiet after a few seconds so the line never sits over the content.
export function useSpeech<S extends string>(stops: readonly S[], lines: Record<S, string>) {
  const [stop, setStop] = useState<S>(stops[0])
  const [talking, setTalking] = useState(true)
  const [typed, setTyped] = useState(0)
  const quiet = useRef<ReturnType<typeof setTimeout>>(undefined)
  const typing = useRef<ReturnType<typeof setInterval>>(undefined)

  useEffect(() => {
    let here = stops[0]
    const speak = () => {
      const n = lines[here].length
      setTalking(true)
      setTyped(0)
      clearInterval(typing.current)
      typing.current = setInterval(() => setTyped((c) => (c >= n ? (clearInterval(typing.current), c) : c + 2)), 24)
      clearTimeout(quiet.current)
      quiet.current = setTimeout(() => setTalking(false), 8000)
    }
    speak()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || e.target.id === here) continue
          here = e.target.id as S
          setStop(here)
          speak()
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const id of stops) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => {
      io.disconnect()
      clearTimeout(quiet.current)
      clearInterval(typing.current)
    }
  }, [stops, lines])

  return { stop, talking, setTalking, typed }
}
