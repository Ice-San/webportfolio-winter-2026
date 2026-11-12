import { lang } from 'next/root-params'
import { getDictionary } from './dictionaries'
import { Scene } from '@/components/Scene'
import { RewindLink } from '@/components/eggs/RewindLink'

// Return by Death: you died. The tape rewinds and the button takes you back to your last save point.
export default async function NotFound() {
  const locale = await lang()
  const t = (await getDictionary(locale)).notFound
  return (
    <main id="main">
      <Scene id="not-found" label={t.title} flush>
        <div className="column section-y grid min-h-[80svh] content-center">
          <div className="relative grid grid-cols-[minmax(0,1fr)] gap-6 overflow-hidden rounded-2xl bg-night p-6 text-night-fg sm:p-12">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20 motion-safe:animate-[rewind_0.6s_linear_infinite]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 6px, rgb(236 234 227 / 0.2) 6px 7px)' }}
            />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-glow">◀◀ {t.rewind} · 404 · {t.title}</p>
            <h1 className="title relative text-[clamp(2.5rem,11vw,10rem)] text-red [overflow-wrap:anywhere] motion-safe:animate-[glitch_0.5s_steps(4)_2]">{t.slate}</h1>
            <p className="relative text-xl text-night-fg/80">{t.line}</p>
            <RewindLink lang={locale} label={t.home} />
          </div>
        </div>
      </Scene>
    </main>
  )
}
