import Link from 'next/link'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import { skills, type Skill } from '@/content/skills'
import { getProject } from '@/content/projects'
import { Title } from '../comic/Title'
import { InOut } from '../motion/Scroll'

const groups: Skill['group'][] = ['frontend', 'backend', 'data', 'practices']

// The skills, laid out like the index at the back of a book: the area on the left, then one row per skill with the
// projects that use it on the right. Evidence over claims: no meters, every skill links to where it was used.
export function Abilities({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.skills
  return (
    <div className="column grid gap-12">
      <header className="grid gap-5">
        <p className="kicker">{t.slate}</p>
        <Title className="text-[clamp(2.5rem,7vw,5.5rem)]">{t.title}</Title>
        <InOut>
          <p className="note max-w-[46ch] text-lg">{t.intro}</p>
        </InOut>
      </header>

      <div className="grid gap-10 border-t border-ink pt-2 lg:gap-0">
        {groups.map((g) => (
          <InOut key={g}>
            <section aria-labelledby={`set-${g}`} className="grid gap-2 lg:grid-cols-[14rem_minmax(0,1fr)] lg:border-b lg:border-line lg:py-6">
              <h3 id={`set-${g}`} className="pt-3 text-xl font-semibold tracking-tight">
                {t.groups[g]}
              </h3>
              <dl>
                {skills
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <div key={s.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3 last:border-b-0">
                      <dt className="font-medium">
                        {s.name}
                        {s.label !== 'used' && <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-wider text-red-text">{t.labels[s.label]}</span>}
                      </dt>
                      <dd className="text-sm text-muted">
                        <span className="sr-only">{t.usedIn} </span>
                        {s.evidence.map((slug, k) => (
                          <span key={slug}>
                            {k > 0 && <span aria-hidden> · </span>}
                            <Link href={`/${lang}/projects/${slug}`} className="underline decoration-line underline-offset-4 hover:text-red-text hover:decoration-current">
                              {getProject(slug)!.title}
                            </Link>
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
              </dl>
            </section>
          </InOut>
        ))}
      </div>
    </div>
  )
}
