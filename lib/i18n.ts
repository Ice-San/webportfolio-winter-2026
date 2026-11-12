// No imports: this module also runs under `node --test`.
export const locales = ['en', 'pt'] as const
export type Locale = (typeof locales)[number]

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x)
}

export function pickLocale(acceptLanguage: string | null): Locale {
  const tags = (acceptLanguage ?? '')
    .split(',')
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { lang: tag.split('-')[0].toLowerCase(), q: q ? Number(q.split('=')[1]) : 1, i }
    })
    .sort((a, b) => b.q - a.q || a.i - b.i)
  return tags.map((t) => t.lang).find(isLocale) ?? 'en'
}

export function needsLocalePrefix(pathname: string): boolean {
  const segments = pathname.split('/')
  if (['_next', 'api'].includes(segments[1])) return false
  if (segments.at(-1)?.includes('.')) return false
  return !isLocale(segments[1])
}

export function switchLocalePath(pathname: string, to: Locale): string {
  const segments = pathname.split('/')
  segments[1] = to
  return segments.join('/')
}
