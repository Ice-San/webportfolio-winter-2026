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
  const still = useStill()
  const wide = useMedia('(min-width: 1024px)')
  const shelf = wide && !still
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const el = row.current
    if (!shelf || !el) return
    const measure = () => setDistance(Math.max(0, el.scrollWidth - innerWidth + 48))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [shelf])

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)

  return (
    <div ref={track} style={shelf ? { height: `calc(100svh + ${distance}px)` } : undefined}>
      <div className={shelf ? 'sticky top-14 flex h-[calc(100svh-3.5rem)] items-center overflow-hidden bg-paper' : 'py-8'}>
        <motion.div
          ref={row}
          style={shelf ? { x } : undefined}
          className={`flex gap-6 px-4 sm:px-6 ${shelf ? 'w-max items-stretch pl-[max(1.5rem,calc((100vw-72rem)/2))]' : 'mx-auto max-w-6xl flex-col'}`}
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
