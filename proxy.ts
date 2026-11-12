import { NextResponse, type NextRequest } from 'next/server'
import { needsLocalePrefix, pickLocale } from './lib/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!needsLocalePrefix(pathname)) return
  const locale = pickLocale(request.headers.get('accept-language'))
  return NextResponse.redirect(new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url))
}

export const config = {
  // File paths are skipped in needsLocalePrefix; a dot lookahead here stopped the proxy matching at all.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
