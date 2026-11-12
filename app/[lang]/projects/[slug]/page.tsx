import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '../../dictionaries'
import { getProject, projects } from '@/content/projects'
import type { Locale } from '@/lib/i18n'
import { Scene } from '@/components/Scene'
import { Screenshot } from '@/components/Screenshot'
import { projectShots } from '@/content/images'
import { JsonLd } from '@/components/JsonLd'
import { CaseHeader } from '@/components/case-study/CaseHeader'
import { CaseSection } from '@/components/case-study/CaseSection'
import { CaseGallery } from '@/components/case-study/CaseGallery'
import { NextProject } from '@/components/case-study/NextProject'
import { TechList } from '@/components/case-study/TechList'
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
          <CaseHeader project={project} dict={dict} lang={lang} />

          <Screenshot src={projectShots[project.slug].cover} alt={project.cover[lang]} sizes="(min-width: 1152px) 72rem, 100vw" priority />

          <div className="grid gap-8">
            {sections.map(([heading, body]) => (
              <CaseSection key={heading} heading={heading} body={body?.[lang] ?? null} />
            ))}
            <TechList project={project} heading={t.technology} lang={lang} />
            <CaseSection heading={t.result} body={project.result?.[lang] ?? null} />
            <CaseSection heading={t.learned} body={project.learned?.[lang] ?? null} />
          </div>

          <CaseGallery project={project} heading={t.gallery} lang={lang} />
          <NextProject next={next} dict={dict} lang={lang} />
        </article>
      </Scene>
    </main>
  )
}
