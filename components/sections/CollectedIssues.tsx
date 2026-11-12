'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import { projects } from '@/content/projects'
import { Title } from '../comic/Title'
import { useMedia } from '../motion/frames'
import { useStill } from '../motion/useStill'
import { Placeholder } from '../Placeholder'
import { projectShots } from '@/content/images'
import { ProjectLinks } from '../ProjectLinks'
import { Stamp } from '../Stamp'

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
            <article
              key={p.slug}
              id={`issue-${p.slug}`}
              aria-labelledby={`${p.slug}-title`}
              className={`panel relative grid shrink-0 content-start gap-4 rounded-2xl p-5 transition-colors hover:border-ink sm:p-6 ${shelf ? 'w-[27rem]' : 'w-full max-w-xl'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                <p className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted">
                  {t.issue} 0{p.reel} · {p.period}
                </p>
                <Stamp tone={p.tone} label={p.status[lang]} />
              </div>
              <span aria-hidden className="outline-num pointer-events-none absolute -bottom-3 right-4 select-none text-[7rem]">
                0{p.reel}
              </span>
              {p.slug === 'geekhatch' && <p className="kicker">{t.payoff}</p>}
              <h3 id={`${p.slug}-title`} className="title text-[clamp(2rem,3.4vw,2.75rem)] [overflow-wrap:anywhere]">
                {p.title}
              </h3>
              <div className="overflow-hidden rounded-xl">
                <Placeholder description={p.cover[lang]} label={dict.common.image} src={projectShots[p.slug].cover} position="object-top" sizes="27rem" ratio="16/9" drift={!shelf} />
              </div>
              <p className="text-sm leading-relaxed text-muted">{p.summary[lang]}</p>
              <ul className="flex flex-wrap gap-1.5" aria-label={dict.case.technology}>
                {p.technology.slice(0, 6).map((tech) => (
                  <li key={tech.name} className="chip">
                    {tech.name}
                  </li>
                ))}
              </ul>
              <div className="relative grid gap-3">
                <Link href={`/${lang}/projects/${p.slug}`} className="btn btn-solid w-fit">
                  {t.caseStudy}
                  <span className="sr-only">: {p.title}</span>
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
                <ProjectLinks project={p} dict={dict} />
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
