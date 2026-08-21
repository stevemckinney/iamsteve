import assert from 'node:assert/strict'
import { test } from 'node:test'

import { NextRequest } from 'next/server'

import { proxy } from '@/proxy'

function request(url, headers = {}) {
  return proxy(new NextRequest(url, { headers }))
}

const markdown = { accept: 'text/markdown' }

test('markdown negotiation rewrites every content namespace', () => {
  const cases = [
    ['https://iamsteve.me/', '/api/content/home'],
    [
      'https://iamsteve.me/blog/kerning-vs-tracking',
      '/api/content/kerning-vs-tracking',
    ],
    ['https://iamsteve.me/notes/a-note', '/api/content/notes/a-note'],
    [
      'https://iamsteve.me/collections/0to255',
      '/api/content/collections/0to255',
    ],
    ['https://iamsteve.me/about', '/api/content/pages/about'],
    ['https://iamsteve.me/uses', '/api/content/pages/uses'],
  ]

  for (const [url, target] of cases) {
    const rewrite = request(url, markdown).headers.get('x-middleware-rewrite')
    assert.equal(
      new URL(rewrite).pathname,
      target,
      `${url} rewrote to ${rewrite}`
    )
  }
})

test('the .md suffix negotiates without an Accept header', () => {
  const rewrite = request(
    'https://iamsteve.me/blog/kerning-vs-tracking.md'
  ).headers.get('x-middleware-rewrite')

  assert.equal(new URL(rewrite).pathname, '/api/content/kerning-vs-tracking')
})

test('a negotiated rewrite still advertises the discovery links', () => {
  const response = request('https://iamsteve.me/', markdown)

  assert.match(response.headers.get('link'), /rel="service-desc"/)
  assert.match(
    response.headers.get('link'),
    /rel="https:\/\/llmstxt\.org\/rel\/llms"/
  )
})

test('markdown is only served when it is actually asked for', () => {
  for (const accept of [
    'text/html,application/xhtml+xml',
    'application/json',
    'text/markdownish',
    '*/*',
  ]) {
    const response = request('https://iamsteve.me/blog/a-post', { accept })
    assert.equal(
      response.headers.get('x-middleware-rewrite'),
      null,
      `"${accept}" should not negotiate markdown`
    )
  }
})

test('markdown wins when a browser-style Accept list includes it', () => {
  const rewrite = request('https://iamsteve.me/blog/a-post', {
    accept: 'text/html, text/markdown;q=0.9',
  }).headers.get('x-middleware-rewrite')

  assert.equal(new URL(rewrite).pathname, '/api/content/a-post')
})

test('a .md URL with no markdown representation answers in markdown', async () => {
  const response = request('https://iamsteve.me/nothing-here.md')

  assert.equal(response.status, 404)
  assert.equal(
    response.headers.get('content-type'),
    'text/markdown; charset=utf-8'
  )
  assert.equal(response.headers.get('vary'), 'Accept, Accept-Encoding')
  assert.match(await response.text(), /# 404 Not Found/)
})

test('removed URLs answer 410 with somewhere else to go', async () => {
  const response = request('https://iamsteve.me/portfolio')

  assert.equal(response.status, 410)
  assert.equal(
    response.headers.get('content-type'),
    'text/markdown; charset=utf-8'
  )

  const body = await response.text()
  assert.match(body, /# 410 Gone/)
  assert.match(body, /\/llms\.txt/)
})

test('removed prefixes answer 410 too', () => {
  assert.equal(request('https://iamsteve.me/Users/steve/secret').status, 410)
})

test('discovery links advertise the OpenAPI description', () => {
  const link = request('https://iamsteve.me/blog/a-post').headers.get('link')

  assert.match(link, /<\/openapi\.json>; rel="service-desc"/)
  assert.match(link, /rel="api-catalog"/)
  assert.match(link, /rel="sitemap"/)
})

test('tracking parameters are still stripped with a permanent redirect', () => {
  const response = request(
    'https://iamsteve.me/blog/a-post?utm_source=x&keep=1'
  )

  assert.equal(response.status, 301)

  const location = new URL(response.headers.get('location'))
  assert.equal(location.searchParams.get('utm_source'), null)
  assert.equal(location.searchParams.get('keep'), '1')
})

test('only the canonical host may be indexed', () => {
  assert.equal(
    request('https://preview.iamsteve.me/blog/a-post').headers.get(
      'x-robots-tag'
    ),
    'noindex'
  )
  assert.equal(
    request('https://iamsteve.me/blog/a-post').headers.get('x-robots-tag'),
    null
  )
})

test('files that answer for themselves are left alone', () => {
  for (const path of [
    '/.well-known/agent-skills/get-article-as-markdown/SKILL.md',
    '/api/content/a-post',
  ]) {
    const response = request(`https://iamsteve.me${path}`, markdown)
    assert.equal(response.status, 200, `${path} was intercepted`)
    assert.equal(
      response.headers.get('x-middleware-rewrite'),
      null,
      `${path} was rewritten`
    )
  }
})
