import { ExternalLink, FolderGit2, Lock } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Project } from '@/content/projects'

// Demo and source links; private repos say so instead of linking.
export function ProjectLinks({ project, dict }: { project: Project; dict: Dictionary }) {
  const t = dict.work
  const link = 'inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-line underline-offset-4 hover:text-red-text hover:decoration-current'
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noreferrer" className={link}>
          <ExternalLink aria-hidden className="size-4" />
          {t.demo}
          <span className="sr-only">: {project.title}</span>
        </a>
      )}
      {project.repoUrls.map((url) => (
        <a key={url} href={url} target="_blank" rel="noreferrer" className={link}>
          <FolderGit2 aria-hidden className="size-4" />
          {t.source} · {url.split('/').pop()}
        </a>
      ))}
      {project.repoUrls.length === 0 && (
        <span className="inline-flex min-h-11 items-center gap-2 text-sm text-muted">
          <Lock aria-hidden className="size-4" />
          {project.demoUrl ? t.sourceNotPublic : t.notPublic}
        </span>
      )}
    </div>
  )
}
