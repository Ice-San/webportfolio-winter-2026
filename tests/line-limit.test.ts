import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'

// ESLint's max-lines only sees JS/TS; this keeps the 100-line house rule on styles and copy too.
const root = new URL('../', import.meta.url)
const files = (dir: string, ext: string) =>
  readdirSync(new URL(dir, root), { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith(ext))
    .map((f) => `${dir}${f.replaceAll('\\', '/')}`)

test('no CSS or dictionary file is over 100 lines', () => {
  const all = [...files('app/', '.css'), ...files('dictionaries/', '.json')]
  assert.ok(all.length > 0)
  for (const f of all) {
    const lines = readFileSync(new URL(f, root), 'utf8').trimEnd().split('\n').length
    assert.ok(lines <= 100, `${f} has ${lines} lines`)
  }
})
