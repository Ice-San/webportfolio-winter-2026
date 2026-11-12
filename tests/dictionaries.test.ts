import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { FORBIDDEN } from './forbidden.ts'

const load = (l: string) => JSON.parse(readFileSync(new URL(`../dictionaries/${l}.json`, import.meta.url), 'utf8'))

function flatten(o: unknown, prefix = ''): [string, unknown][] {
  if (o === null || typeof o !== 'object') return [[prefix, o]]
  return Object.entries(o).flatMap(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k))
}

test('en and pt dictionaries have identical keys', () => {
  const keys = (l: string) => flatten(load(l)).map(([k]) => k).sort()
  assert.deepEqual(keys('pt'), keys('en'))
})

test('dictionaries contain no forbidden strings', () => {
  for (const l of ['en', 'pt']) {
    const text = JSON.stringify(load(l)).toLowerCase()
    for (const bad of FORBIDDEN) assert.ok(!text.includes(bad), `${l}.json contains "${bad}"`)
  }
})
