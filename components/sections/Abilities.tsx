import Link from 'next/link'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import { skills, type Skill } from '@/content/skills'
import { getProject } from '@/content/projects'
import { Title } from '../comic/Title'
import { InOut } from '../motion/Scroll'

const groups: Skill['group'][] = ['frontend', 'backend', 'data', 'practices']

// A skill tree drawn like a file tree, one branch per area. Evidence over claims: no meters, every skill names its proof.
// Each branch rises in and drifts out on its own, slightly staggered.
export function Abilities({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.skills
  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-4 py-12 sm:px-6">
      <header className="grid gap-5">
        <p className="kicker">{t.slate}</p>
        <Title className="text-[clamp(2.5rem,7vw,5.5rem)]">{t.title}</Title>
        <InOut>
          <p className="note max-w-[46ch] text-lg">{t.intro}</p>
        </InOut>
      </header>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, gi) => {
          const list = skills.filter((s) => s.group === g)
          return (
            <InOut key={g} distance={60 + gi * 30}>
              <section aria-labelledby={`set-${g}`} className="grid content-start gap-4">
                <h3 id={`set-${g}`} className="grid gap-1 border-b border-ink pb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {t.set} 0{gi + 1}
                  </span>
                  <span className="text-xl font-semibold tracking-tight">{t.groups[g]}</span>
                </h3>
                <ul className="grid gap-4 font-mono text-sm">
                  {list.map((s, i) => (
                    <li key={s.name} className="grid grid-cols-[1.75rem_minmax(0,1fr)]">
                      <span aria-hidden className="text-muted">
                        {i === list.length - 1 ? '└─' : '├─'}
                      </span>
                      <div className="grid gap-1">
                        <p className="font-sans text-base font-semibold leading-snug">
                          {s.name}
                          {s.label !== 'used' && <span className="ml-2 align-middle text-[0.6875rem] uppercase tracking-wider text-red-text">{t.labels[s.label]}</span>}
                        </p>
                        <p className="font-sans text-sm text-muted">
                          {t.usedIn}{' '}
                          {s.evidence.map((slug, k) => (
                            <span key={slug}>
                              {k > 0 && ', '}
                              <Link href={`/${lang}/projects/${slug}`} className="text-ink underline decoration-line underline-offset-2 hover:text-red-text hover:decoration-current">
                                {getProject(slug)!.title}
                              </Link>
                            </span>
                          ))}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </InOut>
          )
        })}
      </div>
    </div>
  )
}
