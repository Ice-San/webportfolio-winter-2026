import Link from 'next/link'
import { FileDown, Menu } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import { AutoHide } from './AutoHide'
import { LangSwitch } from './LangSwitch'
import { MenuPanel } from './MenuPanel'
import { ByteSvg } from './eggs/drone/ByteSvg'
import { WebToggle } from './eggs/WebShooter'

// ponytail: one CV for both languages until public/cv-pt.pdf exists; then switch to `/cv-${lang}.pdf`.
export const CV_HREF = '/cv-en.pdf'

export const ROUND = 'grid min-h-10 min-w-10 place-items-center rounded-full border border-line transition-colors hover:border-ink'

export function Nav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.nav
  const links = [
    ['ch01', t.story],
    ['work', t.projects],
    ['skills', t.skills],
    ['ch04', t.now],
    ['credits', t.contact],
  ] as const
  const items = links.map(([id, label], i) => (
    <li key={id}>
      <Link href={`/${lang}#${id}`} className="flex items-baseline gap-1.5 py-2 font-medium hover:text-red-text">
        <span aria-hidden className="font-mono text-[0.625rem] text-muted">
          0{i + 1}
        </span>
        {label}
      </Link>
    </li>
  ))

  return (
    <AutoHide className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        {dict.common.skip}
      </a>
      <nav aria-label={t.menu} className="column flex h-14 items-center gap-2 sm:gap-3">
        <Link href={`/${lang}`} aria-label={t.home} className="flex items-center gap-2.5">
          {/* Byte is the site mark here and in the favicon (app/favicon.ico, icon.png, apple-icon.png). */}
          <span aria-hidden className="block w-10 shrink-0">
            <ByteSvg still tingle={false} />
          </span>
          <span className="hidden font-semibold tracking-tight sm:inline">Ruben Costa</span>
        </Link>
        <ul className="ml-auto hidden items-center gap-6 text-sm lg:flex">{items}</ul>
        <span className="ml-auto lg:ml-2">
          <WebToggle label={t.web} />
        </span>
        <a href={CV_HREF} download className={`gap-2 px-3 text-sm font-medium sm:flex ${ROUND}`}>
          <FileDown aria-hidden className="size-4" />
          <span className="sr-only sm:not-sr-only">{t.cv}</span>
        </a>
        <LangSwitch lang={lang} label={t.switchLabel} short={t.switchTo} />
        <details className="group relative lg:hidden">
          <summary className={`${ROUND} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
            <Menu aria-hidden className="size-4" />
            <span className="sr-only">{t.menu}</span>
          </summary>
          <MenuPanel>{items}</MenuPanel>
        </details>
      </nav>
    </AutoHide>
  )
}
