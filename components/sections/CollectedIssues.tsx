'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import { projects } from '@/content/projects'
import { Title } from '../comic/Title'
import { useMedia } from '../motion/useMedia'
import { useStill } from '../motion/useStill'
import { IssueCard } from './collected-issues/IssueCard'

// The work as a game quest log: on large screens the page pins and the four quests slide past sideways as you scroll down.
// Phones get the same cards stacked; there's no room for a shelf.
export function CollectedIssues({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.work
  const track = useRef<HTMLDivElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const col = useRef<HTMLDivElement>(null)
  const still = useStill()
  const wide = useMedia('(min-width: 1024px)')
  const shelf = wide && !still
  const [distance, setDistance] = useState(0)
  const [inset, setInset] = useState(0)

  useLayoutEffect(() => {
    const el = row.current
    const c = col.current
    if (!shelf || !el || !c) return
    // The shelf starts on the column's left edge and stops when the last card reaches its right edge,
    // measured from a real .column so it always matches the other sections.
    const measure = () => {
      const box = c.getBoundingClientRect()
      const pad = parseFloat(getComputedStyle(c).paddingLeft)
      setInset(box.left + pad)
      setDistance(Math.max(0, el.scrollWidth - (box.right - pad)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    ro.observe(c)
    return () => ro.disconnect()
  }, [shelf])

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)

  return (
    <div ref={track} style={shelf ? { height: `calc(100svh + ${distance}px)` } : undefined}>
      <div ref={col} aria-hidden className="column h-0" />
      <div className={shelf ? 'sticky top-14 flex h-[calc(100svh-3.5rem)] items-center overflow-hidden bg-paper' : undefined}>
        <motion.div
          ref={row}
          style={shelf ? { x, paddingLeft: inset } : undefined}
          className={`flex gap-6 ${shelf ? 'w-max items-stretch' : 'column flex-col'}`}
        >
          <header className={`grid content-center gap-5 ${shelf ? 'w-[26rem] shrink-0 pr-6' : ''}`}>
            <p className="kicker">
              {t.slate} <span className="text-muted">· 04</span>
            </p>
            <Title className="text-[clamp(2.5rem,5vw,4.25rem)]">{t.title}</Title>
            <p className="prose-story text-muted">
              {t.intro} {shelf && t.sideways}
            </p>
            <ol className="grid gap-1 font-mono text-sm">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${lang}/projects/${p.slug}`} className="inline-flex gap-3 py-1 hover:text-red-text">
                    <span className="text-muted">0{p.reel}</span>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ol>
          </header>

          {projects.map((p) => (
            <IssueCard key={p.slug} p={p} dict={dict} lang={lang} shelf={shelf} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
