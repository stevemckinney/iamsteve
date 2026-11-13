// The contact form island and its action. No email is ever sent: the action
// runs for real only with input it turns away before Turnstile and the send
// (invalid fields, a filled honeypot), and every other answer is mocked
import { test, expect } from './fixtures.js'

// Scrolls an island into view, which hydrates a client:visible one, and
// waits for Astro to hand it to React
async function hydrate(island) {
  await island.scrollIntoViewIfNeeded()
  await expect(island).not.toHaveAttribute('ssr')
}

async function open(page) {
  await page.goto('/contact')
  const island = page.locator('astro-island[component-url*="contact-form"]')
  await hydrate(island)
  return island
}

const eightWords = 'I would like to ask about your post'

async function fillIn(form, { name = 'Ada', email = 'ada@example.com' } = {}) {
  await form.getByLabel('Name').fill(name)
  await form.getByLabel('Email').fill(email)
  await form.getByLabel('Message').fill(eightWords)
}

// The action’s answers, encoded with devalue as Astro sends them
const sent = {
  contentType: 'application/json+devalue',
  body: '[{"status":1},"sent"]',
}
const failed = {
  contentType: 'application/json+devalue',
  body: '[{"status":1},"failed"]',
}

// Lets a request through to the real action only when the action will turn
// it away; anything else is aborted, so it can never reach the send
async function passIf(page, check) {
  const seen = []
  await page.route('**/_actions/contact', async (route) => {
    const request = route.request()
    const form = await new Response(request.postDataBuffer(), {
      headers: { 'Content-Type': request.headers()['content-type'] },
    }).formData()
    seen.push(Object.fromEntries(form))
    if (check(form)) await route.continue()
    else await route.abort()
  })
  return seen
}

test.describe('contact form', () => {
  let island

  test.beforeEach(async ({ page }) => {
    island = await open(page)
  })

  test('labels name their fields', async () => {
    for (const name of ['Name', 'Email', 'Message']) {
      const field = island.getByLabel(name, { exact: true })
      await expect(field).toHaveAttribute('required', '')
      const id = await field.getAttribute('id')
      await expect(island.locator(`label[for="${id}"]`)).toHaveText(name)
    }
    await expect(island.getByLabel('Email')).toHaveAttribute('type', 'email')
  })

  test('sends only once the message has eight words', async () => {
    const message = island.getByLabel('Message')
    const send = island.getByRole('button', { name: 'Send' })
    const count = island.getByText(/^Enter at least 8 words/)

    await expect(send).toBeDisabled()
    await expect(count).toHaveText(
      'Enter at least 8 words. Currently used: 0 words.'
    )
    await message.fill('Hello')
    await expect(count).toHaveText(
      'Enter at least 8 words. Currently used: 1 word.'
    )
    await message.fill('I would like to ask about your')
    await expect(count).toHaveText(
      'Enter at least 8 words. Currently used: 7 words.'
    )
    await expect(send).toBeDisabled()
    await message.fill(`  ${eightWords}  `)
    await expect(count).toHaveText(
      'Enter at least 8 words. Currently used: 8 words.'
    )
    await expect(send).toBeEnabled()
  })

  test('shows the action’s errors on their fields', async ({ page }) => {
    // The browser accepts both; the action’s schema doesn’t
    const seen = await passIf(
      page,
      (form) => !form.get('name').trim() && !form.get('title')
    )
    await fillIn(island, { name: '   ', email: 'ada@example' })
    await island.getByRole('button', { name: 'Send' }).click()

    const name = island.getByLabel('Name')
    const email = island.getByLabel('Email')
    await expect(island.getByText('Please enter your name')).toBeVisible()
    await expect(island.getByText('Please provide a valid email')).toBeVisible()
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(seen).toEqual([
      { title: '', name: '   ', email: 'ada@example', message: eightWords },
    ])
    await expect(island.getByRole('alert')).toHaveCount(0)
    await expect(page.getByText('Message sent')).toHaveCount(0)

    // A field’s error clears once it’s changed and left
    await name.fill('Ada')
    await name.press('Tab')
    await expect(island.getByText('Please enter your name')).toHaveCount(0)
    await expect(name).not.toHaveAttribute('aria-invalid')
    await expect(island.getByText('Please provide a valid email')).toBeVisible()
  })

  test('drops a message with the honeypot filled, as if sent', async ({
    page,
  }) => {
    const seen = await passIf(page, (form) => Boolean(form.get('title')))
    await island.locator('#title').fill('Hello', { force: true })
    await fillIn(island)
    await island.getByRole('button', { name: 'Send' }).click()

    await expect(page.getByText('Message sent')).toBeVisible()
    expect(seen).toHaveLength(1)
    await expect(island.getByLabel('Message')).toHaveValue('')
  })

  test('says when a message couldn’t be sent', async ({ page }) => {
    const answers = [failed, { status: 500, json: {} }, 'abort']
    await page.route('**/_actions/contact', (route) => {
      const answer = answers.shift()
      return answer === 'abort' ? route.abort() : route.fulfill(answer)
    })
    await fillIn(island)
    // Exact, so it waits out “Sending…”
    const send = island.getByRole('button', { name: 'Send', exact: true })

    for (const left of [2, 1, 0]) {
      await send.click()
      await expect.poll(() => answers.length).toBe(left)
      await expect(send).toBeEnabled()
      await expect(island.getByRole('alert')).toHaveText(
        'Your message couldn’t be sent. Please try again or send an email instead.'
      )
      // The message stays for the next try
      await expect(island.getByLabel('Message')).toHaveValue(eightWords)
    }
    await expect(page.getByText('Message sent')).toHaveCount(0)
  })

  test('a sent message clears the form and shows a toast', async ({ page }) => {
    await page.route('**/_actions/contact', (route) => route.fulfill(sent))
    await fillIn(island)
    await island.getByRole('button', { name: 'Send' }).click()

    // On the body, outside the island, so the notepad header can’t cover it
    const toast = page.locator('body > div.fixed')
    await expect(toast).toContainText('Message sent')
    await expect(toast).toContainText(
      'Your message has been sent successfully!'
    )
    await expect(island.getByText('Message sent')).toHaveCount(0)
    for (const name of ['Name', 'Email', 'Message']) {
      await expect(island.getByLabel(name, { exact: true })).toHaveValue('')
    }
    await expect(
      island.getByText('Enter at least 8 words. Currently used: 0 words.')
    ).toBeVisible()
    await expect(island.getByRole('button', { name: 'Send' })).toBeDisabled()

    await toast.getByRole('button', { name: 'Close' }).click()
    await expect(toast).toHaveCount(0)
  })
})

test('the toast goes after 5 s', async ({ page }) => {
  const start = Date.parse('2026-11-13T09:00:00Z')
  await page.clock.install({ time: start })
  await page.route('**/_actions/contact', (route) => route.fulfill(sent))
  const island = await open(page)
  // Stopped, the toast’s timer starts at a known time
  await page.clock.pauseAt(start + 60 * 60 * 1000)
  await fillIn(island)
  await island.getByRole('button', { name: 'Send' }).click()

  const toast = page.locator('body > div.fixed')
  await expect(toast).toBeVisible()
  await page.clock.runFor(4999)
  await expect(toast).toBeVisible()
  await page.clock.runFor(1)
  await expect(toast).toHaveCount(0)
})

test('five sends in the last hour put the form away', async ({ page }) => {
  // Nothing writes formSubmissions today, so only an old visit could have it
  await page.addInitScript(() => {
    const now = Date.now()
    localStorage.setItem(
      'formSubmissions',
      JSON.stringify([1, 2, 3, 4, 5].map((minutes) => now - minutes * 60000))
    )
  })
  const island = await open(page)
  await expect(island.getByText('Form currently unavailable.')).toBeVisible()
  await expect(island.locator('form')).toHaveCount(0)
})

test.describe('contact form without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  // As today: the form has no method, so sending it would put the message in
  // the page’s URL. Enter goes through Send too, so neither can send it
  test('can’t be sent', async ({ page }) => {
    await page.goto('/contact')
    const form = page.locator('form:has([name="message"])')
    await fillIn(form)
    await expect(form.getByRole('button', { name: 'Send' })).toBeDisabled()
    await expect(form).not.toHaveAttribute('method')
  })
})
