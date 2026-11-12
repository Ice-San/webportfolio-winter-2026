import { ImageResponse } from 'next/og'
import { locales } from '@/lib/i18n'
import { getDictionary } from './dictionaries'

export const alt = 'Ruben Costa'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

// Share card in the site's minimal style: paper ground, the name large, the role as a line of code, one red thread.
// System font only, so the build needs no font fetch.
// next/root-params isn't supported in route handlers yet, so the locale comes from params.
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const dict = await getDictionary((await params).lang)
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: '#F6F5F1', color: '#111110' }}>
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: '#BA1C14' }}>{`// ${dict.cover.kicker.toUpperCase()}`}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 150, fontWeight: 600, letterSpacing: -7, lineHeight: 0.9 }}>Ruben Costa</div>
          <div style={{ display: 'flex', fontSize: 34 }}>
            <span style={{ color: '#66645E' }}>{'<'}</span>
            {'Developer role='}
            <span style={{ color: '#BA1C14' }}>{`"${dict.cover.role}"`}</span>
            <span style={{ color: '#66645E' }}>{' />'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 28, color: '#66645E' }}>
          <div style={{ width: 120, height: 2, background: '#E0241B' }} />
          {dict.cover.headline}
        </div>
      </div>
    ),
    size,
  )
}
