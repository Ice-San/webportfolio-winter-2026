import type { StaticImageData } from 'next/image'
import anicolds from '@/public/anicolds.png'
import anicoldsSite from '@/public/anicolds-webpage.png'
import budgetb from '@/public/budgetb.png'
import geekhatch from '@/public/geekhatch-feed.png'
import manager from '@/public/manager.png'
import minecraft from '@/public/minecraft-server.webp'
import pathpals from '@/public/pathpals-landingpage.png'
import pathpalsRequests from '@/public/pathpals-requests-page.png'
import cafe from '@/public/ruben2.webp'
import coding from '@/public/ruben-coding.jpg'
import emiliaTan from '@/public/emilia-tan-bot.png'
import estela from '@/public/estela-bot.webp'
import type { Slug } from './projects'

// Static imports live here, not in projects.ts, so the content stays importable by the node tests.
export const shots = { anicolds, anicoldsSite, minecraft, cafe, coding, emiliaTan, estela }

// Per project: the cover, then gallery pictures in the same order as `gallery` (missing ones stay placeholders).
export const projectShots: Record<Slug, { cover: StaticImageData; gallery: (StaticImageData | undefined)[] }> = {
  pathpals: { cover: pathpals, gallery: [pathpalsRequests] },
  manager: { cover: manager, gallery: [] },
  'budget-builder': { cover: budgetb, gallery: [] },
  geekhatch: { cover: geekhatch, gallery: [] },
}
