import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { locales } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'

// Every page in both languages, each pointing at its translation so Google pairs them.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [{ path: '', priority: 1 }, ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: 0.8 }))]
  return paths.flatMap(({ path, priority }) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${path}`])) },
    })),
  )
}
