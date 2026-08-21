import assert from 'node:assert/strict'
import { test } from 'node:test'

import { apiError } from '@/lib/agent/errors'

test('an error carries a code, a message, a hint and its status', async () => {
  const response = apiError({
    status: 400,
    code: 'EMAIL_REQUIRED',
    message: 'An email address is required to subscribe.',
    hint: 'Include an "email" field in the JSON body.',
  })

  assert.equal(response.status, 400)
  assert.equal(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
  assert.equal(response.headers.get('cache-control'), 'no-store')

  const { error } = await response.json()

  assert.equal(error.code, 'EMAIL_REQUIRED')
  assert.equal(error.message, 'An email address is required to subscribe.')
  assert.equal(error.hint, 'Include an "email" field in the JSON body.')
  assert.equal(error.status, 400)
  assert.equal(error.documentation, 'https://iamsteve.me/openapi.json')
})

test('extra headers are merged, not dropped', () => {
  const response = apiError({
    status: 404,
    code: 'NOT_FOUND',
    message: 'Nothing here.',
    hint: 'Read the OpenAPI description.',
    headers: { 'Access-Control-Allow-Origin': '*' },
  })

  assert.equal(response.headers.get('access-control-allow-origin'), '*')
  assert.equal(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
})
