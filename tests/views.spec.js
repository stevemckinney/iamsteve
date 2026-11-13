import { test, expect } from './fixtures.js'

// The endpoint runs here with .env.local’s Supabase keys. With VERCEL_ENV
// unset it answers before touching the database, so nothing here records
// a view; the counter’s own tests answer for it in the browser
if (process.env.VERCEL_ENV) {
  throw new Error('Unset VERCEL_ENV, or these tests would record views')
}

const slug = 'rules-i-follow-when-typesetting'
const post = `/blog/${slug}`
const endpoint = `/api/views/${slug}`
const storageKey = `viewed-${slug}`

const island = (page) =>
  page.locator('astro-island[component-url*="view-counter"]')
const count = (page) => island(page).locator('span')
const stored = (page) =>
  page.evaluate((key) => sessionStorage.getItem(key), storageKey)
// The count the page was built with
const built = async (page) =>
  Number((await count(page).textContent()).replace(/\D/g, ''))

test.describe('the view counter', () => {
  test('a first view shows the new count, highlighted for two seconds', async ({
    page,
  }) => {
    const posts = []
    await page.route(`**${endpoint}`, (route) => {
      posts.push(route.request().method())
      return route.fulfill({ json: { views: 123456 } })
    })
    // Keeps each fetch’s options, to see the POST can outlive the page
    await page.addInitScript(() => {
      const send = window.fetch
      window.sent = []
      window.fetch = (input, init) => {
        window.sent.push({ url: String(input), ...init })
        return send(input, init)
      }
    })
    await page.goto(post)

    await expect(count(page)).toHaveText('123,456 views')
    // text-emphasis comes last, so it keeps its colour, as in production
    await expect(count(page)).toHaveClass(
      'transition-colors duration-1000 ease-out text-emphasis'
    )
    expect(posts).toEqual(['POST'])
    const sent = await page.evaluate(() => window.sent)
    expect(sent.find(({ url }) => url === endpoint)).toMatchObject({
      method: 'POST',
      keepalive: true,
    })
    expect(await stored(page)).toBe('123456')

    await expect(count(page)).toHaveClass('text-emphasis', { timeout: 3000 })
  })

  test('a count lower than the page’s leaves it alone', async ({ page }) => {
    await page.route(`**${endpoint}`, (route) =>
      route.fulfill({ json: { views: 1 } })
    )
    const answered = page.waitForResponse(`**${endpoint}`)
    await page.goto(post)
    const views = await built(page)
    await answered

    await expect.poll(() => stored(page)).toBe('1')
    await expect(count(page)).toHaveText(`${views.toLocaleString()} views`)
    await expect(count(page)).toHaveClass('text-emphasis')
  })

  test('a view the endpoint doesn’t count keeps the built count', async ({
    page,
  }) => {
    // The real endpoint, which answers {views: null} here
    const answered = page.waitForResponse(`**${endpoint}`)
    await page.goto(post)
    const views = await built(page)
    expect(await (await answered).json()).toEqual({ views: null })

    await expect.poll(() => stored(page)).toBe('true')
    await expect(count(page)).toHaveText(`${views.toLocaleString()} views`)
  })

  test('a view this session counted shows its count without posting', async ({
    page,
  }) => {
    const posts = []
    await page.route(`**${endpoint}`, (route) => {
      posts.push(route.request().method())
      return route.fulfill({ json: { views: 1 } })
    })
    await page.addInitScript(
      (key) => sessionStorage.setItem(key, '999999'),
      storageKey
    )
    await page.goto(post)

    await expect(count(page)).toHaveText('999,999 views')
    await expect(count(page)).toHaveClass('text-emphasis')
    await page.waitForLoadState('networkidle')
    expect(posts).toEqual([])
  })

  test('a view the endpoint didn’t count isn’t posted again', async ({
    page,
  }) => {
    const posts = []
    await page.route(`**${endpoint}`, (route) => {
      posts.push(route.request().method())
      return route.fulfill({ json: { views: 1 } })
    })
    await page.addInitScript(
      (key) => sessionStorage.setItem(key, 'true'),
      storageKey
    )
    await page.goto(post)
    const views = await built(page)

    await expect(island(page)).not.toHaveAttribute('ssr')
    await page.waitForLoadState('networkidle')
    expect(posts).toEqual([])
    await expect(count(page)).toHaveText(`${views.toLocaleString()} views`)
  })
})

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
