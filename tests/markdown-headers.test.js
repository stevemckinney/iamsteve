import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  MARKDOWN_VARY,
  markdownHeaders,
  markdownNotFound,
} from '@/lib/agent/markdown'

test('markdown responses vary on Accept so caches keep the variants apart', () => {
  assert.equal(MARKDOWN_VARY, 'Accept, Accept-Encoding')
  assert.equal(markdownHeaders.Vary, MARKDOWN_VARY)
  assert.equal(markdownHeaders['Content-Type'], 'text/markdown; charset=utf-8')
})

test('a missing slug answers 404 in markdown, not HTML', async () => {
  const response = markdownNotFound('/blog/no-such-post')

  assert.equal(response.status, 404)
  assert.equal(
    response.headers.get('content-type'),
    'text/markdown; charset=utf-8'
  )
  assert.equal(response.headers.get('vary'), 'Accept, Accept-Encoding')
  assert.equal(response.headers.get('cache-control'), 'no-store')

  const body = await response.text()
  assert.match(body, /# 404 Not Found/)
  assert.match(body, /`\/blog\/no-such-post`/)
  assert.match(body, /https:\/\/iamsteve\.me\/llms\.txt/)
})
