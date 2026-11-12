import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pickLocale, needsLocalePrefix, switchLocalePath } from '../lib/i18n.ts'

test('pickLocale follows Accept-Language order and falls back to en', () => {
  assert.equal(pickLocale('pt-PT,pt;q=0.9,en;q=0.8'), 'pt')
  assert.equal(pickLocale('en-US,en'), 'en')
  assert.equal(pickLocale('fr-FR,pt;q=0.5'), 'pt')
  assert.equal(pickLocale('en;q=0.3,pt;q=0.9'), 'pt')
  assert.equal(pickLocale(null), 'en')
  assert.equal(pickLocale('de'), 'en')
})

test('needsLocalePrefix skips locales, assets and internals', () => {
  assert.equal(needsLocalePrefix('/'), true)
  assert.equal(needsLocalePrefix('/projects/manager'), true)
  assert.equal(needsLocalePrefix('/en'), false)
  assert.equal(needsLocalePrefix('/pt/projects/x'), false)
  assert.equal(needsLocalePrefix('/cv-en.pdf'), false)
  assert.equal(needsLocalePrefix('/favicon.ico'), false)
  assert.equal(needsLocalePrefix('/_next/static/a.js'), false)
  assert.equal(needsLocalePrefix('/api/x'), false)
})

test('switchLocalePath swaps only the locale segment', () => {
  assert.equal(switchLocalePath('/en/projects/manager', 'pt'), '/pt/projects/manager')
  assert.equal(switchLocalePath('/pt', 'en'), '/en')
  assert.equal(switchLocalePath('/en/', 'pt'), '/pt/')
})
