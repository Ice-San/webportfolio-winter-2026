import { projects } from '@/content/projects'
import { skills } from '@/content/skills'
import { EMAIL, GITHUB, LINKEDIN, NAME, SITE_URL } from '@/lib/site'
import en from '@/dictionaries/en.json'

// /llms.txt (llmstxt.org): a plain-text map of the whole site for AI assistants and crawlers, built from the same
// content as the pages so it never drifts.
export function GET() {
  const body = [
    `# ${NAME}`,
    '',
    `> ${en.meta.description}`,
    '',
    'A bilingual (English / Portuguese) portfolio told as a short anime-style series: how Ruben went from running an anime Discord community to building full-stack web apps, four projects with full case studies, his skills and how to contact him.',
    '',
    '## Pages',
    `- [Home, English](${SITE_URL}/en): the story, projects, skills and contact`,
    `- [Início, Português](${SITE_URL}/pt): a mesma página em português`,
    '',
    '## Projects',
    ...projects.map((p) => {
      const links = [p.demoUrl && `live demo: ${p.demoUrl}`, ...p.repoUrls.map((r) => `source: ${r}`)].filter(Boolean).join('; ')
      const stack = p.technology.map((t) => t.name).join(', ')
      return `- [${p.title}](${SITE_URL}/en/projects/${p.slug}) (${p.period}, ${p.status.en}): ${p.summary.en} Stack: ${stack}.${links ? ` ${links[0].toUpperCase()}${links.slice(1)}.` : ''}`
    }),
    '',
    '## Skills',
    `- Used in projects: ${skills.filter((s) => s.label === 'used').map((s) => s.name).join(', ')}`,
    `- Familiar or learning: ${skills.filter((s) => s.label !== 'used').map((s) => s.name).join(', ')}`,
    '',
    '## Contact',
    `- Email: ${EMAIL}`,
    `- GitHub: ${GITHUB}`,
    `- LinkedIn: ${LINKEDIN}`,
    `- [CV (PDF)](${SITE_URL}/cv-en.pdf)`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
