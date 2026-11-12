import Image from 'next/image'
import Link from 'next/link'
import { FileDown, Menu } from 'lucide-react'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/lib/i18n'
import { AutoHide } from './AutoHide'
import { LangSwitch } from './LangSwitch'
import { MenuPanel } from './MenuPanel'
import { WebToggle } from './eggs/WebShooter'
import face from '@/public/ruben-face.webp'

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
      <nav aria-label={t.menu} className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link href={`/${lang}`} aria-label={t.home} className="flex items-center gap-2.5">
          <Image src={face} alt="" width={36} height={36} priority className="size-9 rounded-full ring-1 ring-ink" />
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
