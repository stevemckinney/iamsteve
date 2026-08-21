import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  recoveryLinks,
  notFoundMarkdown,
  goneMarkdown,
} from '@/lib/agent/not-found'

const origin = 'https://iamsteve.me'

test('recovery links are root-relative and described', () => {
  for (const link of recoveryLinks) {
    assert.ok(link.href.startsWith('/'), `${link.href} is not root-relative`)
    assert.ok(link.title.length > 0)
    assert.ok(link.description.length > 0)
  }
})

test('recovery links cover the indexes an agent needs', () => {
  const hrefs = recoveryLinks.map((link) => link.href)
  for (const href of [
    '/',
    '/blog',
    '/sitemap.xml',
    '/llms.txt',
    '/openapi.json',
    '/.well-known/api-catalog',
  ]) {
    assert.ok(hrefs.includes(href), `${href} is missing from the 404 body`)
  }
})

test('the 404 body names the path and links every index absolutely', () => {
  const body = notFoundMarkdown(origin, '/no-such-page')

  assert.match(body, /^---\n/)
  assert.match(body, /status: 404/)
  assert.match(body, /url: https:\/\/iamsteve\.me\/no-such-page/)
  assert.match(body, /^# 404 Not Found$/m)
  assert.match(body, /`\/no-such-page`/)
  assert.match(body, /^## Where to look next$/m)

  for (const link of recoveryLinks) {
    assert.ok(
      body.includes(`(${origin}${link.href})`),
      `${link.href} is not linked absolutely`
    )
  }
})

test('the 404 body explains how to ask for markdown', () => {
  const body = notFoundMarkdown(origin, '/no-such-page')

  assert.match(body, /Accept: text\/markdown/)
  assert.match(body, /\.md/)
  assert.match(body, /\/api\/content\/\{slug\}/)
  assert.match(body, /\/api\/content\/notes\/\{slug\}/)
  assert.match(body, /\/api\/content\/pages\/\{slug\}/)
  assert.match(body, /\/api\/content\/collections\/\{slug\}/)
})

test('the 410 body tells an agent to stop asking', () => {
  const body = goneMarkdown(origin, '/portfolio')

  assert.match(body, /status: 410/)
  assert.match(body, /^# 410 Gone$/m)
  assert.match(body, /Do not retry/)
  assert.match(body, /^## Where to look next$/m)
})

test('a body long enough to be worth parsing', () => {
  assert.ok(notFoundMarkdown(origin, '/x').length > 500)
})
