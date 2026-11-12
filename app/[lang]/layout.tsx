import type { Metadata } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import { lang } from 'next/root-params'
import { Analytics } from '@vercel/analytics/next'
import { locales, type Locale } from '@/lib/i18n'
import { NAME, SITE_URL } from '@/lib/site'
import { MotionRoot } from '@/components/motion/MotionRoot'
import { Nav } from '@/components/Nav'
import { ReturnByDeath } from '@/components/eggs/ReturnByDeath'
import { WebShooter } from '@/components/eggs/WebShooter'
import { WebThread } from '@/components/eggs/WebThread'
import { getDictionary } from './dictionaries'
import '../globals.css'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

// Without JS nothing scrolls into place: show every block in its final spot and every sketch fully inked.
const noJs = '[data-reveal]{opacity:1!important;transform:none!important}[data-draw] *{stroke-dasharray:none!important;fill-opacity:1!important}'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang()
  const { meta } = await getDictionary(locale)
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: NAME, url: SITE_URL }],
    creator: NAME,
    alternates: { canonical: `/${locale}`, languages: { en: '/en', pt: '/pt', 'x-default': '/en' } },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      siteName: NAME,
      locale: locale === 'pt' ? 'pt_PT' : 'en_US',
      alternateLocale: locale === 'pt' ? 'en_US' : 'pt_PT',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
  }
}

export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const locale = await lang()
  const dict = await getDictionary(locale)
  return (
    <html lang={locale} className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
      <head>
        <noscript>
          <style>{noJs}</style>
        </noscript>
      </head>
      <body className="min-h-full">
        <MotionRoot>
          <ReturnByDeath labels={dict.hud}>
            <WebShooter sfx={dict.swing.sfx}>
              <Nav dict={dict} lang={locale as Locale} />
              {children}
            </WebShooter>
          </ReturnByDeath>
          <WebThread />
        </MotionRoot>
        <Analytics />
      </body>
    </html>
  )
}

export async function generateStaticParams() {
  return locales.map((l) => ({ lang: l }))
}
