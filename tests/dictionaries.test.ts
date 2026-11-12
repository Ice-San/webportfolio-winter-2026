import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { FORBIDDEN } from './forbidden.ts'

// Each locale is a folder of JSON files (one per page area), merged like dictionaries/<l>.ts does.
const dir = (l: string) => new URL(`../dictionaries/${l}/`, import.meta.url)
const files = (l: string) => readdirSync(dir(l)).filter((f) => f.endsWith('.json')).sort()
const load = (l: string) => Object.assign({}, ...files(l).map((f) => JSON.parse(readFileSync(new URL(f, dir(l)), 'utf8'))))

test('en and pt are split into the same files', () => {
  assert.ok(files('en').length > 0)
  assert.deepEqual(files('pt'), files('en'))
})

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
    for (const bad of FORBIDDEN) assert.ok(!text.includes(bad), `${l} copy contains "${bad}"`)
  }
})
