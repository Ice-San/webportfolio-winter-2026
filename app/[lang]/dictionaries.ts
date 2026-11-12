import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n'

const dictionaries = {
  en: () => import('@/dictionaries/en').then((m) => m.default),
  pt: () => import('@/dictionaries/pt').then((m) => m.default),
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>>

// cacheComponents forbids dynamicParams=false, so an unknown [lang] (e.g. /fr) is rejected here.
export const getDictionary = (locale: string): Promise<Dictionary> => {
  if (!isLocale(locale)) notFound()
  return dictionaries[locale]()
}
