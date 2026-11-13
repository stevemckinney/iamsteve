import { test, expect } from './fixtures.js'

// The endpoint runs here with .env.local’s Supabase keys. With VERCEL_ENV
// unset it answers before touching the database, so nothing here records
// a view
if (process.env.VERCEL_ENV) {
  throw new Error('Unset VERCEL_ENV, or these tests would record views')
}

const slug = 'rules-i-follow-when-typesetting'
const endpoint = `/api/views/${slug}`

test.describe('POST /api/views/[slug]', () => {
  async function json(response, status, body) {
    expect(response.status()).toBe(status)
    expect(response.headers()).toMatchObject({
      'content-type': 'application/json',
      'cache-control': 'no-store',
    })
    expect(await response.json()).toEqual(body)
  }

  test('answers {views: null} for open and unlisted posts', async ({
    request,
  }) => {
    await json(await request.post(endpoint), 200, { views: null })
    await json(
      await request.post('/api/views/css-tip-avoid-your-font-face-fauxs'),
      200,
      { views: null }
    )
  })

  test('turns away a slug that isn’t one', async ({ request }) => {
    await json(await request.post('/api/views/Not_A_Slug'), 400, {
      error: 'Invalid slug',
    })
    // The slug is checked before the origin, once Astro’s check lets a
    // request through (see below)
    await json(
      await request.post('/api/views/Not_A_Slug', {
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://example.com',
        },
      }),
      400,
      { error: 'Invalid slug' }
    )
  })

  test('turns away another origin', async ({ request, baseURL }) => {
    // A JSON body passes Astro’s own check, which leaves this to the
    // endpoint: Origin’s host has to be the Host
    const headers = { 'Content-Type': 'application/json' }
    const port = new URL(baseURL)
    port.port = String(Number(port.port) + 1)
    for (const origin of ['https://example.com', 'not a url', port.origin]) {
      await json(
        await request.post(endpoint, {
          headers: { ...headers, Origin: origin },
        }),
        403,
        { error: 'Invalid origin' }
      )
    }
    // Without a body, Astro’s check answers first: still a 403, but as
    // text, without no-store
    const astro = await request.post(endpoint, {
      headers: { Origin: 'https://example.com' },
    })
    expect(astro.status()).toBe(403)
  })

  test('accepts its own origin', async ({ request, baseURL }) => {
    await json(
      await request.post(endpoint, { headers: { Origin: baseURL } }),
      200,
      { views: null }
    )
  })

  test('finds no post that’s closed or missing', async ({ request }) => {
    for (const missing of ['updates', 'not-a-post']) {
      await json(await request.post(`/api/views/${missing}`), 404, {
        error: 'Not found',
      })
    }
  })

  test('answers other methods with an empty 405', async ({ request }) => {
    for (const method of ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE']) {
      const response = await request.fetch(endpoint, { method })
      expect(response.status(), method).toBe(405)
      expect(response.headers()['cache-control'], method).toBe('no-store')
      expect(response.headers()['content-type'], method).toBeUndefined()
      expect(await response.text(), method).toBe('')
    }
  })

  test('lists its methods for OPTIONS', async ({ request }) => {
    const response = await request.fetch(endpoint, { method: 'OPTIONS' })
    expect(response.status()).toBe(204)
    expect(response.headers()).toMatchObject({
      allow: 'OPTIONS, POST',
      'cache-control': 'no-store',
    })
  })
})
