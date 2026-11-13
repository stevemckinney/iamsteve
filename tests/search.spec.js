import { devices } from '@playwright/test'
import { test, expect } from './fixtures.js'

// Astro drops an island’s ssr flag once it has hydrated, and a key or a press
// before then goes nowhere
const hydrated = (page, selector) =>
  page
    .locator(`${selector} astro-island[component-url*="search-"]:not([ssr])`)
    .first()
    .waitFor({ state: 'attached' })

const trigger = (page, bar = '#nav') =>
  page.locator(bar).getByRole('button', { name: 'Search' })
const dialog = (page) => page.getByRole('dialog', { name: 'Search' })
const field = (page) => dialog(page).locator('input')
// Rows carry what they open, or the action they run, as their key
const row = (page, key) => dialog(page).locator(`[data-key="${key}"]`)
const keys = (page) =>
  dialog(page)
    .getByRole('option')
    .evaluateAll((rows) => rows.map((row) => row.dataset.key))

async function open(page, url) {
  await page.goto(url)
  await hydrated(page, '#nav')
  await page.keyboard.press('ControlOrMeta+k')
  await expect(field(page)).toBeFocused()
}

// Every search ends in a row that hands the query to /search
async function searchFor(page, query) {
  await page.keyboard.type(query)
  await expect(row(page, 'search:all')).toBeVisible()
}

test.describe('cmd+K search', () => {
  test('⌘K and Ctrl+K open and close one dialog', async ({ page }) => {
    await page.goto('/about')
    await hydrated(page, '#nav')

    for (const keys of ['Meta+k', 'Control+k']) {
      await page.keyboard.press(keys)
      await expect(dialog(page)).toHaveCount(1)
      await expect(field(page)).toBeFocused()
      await page.keyboard.press(keys)
      await expect(dialog(page)).toHaveCount(0)
    }
  })

  test('the header trigger opens the list, drawn without the index', async ({
    page,
  }) => {
    await page.route('**/api/search', (route) => route.abort())
    await page.goto('/about')
    await hydrated(page, '#nav')
    await trigger(page).click()

    await expect(field(page)).toBeFocused()
    await expect(dialog(page).locator('header')).toHaveText([
      'Pages',
      'Actions',
    ])
    expect(await keys(page)).toEqual([
      '/notes',
      '/about',
      '/blog',
      '/category/design',
      '/category/code',
      '/collections',
      '/uses',
      'action:copy-link',
    ])

    // Searching waits on the index
    await page.keyboard.type('css')
    await expect(dialog(page)).toContainText('Loading…')
  })

  test('the index and the dialog’s code wait for the trigger', async ({
    page,
  }) => {
    const loaded = new Set()
    page.on('request', (request) => {
      const { pathname } = new URL(request.url())
      if (pathname === '/api/search') loaded.add('index')
      if (/\/search-modal\.[\w-]+\.js$/.test(pathname)) loaded.add('dialog')
    })
    await page.goto('/about', { waitUntil: 'networkidle' })
    await hydrated(page, '#nav')
    expect([...loaded]).toEqual([])

    // Pointing at the trigger fetches both before it’s pressed
    await trigger(page).hover()
    await expect.poll(() => [...loaded].sort()).toEqual(['dialog', 'index'])
    await expect(dialog(page)).toHaveCount(0)
  })

  test('typing searches, the arrows move and Enter opens a result', async ({
    page,
  }) => {
    await open(page, '/about')
    await searchFor(page, 'css')

    // Places come first, and the first row is focused as you type
    await expect(dialog(page).locator('header')).toHaveText([
      'Collections',
      'Categories',
      'Blog',
      'Links',
    ])
    await expect(row(page, '/collections/css')).toHaveAttribute(
      'data-focused',
      'true'
    )
    await expect(dialog(page).getByRole('status')).toHaveText(
      '20 results for css'
    )

    await page.keyboard.press('ArrowDown')
    await expect(row(page, '/category/css')).toHaveAttribute(
      'data-focused',
      'true'
    )
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/blog/how-to-flexible-squares-with-css')
  })

  test('⌘Enter and ⌘-click open a new tab and leave the dialog open', async ({
    page,
    context,
  }) => {
    await open(page, '/about')
    await searchFor(page, 'css')
    await expect(row(page, '/collections/css')).toHaveAttribute(
      'data-focused',
      'true'
    )

    let tab = context.waitForEvent('page')
    await page.keyboard.press('ControlOrMeta+Enter')
    await expect(await tab).toHaveURL('/collections/css')
    await expect(page).toHaveURL('/about')
    await expect(field(page)).toBeFocused()

    tab = context.waitForEvent('page')
    await row(page, '/category/css').click({ modifiers: ['ControlOrMeta'] })
    await expect(await tab).toHaveURL('/category/css')
    await expect(page).toHaveURL('/about')
    await expect(dialog(page)).toHaveCount(1)
  })

  test('Tab and → go into a place, Backspace and ← come back', async ({
    page,
  }) => {
    const scoped = () =>
      expect(field(page)).toHaveAttribute('placeholder', 'Search collections…')
    const everything = () =>
      expect(field(page)).toHaveAttribute('placeholder', 'Search everything…')
    await open(page, '/about')

    // Typing the start of a place and pressing Tab goes there
    await page.keyboard.type('coll')
    await page.keyboard.press('Tab')
    await scoped()
    await expect(field(page)).toHaveValue('')
    await page.keyboard.press('Backspace')
    await everything()

    // Coming back starts at the first row, five above Collections
    await expect(row(page, '/notes')).toHaveAttribute('data-focused', 'true')
    for (let step = 0; step < 5; step++) await page.keyboard.press('ArrowDown')
    await expect(row(page, '/collections')).toHaveAttribute(
      'data-focused',
      'true'
    )
    // → reads the row from the field’s aria-activedescendant, which react-aria
    // sets a moment after the row’s data-focused
    await expect(field(page)).toHaveAttribute(
      'aria-activedescendant',
      /-option-\/collections$/
    )
    await page.keyboard.press('ArrowRight')
    await scoped()
    await page.keyboard.press('ArrowLeft')
    await everything()
  })

  test('Escape closes, and focus goes back to the trigger', async ({
    page,
  }) => {
    await page.goto('/about')
    await hydrated(page, '#nav')
    await trigger(page).click()
    await expect(field(page)).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dialog(page)).toHaveCount(0)
    await expect(trigger(page)).toBeFocused()
  })

  test('“See all results” goes to /search', async ({ page }) => {
    await open(page, '/about')
    await searchFor(page, 'css')
    await expect(row(page, 'search:all')).toHaveText(
      'See all results for “css”'
    )
    await row(page, 'search:all').click()

    await expect(page).toHaveURL('/search?q=css')
    await expect(page.locator('main li')).toHaveCount(40)
  })

  test('a link out is followed in the same tab', async ({ page }) => {
    const link = 'https://60fps.design/apps'
    await page.route(link, (route) =>
      route.fulfill({ contentType: 'text/html', body: '<title>60fps</title>' })
    )
    await open(page, '/about')
    await searchFor(page, '60fps')
    await row(page, link).click()

    await expect(page).toHaveURL(link)
  })
})

test.describe('search actions', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  })

  const clipboard = (page) =>
    page.evaluate(() => navigator.clipboard.readText())

  test('copy link copies the page’s address and says so', async ({ page }) => {
    await open(page, '/about')
    await row(page, 'action:copy-link').click()

    await expect(row(page, 'action:copy-link')).toHaveText('Copied')
    await expect(dialog(page).getByRole('status')).toHaveText('Copied')
    await expect.poll(() => clipboard(page)).toBe('https://iamsteve.me/about')
    await expect(row(page, 'action:copy-link')).toHaveText(
      'Copy link to this page'
    )
  })

  test('a post offers a link to the heading being read, and its markdown', async ({
    page,
  }) => {
    const post = 'rules-i-follow-when-typesetting'
    const heading = 'letter-spacing-or-tracking-is-proportional'
    await page.goto(`/blog/${post}`)
    await hydrated(page, '#nav')
    await page.locator(`#${heading}`).evaluate((el) => el.scrollIntoView())
    await page.keyboard.press('ControlOrMeta+k')

    await expect(row(page, 'action:copy-anchor')).toHaveText(
      'Copy link to “Letter spacing or tracking is proportional”'
    )
    await row(page, 'action:copy-anchor').click()
    await expect
      .poll(() => clipboard(page))
      .toBe(`https://iamsteve.me/blog/${post}#${heading}`)

    await row(page, 'action:copy-markdown').click()
    await expect(row(page, 'action:copy-markdown')).toHaveText('Copied')
    const markdown = await page.request.get(`/api/content/${post}`)
    await expect.poll(() => clipboard(page)).toBe(await markdown.text())
  })

  test('the notes feed offers a link to the note being read', async ({
    page,
  }) => {
    await page.goto('/notes')
    await hydrated(page, '#nav')
    const note = page.locator('article').nth(1)
    await note.evaluate((el) => el.scrollIntoView())
    const link = note.locator('h2 a')
    const title = (await link.textContent()).trim()
    const href = await link.getAttribute('href')
    await page.keyboard.press('ControlOrMeta+k')

    await expect(row(page, 'action:copy-anchor')).toHaveText(
      `Copy link to “${title}”`
    )
    await row(page, 'action:copy-anchor').click()
    await expect.poll(() => clipboard(page)).toBe(`https://iamsteve.me${href}`)
  })

  test('share hands the page to the share sheet', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.share = async (data) => {
        window.shared = data
      }
    })
    await open(page, '/uses')
    await row(page, 'action:share').click()

    await expect
      .poll(() => page.evaluate(() => window.shared))
      .toEqual({ url: 'https://iamsteve.me/uses' })
  })
})

test('the collections field warms up by itself and opens scoped', async ({
  page,
}) => {
  const index = page.waitForResponse('**/api/search')
  await page.goto('/collections')
  await index
  await hydrated(page, 'main')

  await page.getByRole('button', { name: 'Search collections' }).click()
  await expect(field(page)).toBeFocused()
  await expect(field(page)).toHaveAttribute(
    'placeholder',
    'Search collections…'
  )
  await expect(dialog(page).locator('header')).toHaveText([
    'Collections',
    'Latest',
  ])

  // A search from here stays inside collections
  await searchFor(page, 'motion')
  const found = await keys(page)
  expect(found[0]).toBe('/collections/motion')
  for (const key of found.slice(1, -1)) expect(key).toMatch(/^https:\/\//)

  // The chip’s × goes back to everything, and starts the search over
  await dialog(page)
    .getByRole('button', { name: 'Search everything instead of collections' })
    .click()
  await expect(field(page)).toHaveAttribute('placeholder', 'Search everything…')
  await expect(field(page)).toHaveValue('')
  await expect(field(page)).toBeFocused()
  await expect(row(page, '/collections')).toBeVisible()
})

test.describe('on a phone', () => {
  // A describe group can’t change the browser, only the page, so Pixel 7’s
  // browser type is left to the config
  const { defaultBrowserType, ...phone } = devices['Pixel 7']
  test.use(phone)

  test('the tab bar trigger opens search, sized to what’s visible', async ({
    page,
  }) => {
    await page.goto('/about')
    await hydrated(page, '#tabbar')
    await trigger(page, '#tabbar').tap()

    await expect(field(page)).toBeFocused()
    // The modal around the dialog follows visualViewport, which shrinks for
    // the on-screen keyboard where the layout viewport doesn’t
    const [height, visible] = await dialog(page)
      .locator('xpath=..')
      .evaluate((modal) => [modal.style.height, visualViewport.height])
    expect(height).toBe(`${visible}px`)
  })
})

test.describe('/search without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('lists the results for a trimmed ?q=', async ({ page }) => {
    await page.goto('/search?q=%20css%20')

    await expect(page).toHaveTitle('Search: css • iamsteve')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, follow'
    )
    await expect(page.locator('#q')).toHaveValue('css')
    await expect(page.getByText('40 results for “css”')).toBeAttached()
    const results = page.locator('main li a')
    await expect(results).toHaveCount(40)
    await expect(results.first()).toHaveAttribute(
      'href',
      '/blog/how-to-flexible-squares-with-css'
    )
  })

  test('the form searches by GET', async ({ page }) => {
    await page.goto('/search')
    await expect(page).toHaveTitle('Search • iamsteve')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'index, follow'
    )

    await page.locator('#q').fill('motion')
    await page.locator('#q').press('Enter')
    await expect(page).toHaveURL('/search?q=motion')
    await expect(page.locator('main li a').first()).toHaveAttribute(
      'href',
      '/collections/motion'
    )
  })

  test('says when nothing is found, as for a query too short', async ({
    page,
  }) => {
    for (const query of ['qwxzv', 'a']) {
      await page.goto(`/search?q=${query}`)
      await expect(page.locator('main p.text-body')).toHaveText(
        `No results found for “${query}”. Try a different term or browse the blog archive.`
      )
      await expect(page.locator('main li')).toHaveCount(0)
    }
  })
})

test('/search is never cached, with or without a query', async ({
  request,
}) => {
  for (const url of ['/search', '/search?q=css']) {
    const response = await request.get(url)
    expect(response.status()).toBe(200)
    expect(response.headers()['cache-control']).toBe(
      'private, no-cache, no-store, max-age=0, must-revalidate'
    )
    expect(response.headers()['content-type']).toMatch(/^text\/html/)
  }
})
