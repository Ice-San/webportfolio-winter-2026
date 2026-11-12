'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { switchLocalePath, type Locale } from '@/lib/i18n'

export function LangSwitch({ lang, label, short }: { lang: Locale; label: string; short: string }) {
  const to: Locale = lang === 'en' ? 'pt' : 'en'
  return (
    <Link
      href={switchLocalePath(usePathname(), to)}
      hrefLang={to}
      lang={to}
      aria-label={label}
      className="grid min-h-10 min-w-10 place-items-center rounded-full border border-line font-mono text-xs font-bold tracking-widest transition-colors hover:border-ink"
    >
      {short}
    </Link>
  )
}
