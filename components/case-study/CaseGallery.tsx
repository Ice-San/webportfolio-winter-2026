import type { Locale } from '@/lib/i18n'
import type { Project } from '@/content/projects'
import { projectShots } from '@/content/images'
import { Screenshot } from '../Screenshot'

// The extra screenshots under a case study. Hidden when the project has no gallery images yet.
export function CaseGallery({ project, heading, lang }: { project: Project; heading: string; lang: Locale }) {
  const shots = projectShots[project.slug].gallery
  if (!shots.some(Boolean)) return null
  return (
    <section aria-labelledby="gallery" className="grid gap-6">
      <h2 id="gallery" className="kicker">
        {heading}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {project.gallery.map((g, i) => {
          const src = shots[i]
          return src ? <Screenshot key={g.en} src={src} alt={g[lang]} sizes="(min-width: 640px) 36rem, 100vw" /> : null
        })}
      </div>
    </section>
  )
}
