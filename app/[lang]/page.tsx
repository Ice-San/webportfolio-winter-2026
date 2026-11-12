import { getDictionary } from './dictionaries'
import type { Locale } from '@/lib/i18n'
import { Scene } from '@/components/Scene'
import { Cover } from '@/components/sections/Cover'
import { StartingFromZero } from '@/components/sections/StartingFromZero'
import { WebSwing } from '@/components/sections/WebSwing'
import { TheServer } from '@/components/sections/TheServer'
import { SelfMade } from '@/components/sections/SelfMade'
import { CollectedIssues } from '@/components/sections/CollectedIssues'
import { Abilities } from '@/components/sections/Abilities'
import { OffPanel } from '@/components/sections/OffPanel'
import { BrandNewDay } from '@/components/sections/BrandNewDay'
import { SavePoint } from '@/components/eggs/SavePoint'
import { Drone } from '@/components/eggs/Drone'
import { JsonLd } from '@/components/JsonLd'
import { projects } from '@/content/projects'
import { skills } from '@/content/skills'
import { GITHUB, LINKEDIN, NAME, SITE_URL } from '@/lib/site'
import photo from '@/public/ruben1.webp'

// Issue #01, read top to bottom: cover → three origin pages → the collected issues → abilities → off-panel → brand new day.
export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang: raw } = await params
  const dict = await getDictionary(raw)
  const lang = raw as Locale
  const save = (id: string) => <SavePoint id={id} label={dict.save.label} sfx={dict.save.sfx} />

  return (
    <main id="main">
      {/* Who this site is about, for search engines: the person, the site, and the four projects. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': `${SITE_URL}/#person`,
              name: NAME,
              url: `${SITE_URL}/${lang}`,
              image: new URL(photo.src, SITE_URL).href,
              jobTitle: dict.cover.role,
              description: dict.meta.description,
              address: { '@type': 'PostalAddress', addressCountry: 'PT' },
              knowsAbout: skills.filter((s) => s.label === 'used').map((s) => s.name),
              sameAs: [GITHUB, LINKEDIN],
            },
            {
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              name: NAME,
              url: SITE_URL,
              inLanguage: ['en', 'pt'],
              author: { '@id': `${SITE_URL}/#person` },
            },
            ...projects.map((p) => ({
              '@type': 'CreativeWork',
              name: p.title,
              description: p.summary[lang],
              url: `${SITE_URL}/${lang}/projects/${p.slug}`,
              author: { '@id': `${SITE_URL}/#person` },
            })),
          ],
        }}
      />
      <Scene id="top" label={dict.cover.label}>
        <Cover dict={dict} />
      </Scene>
      <Scene id="ch01" label={dict.ch01.title}>
        <StartingFromZero dict={dict} />
        {save('save-ch01')}
      </Scene>
      <WebSwing sfx={dict.swing.sfx} label={dict.swing.toCh02} />
      <Scene id="ch02" label={dict.ch02.title}>
        <TheServer dict={dict} />
        {save('save-ch02')}
      </Scene>
      <Scene id="ch03" label={dict.ch03.title}>
        <SelfMade dict={dict} />
        {save('save-ch03')}
      </Scene>
      <WebSwing sfx={dict.swing.sfx} label={dict.swing.toWork} flip />
      <Scene id="work" label={dict.work.slate}>
        <CollectedIssues dict={dict} lang={lang} />
        {save('save-work')}
      </Scene>
      <Scene id="skills" label={dict.skills.slate}>
        <Abilities dict={dict} lang={lang} />
      </Scene>
      <Scene id="offscreen" label={dict.offscreen.slate}>
        <OffPanel dict={dict} />
      </Scene>
      <Scene id="ch04" label={dict.ch04.title}>
        <BrandNewDay dict={dict} />
      </Scene>
      <Drone lines={dict.drone} />
    </main>
  )
}
