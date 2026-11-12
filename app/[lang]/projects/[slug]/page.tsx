import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getDictionary } from '../../dictionaries'
import { getProject, projects } from '@/content/projects'
import type { Locale } from '@/lib/i18n'
import { Scene } from '@/components/Scene'
import { Stamp } from '@/components/Stamp'
import { ProjectLinks } from '@/components/ProjectLinks'
import { CaseSection } from '@/components/CaseSection'
import { Screenshot } from '@/components/Screenshot'
import { projectShots } from '@/content/images'
import { Title } from '@/components/comic/Title'
import { JsonLd } from '@/components/JsonLd'
import { NAME, SITE_URL } from '@/lib/site'

// Four known slugs, notFound() for the rest: the docs' blocking pattern (cacheComponents forbids dynamicParams).
export const instant = false

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/projects/[slug]'>, parent: ResolvingMetadata): Promise<Metadata> {
  const { lang, slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const dict = await getDictionary(lang)
  const title = `${project.title} · ${dict.meta.projectSuffix}`
  const description = project.summary[lang as Locale]
  const path = (l: string) => `/${l}/projects/${slug}`
  // Our own openGraph/twitter replace the layout's, so carry its share image over.
  const { openGraph, twitter } = await parent
  return {
    title,
    description,
    keywords: [project.title, ...project.technology.map((t) => t.name), NAME, ...dict.meta.keywords.slice(1, 3)],
    alternates: { canonical: path(lang), languages: { en: path('en'), pt: path('pt'), 'x-default': path('en') } },
    openGraph: { title, description, url: path(lang), siteName: NAME, locale: lang === 'pt' ? 'pt_PT' : 'en_US', type: 'article', images: openGraph?.images },
    twitter: { card: 'summary_large_image', title, description, images: twitter?.images },
  }
}

// A case study is that quest's full log: header, then one section per question.
export default async function CaseStudy({ params }: PageProps<'/[lang]/projects/[slug]'>) {
  const { lang: raw, slug } = await params
  const dict = await getDictionary(raw)
  const lang = raw as Locale
  const project = getProject(slug)
  if (!project) notFound()
  const t = dict.case
  const next = projects[project.reel] // reel is 1-based, so this is the following project
  const sections = [
    [t.idea, project.idea],
    [t.challenge, project.challenge],
    [t.approach, project.approach],
    [t.implementation, project.implementation],
  ] as const

  return (
    <main id="main">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.summary[lang],
          url: `${SITE_URL}/${lang}/projects/${slug}`,
          inLanguage: lang,
          keywords: project.technology.map((t) => t.name).join(', '),
          author: { '@type': 'Person', name: NAME, url: `${SITE_URL}/${lang}` },
          ...(project.demoUrl && { sameAs: project.demoUrl }),
        }}
      />
      <Scene id="case" label={project.title}>
        <article className="mx-auto grid max-w-6xl gap-12 px-4 pb-28 pt-12 sm:px-6">
          <header className="relative isolate grid gap-6">
            <span aria-hidden className="outline-num pointer-events-none absolute -top-4 right-0 -z-10 hidden select-none text-[clamp(9rem,26vw,20rem)] sm:block">
              0{project.reel}
            </span>
            <Link href={`/${lang}#issue-${project.slug}`} className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium hover:text-red-text">
              <ArrowLeft aria-hidden className="size-4" />
              {t.back}
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <p className="kicker">
                {dict.work.issue} 0{project.reel} <span className="text-muted">· {project.period}</span>
              </p>
              <Stamp tone={project.tone} label={project.status[lang]} />
            </div>
            <Title as="h1" className="text-[clamp(3rem,10vw,8rem)] [overflow-wrap:anywhere]">
              {project.title}
            </Title>
            <p className="max-w-[56ch] text-xl leading-relaxed text-muted">{project.summary[lang]}</p>
            <dl className="grid gap-x-8 gap-y-4 border-t border-ink pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="grid gap-1">
                <dt className="slate">{t.type}</dt>
                <dd className="font-medium">{project.type[lang]}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="slate">{t.status}</dt>
                <dd className="font-medium">{project.status[lang]}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="slate">{t.role}</dt>
                <dd className="font-medium">{t.roleValue}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="slate">{t.timeline}</dt>
                <dd className="font-mono font-medium">{project.period}</dd>
              </div>
            </dl>
            <ProjectLinks project={project} dict={dict} />
          </header>

          <Screenshot src={projectShots[project.slug].cover} alt={project.cover[lang]} sizes="(min-width: 1152px) 72rem, 100vw" priority />

          <div className="grid gap-8">
            {sections.map(([heading, body]) => (
              <CaseSection key={heading} heading={heading} body={body?.[lang] ?? null} />
            ))}
            <CaseSection heading={t.technology}>
              <dl className="grid gap-4">
                {project.technology.map((tech) => (
                  <div key={tech.name} className="grid gap-1 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="font-mono text-sm font-bold">{tech.name}</dt>
                    <dd className="text-muted">{tech.how[lang]}</dd>
                  </div>
                ))}
              </dl>
            </CaseSection>
            <CaseSection heading={t.result} body={project.result?.[lang] ?? null} />
            <CaseSection heading={t.learned} body={project.learned?.[lang] ?? null} />
          </div>

          {projectShots[project.slug].gallery.some(Boolean) && (
          <section aria-labelledby="gallery" className="grid gap-6">
            <h2 id="gallery" className="kicker">
              {t.gallery}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {project.gallery.map((g, i) => {
                const src = projectShots[project.slug].gallery[i]
                return src ? <Screenshot key={g.en} src={src} alt={g[lang]} sizes="(min-width: 640px) 36rem, 100vw" /> : null
              })}
            </div>
          </section>
          )}

          <nav aria-label={t.next}>
            <Link href={next ? `/${lang}/projects/${next.slug}` : `/${lang}#work`} className="group grid gap-2 border-t border-ink pt-8">
              <span className="slate">{next ? t.next : t.end}</span>
              <span className="title inline-flex items-center gap-4 text-[clamp(2rem,6vw,4.5rem)] transition-colors group-hover:text-red-text">
                {next ? next.title : dict.work.slate}
                <ArrowRight aria-hidden className="size-10 shrink-0" />
              </span>
            </Link>
          </nav>
        </article>
      </Scene>
    </main>
  )
}
