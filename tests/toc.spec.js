import { devices } from '@playwright/test'
import { test, expect } from './fixtures.js'

const post = '/blog/rules-i-follow-when-typesetting'
const tabbarHidden = 'max-lg:translate-y-[calc(100%+0.5rem)]'

// Each width has its own instance, hydrated by client:media; Astro drops
// ssr once an island has hydrated
const phoneToc = (page) => page.locator('astro-island[opts*="max-width"]')
const desktopToc = (page) => page.locator('astro-island[opts*="min-width"]')

async function parts(toc) {
  await expect(toc).not.toHaveAttribute('ssr')
  const toggle = toc.getByRole('button', { name: 'Contents' })
  const id = await toggle.getAttribute('aria-controls')
  return { toggle, content: toc.locator(`[id="${id}"]`) }
}

test.describe('on desktop', () => {
  test('the contents start open, close and open again', async ({ page }) => {
    await page.goto(post)
    const { toggle, content } = await parts(desktopToc(page))
    await expect(phoneToc(page)).toHaveAttribute('ssr')

    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(content).not.toHaveAttribute('inert')
    await expect(
      content.getByRole('link', { name: 'Go to section: Keyboard shortcuts' })
    ).toBeVisible()

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(content).toHaveAttribute('inert')
    await expect(content).toHaveAttribute('data-state', 'closed')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(content).not.toHaveAttribute('inert')
  })

  test('the toggle names the list it opens', async ({ page }) => {
    await page.goto(post)
    await expect(
      desktopToc(page).getByRole('navigation', { name: 'Contents' })
    ).toBeVisible()
  })

  test('each instance’s toggle controls its own list', async ({ page }) => {
    await page.goto(post)
    for (const toc of [phoneToc(page), desktopToc(page)]) {
      const id = await toc.locator('button').getAttribute('aria-controls')
      await expect(page.locator(`[id="${id}"]`)).toHaveCount(1)
      await expect(toc.locator(`[id="${id}"]`)).toHaveCount(1)
    }
  })

  test('the section being read is marked', async ({ page }) => {
    await page.goto(post)
    const { content } = await parts(desktopToc(page))
    // The next heading is a screen further down, so this one stays the
    // last in the top half of the window
    const link = content.getByRole('link', {
      name: 'Go to section: Everything is sentence case',
    })
    await expect(link).not.toHaveAttribute('aria-current')

    await page.locator('#everything-is-sentence-case').evaluate((heading) => {
      heading.scrollIntoView({ block: 'start' })
    })
    await expect(link).toHaveAttribute('aria-current', 'location')
    await expect(link).toHaveClass(/\btext-toc-active\b/)
    await expect(content.locator('[aria-current]')).toHaveCount(1)
  })
})

test.describe('on a phone', () => {
  // A describe group can’t switch browsers, so leave Pixel 7’s out
  const { defaultBrowserType, ...pixel } = devices['Pixel 7']
  test.use(pixel)

  test('the contents open over the page and hide the tab bar', async ({
    page,
  }) => {
    await page.goto(post)
    const { toggle, content } = await parts(phoneToc(page))
    await expect(desktopToc(page)).toHaveAttribute('ssr')

    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(content).toHaveAttribute('inert')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(content).not.toHaveAttribute('inert')
    await expect(page.locator('html')).toHaveAttribute('data-toc-open', 'true')
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
    await expect(page.locator('#tabbar')).toContainClass(tabbarHidden)

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('html')).toHaveAttribute('data-toc-open', 'false')
    await expect(page.locator('#tabbar')).not.toContainClass(tabbarHidden)
  })

  test('a link closes the contents, then scrolls to its section', async ({
    page,
  }) => {
    await page.goto(post)
    const toc = phoneToc(page)
    const { toggle, content } = await parts(toc)

    await toggle.click()
    await content
      .getByRole('link', { name: 'Go to section: Keyboard shortcuts' })
      .click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('html')).toHaveAttribute('data-toc-open', 'false')
    await expect(page.locator('#tabbar')).not.toContainClass(tabbarHidden)

    await expect(page.locator('#keyboard-shortcuts')).toBeInViewport()
    expect(new URL(page.url()).hash).toBe('')
    // Scrolled past, the contents stick to the top of the screen
    await expect(toc.locator('[data-sticky]').first()).toHaveAttribute(
      'data-sticky',
      'true'
    )
  })
})
