// The newsletter form island, with /api/newsletter mocked in the browser so
// nothing is subscribed, and the endpoints on the paths that answer before
// they reach EmailOctopus (the count and campaigns GETs only read). A form
// post runs the function against a local stand-in for EmailOctopus
import http from 'node:http'
import { devices } from '@playwright/test'
import { test, expect } from './fixtures.js'

// Scrolls an island into view, which hydrates a client:visible one, and
// waits for Astro to hand it to React. Submitting before that would send
// the form the browser’s way, as a GET to the page
async function hydrate(island) {
  await island.scrollIntoViewIfNeeded()
  await expect(island).not.toHaveAttribute('ssr')
}

const footerForm = (page) =>
  page.locator('astro-island[component-url*="newsletter-form"]').last()

// Mocks /api/newsletter with a response, keeping what the form sent
async function answer(page, response) {
  const sent = []
  await page.route('**/api/newsletter', async (route) => {
    sent.push(route.request().postDataJSON())
    if (response === 'abort') await route.abort('internetdisconnected')
    else await route.fulfill(response)
  })
  return sent
}

async function fill(island, { name = 'Ada', email = 'ada@example.com' } = {}) {
  await island.getByLabel('First name').fill(name)
  await island.getByLabel('Email').fill(email)
  await island
    .getByRole('button', { name: 'Subscribe to the newsletter' })
    .click()
}

test.describe('newsletter form', () => {
  test('subscribes, thanks the reader and locks the form', async ({ page }) => {
    const sent = await answer(page, { json: { success: true } })
    await page.goto('/')
    const island = footerForm(page)
    await hydrate(island)
    await fill(island)

    await expect(island.getByRole('status')).toHaveText(
      'Thank you for subscribing! Please check your inbox.'
    )
    expect(sent).toEqual([
      { email: 'ada@example.com', name: 'Ada', source: '' },
    ])
    for (const label of ['First name', 'Email']) {
      await expect(island.getByLabel(label)).toHaveValue('')
      await expect(island.getByLabel(label)).toBeDisabled()
    }
    await expect(
      island.getByRole('button', { name: 'Subscribe to the newsletter' })
    ).toBeDisabled()
    await expect(island.getByRole('alert')).toHaveCount(0)
  })

  const failures = [
    [
      'an address already on the list',
      { status: 400, json: { error: 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS' } },
      'This email is already subscribed to the newsletter.',
    ],
    [
      'a 500, as when EmailOctopus can’t be reached',
      { status: 500, json: { error: 'fetch failed' } },
      'The server cannot be reached to submit your request.',
    ],
    [
      'another 400',
      { status: 400, json: { error: 'Email is required' } },
      'There was an error subscribing to the list.',
    ],
    [
      'an upstream status passed on',
      { status: 429, json: { error: 'Too many requests' } },
      'There was an error subscribing to the list.',
    ],
    [
      'no connection',
      'abort',
      'Network error. Please check your connection and try again.',
    ],
  ]

  for (const [name, response, message] of failures) {
    test(`explains ${name}`, async ({ page }) => {
      const sent = await answer(page, response)
      await page.goto('/')
      const island = footerForm(page)
      await hydrate(island)
      await fill(island)

      await expect(island.getByRole('alert')).toHaveText(message)
      expect(sent).toHaveLength(1)
      await expect(island.getByRole('status')).toHaveCount(0)
      // The reader can correct the address and try again
      await expect(island.getByLabel('Email')).toHaveValue('ada@example.com')
      await expect(island.getByLabel('Email')).toBeEnabled()
    })
  }

  test('checks the address and name before sending', async ({ page }) => {
    const sent = await answer(page, { json: { success: true } })
    await page.goto('/')
    const island = footerForm(page)
    await hydrate(island)
    const email = island.getByLabel('Email')

    // The browser accepts an address without a dot in its domain; the form doesn’t
    await fill(island, { email: 'ada@example' })
    const error = island.locator('#input-email-footer-error')
    await expect(error).toHaveText('Please enter a valid email address')
    await expect(error).toHaveAttribute('role', 'alert')
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    await expect(email).toHaveAttribute(
      'aria-describedby',
      'input-email-footer-error'
    )
    await email.press('m')
    await expect(error).toHaveCount(0)
    await expect(email).not.toHaveAttribute('aria-invalid')

    await fill(island, { name: '  ' })
    await expect(island.getByRole('alert')).toHaveText('Please enter your name')
    expect(sent).toEqual([])
  })

  test('the /newsletter form hydrates as it loads', async ({ page }) => {
    await answer(page, { json: { success: true } })
    await page.goto('/newsletter')
    const island = page
      .locator('astro-island[component-url*="newsletter-form"]')
      .first()
    await expect(island).not.toHaveAttribute('ssr')
    await fill(island)
    await expect(island.getByRole('status')).toBeVisible()
  })
})

test.describe('newsletter form without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('posts the form, so the name and address stay out of the URL', async ({
    page,
  }) => {
    const sent = []
    await page.route('**/api/newsletter', async (route) => {
      sent.push([route.request().method(), route.request().postData()])
      await route.fulfill({ status: 303, headers: { location: '/confirm' } })
    })
    await page.goto('/')
    await fill(footerForm(page))

    await expect(page).toHaveURL(/\/confirm$/)
    expect(sent).toEqual([
      ['POST', 'fields%5Bfirst_name%5D=Ada&email_address=ada%40example.com'],
    ])
  })

  test('/newsletter shows the message its hash names', async ({ page }) => {
    await page.goto('/newsletter')
    await expect(page.getByRole('alert')).toHaveCount(0)

    await page.goto('/newsletter#already-subscribed')
    await expect(page.getByRole('alert')).toHaveText([
      'This email is already subscribed to the newsletter.',
    ])
    await page.goto('/newsletter#subscribe-error')
    await expect(page.getByRole('alert')).toHaveText([
      'There was an error subscribing to the list.',
    ])
  })
})

test.describe('newsletter form on a phone', () => {
  // Without its browser type, which a describe block can’t set
  const { defaultBrowserType, ...phone } = devices['Pixel 7']
  test.use(phone)

  test('subscribes from the footer', async ({ page }) => {
    await answer(page, { json: { success: true } })
    await page.goto('/')
    const island = footerForm(page)
    await hydrate(island)
    await fill(island)
    await expect(island.getByRole('status')).toBeVisible()
  })
})

test.describe('newsletter endpoints', () => {
  test('POST /api/newsletter needs an email', async ({ request }) => {
    for (const data of [{}, { name: 'Ada', source: '' }]) {
      const response = await request.post('/api/newsletter', { data })
      expect(response.status()).toBe(400)
      expect(response.headers()['content-type']).toBe('application/json')
      expect(await response.json()).toEqual({ error: 'Email is required' })
    }
  })

  test('POST /api/newsletter answers a body that isn’t JSON with an empty 500', async ({
    request,
  }) => {
    // As buffers, which Playwright sends as they are, where it would
    // encode a string as JSON
    for (const body of ['not json', 'null']) {
      const response = await request.post('/api/newsletter', {
        headers: { 'Content-Type': 'application/json' },
        data: Buffer.from(body),
      })
      expect(response.status()).toBe(500)
      expect(await response.text()).toBe('')
    }
  })

  test('/api/newsletter takes POST only', async ({ request }) => {
    const get = await request.get('/api/newsletter')
    expect(get.status()).toBe(405)
    expect(await get.text()).toBe('')

    const options = await request.fetch('/api/newsletter', {
      method: 'OPTIONS',
    })
    expect(options.status()).toBe(204)
    expect(options.headers().allow).toBe('OPTIONS, POST')
  })

  const cors = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, OPTIONS',
    'access-control-allow-headers': 'Content-Type',
  }

  test('OPTIONS /api/newsletter/count is a 204 with CORS headers', async ({
    request,
  }) => {
    const response = await request.fetch('/api/newsletter/count', {
      method: 'OPTIONS',
    })
    expect(response.status()).toBe(204)
    expect(response.headers()).toMatchObject(cors)
    expect(await response.text()).toBe('')
  })

  test('GET /api/newsletter/count gives the count, or the fallback', async ({
    request,
  }) => {
    const response = await request.get('/api/newsletter/count')
    expect(response.status()).toBe(200)
    const headers = response.headers()
    expect(headers).toMatchObject({
      'content-type': 'application/json',
      ...cors,
    })
    const { count } = await response.json()
    expect(Number.isInteger(count) && count > 0).toBe(true)
    // Only a count EmailOctopus gave is cached. Vercel’s CDN keeps the
    // header’s s-maxage and stale-while-revalidate to itself, as serve.mjs
    // does, so public is what’s left. The fallback gets vercel.json’s header
    if (headers['cache-control'] !== 'public, max-age=0') {
      expect(headers['cache-control']).toBe('public')
    } else {
      expect(count).toBe(700)
    }

    const post = await request.post('/api/newsletter/count')
    expect(post.status()).toBe(405)
  })

  test('GET /api/campaigns passes on EmailOctopus’s campaigns', async ({
    request,
  }) => {
    const response = await request.get('/api/campaigns')
    const body = await response.json()
    if (response.status() === 500) {
      // Without the EmailOctopus values
      expect(body).toEqual({ error: 'API configuration missing' })
    } else {
      expect(response.status()).toBe(200)
      expect(Array.isArray(body.data)).toBe(true)
    }

    const options = await request.fetch('/api/campaigns', { method: 'OPTIONS' })
    expect(options.status()).toBe(204)
    expect(options.headers().allow).toBe('GET, HEAD, OPTIONS')
    const post = await request.post('/api/campaigns')
    expect(post.status()).toBe(405)
  })
})

test.describe('a form posted to /api/newsletter', () => {
  // The function runs in this process, with EmailOctopus swapped for a local
  // server that gives the answer a test sets and keeps what it was sent
  const calls = []
  let reply
  let upstream
  let handle

  test.beforeAll(async () => {
    upstream = http.createServer(async (req, res) => {
      let body = ''
      for await (const chunk of req) body += chunk
      calls.push({ path: req.url, body: JSON.parse(body) })
      res.writeHead(reply.status, { 'content-type': 'application/json' })
      res.end(JSON.stringify(reply.json))
    })
    await new Promise((resolve) => upstream.listen(0, resolve))
    const { port } = upstream.address()
    process.env.EMAILOCTOPUS_API_URL = `http://localhost:${port}/`
    process.env.EMAILOCTOPUS_API_KEY = 'key'
    process.env.EMAILOCTOPUS_LIST_ID = 'list'
    const { createHandler } = await import('../scripts/serve.mjs')
    handle = await createHandler()
  })

  test.afterAll(() => upstream.close())
  test.beforeEach(() => {
    calls.length = 0
  })

  const post = (fields, origin = 'http://localhost') =>
    handle(
      new Request('http://localhost/api/newsletter', {
        method: 'POST',
        headers: { origin },
        body: new URLSearchParams(fields),
      })
    )
  const ada = { 'fields[first_name]': 'Ada', email_address: 'ada@example.com' }

  test('subscribes the address, then goes on to /confirm', async () => {
    reply = { status: 200, json: { id: 'contact' } }
    const response = await post(ada)
    expect(response.status).toBe(303)
    expect(response.headers.get('location')).toBe('/confirm')
    expect(calls).toEqual([
      {
        path: '/lists/list/contacts',
        body: {
          api_key: 'key',
          email_address: 'ada@example.com',
          fields: { FirstName: 'Ada', Source: '' },
          status: 'PENDING',
        },
      },
    ])
  })

  const failures = [
    [
      'an address already on the list',
      {
        status: 409,
        json: { error: { code: 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS' } },
      },
      '/newsletter#already-subscribed',
    ],
    [
      'an EmailOctopus error',
      { status: 500, json: { error: { code: 'UNKNOWN', message: 'Down' } } },
      '/newsletter#subscribe-error',
    ],
  ]

  for (const [name, answer, location] of failures) {
    test(`sends ${name} to ${location}`, async () => {
      reply = answer
      const response = await post(ada)
      expect(response.status).toBe(303)
      expect(response.headers.get('location')).toBe(location)
      expect(calls).toHaveLength(1)
    })
  }

  test('sends a form without an address to the error', async () => {
    const response = await post({ 'fields[first_name]': 'Ada' })
    expect(response.headers.get('location')).toBe('/newsletter#subscribe-error')
    expect(calls).toEqual([])
  })

  test('refuses a form from another site', async () => {
    const response = await post(ada, 'https://example.com')
    expect(response.status).toBe(403)
    expect(calls).toEqual([])
  })
})
