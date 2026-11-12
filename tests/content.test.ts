import { test } from 'node:test'
import assert from 'node:assert/strict'
import { projects, getProject } from '../content/projects.ts'
import { skills } from '../content/skills.ts'
import { FORBIDDEN } from './forbidden.ts'

test('featured projects keep the fixed reel order', () => {
  assert.deepEqual(projects.map((p) => p.slug), ['pathpals', 'manager', 'budget-builder', 'geekhatch'])
  projects.forEach((p, i) => assert.equal(p.reel, i + 1))
})

test('private projects never link to source', () => {
  for (const slug of ['pathpals', 'budget-builder', 'geekhatch']) assert.deepEqual(getProject(slug)?.repoUrls, [])
  assert.equal(getProject('pathpals')?.demoUrl, null)
  assert.equal(getProject('geekhatch')?.demoUrl, 'https://geekhatch.com')
  assert.equal(getProject('budget-builder')?.demoUrl, 'https://budgetb-gamma.vercel.app')
  assert.equal(getProject('manager')?.demoUrl, 'https://manager-front-end.vercel.app')
})

test('getProject returns undefined for unknown slugs', () => {
  assert.equal(getProject('pathpals-v2'), undefined)
})

test('content has no forbidden strings', () => {
  const text = (JSON.stringify(projects) + JSON.stringify(skills)).toLowerCase()
  for (const bad of FORBIDDEN) assert.ok(!text.includes(bad), `content contains "${bad}"`)
})

test('every localized field has en and pt text', () => {
  const walk = (v: unknown, path: string): void => {
    if (!v || typeof v !== 'object') return
    if ('en' in v && 'pt' in v) {
      const l = v as { en: string; pt: string }
      assert.ok(l.en.trim() && l.pt.trim(), `empty translation at ${path}`)
      return
    }
    for (const [k, child] of Object.entries(v)) walk(child, `${path}.${k}`)
  }
  walk(projects, 'projects')
})

test('skills point at real projects and used skills have evidence', () => {
  const slugs = new Set(projects.map((p) => p.slug))
  for (const s of skills) {
    for (const e of s.evidence) assert.ok(slugs.has(e), `${s.name} → unknown ${e}`)
    if (s.label === 'used') assert.ok(s.evidence.length > 0, `${s.name} has no evidence`)
  }
})
