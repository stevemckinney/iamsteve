import { devices } from '@playwright/test'
import { test, expect } from './fixtures.js'

// The menu and topics sheets, which only show on narrow screens. Astro
// takes the ssr attribute off an island once it has hydrated, and a tap
// before then would do nothing
test.use({ ...devices['Pixel 7'] })

async function visit(page, url, island) {
  await page.goto(url)
  await expect(
    page.locator(`astro-island[component-url*="/${island}."]`)
  ).not.toHaveAttribute('ssr')
}

// The theme colour in the page’s head
const canvas = 'rgb(241 232 228)'

test('the menu toggle opens the sheet, and Escape closes it', async ({
  page,
}) => {
  await visit(page, '/', 'navigation')
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' })
  const sheet = page.getByRole('dialog', { name: 'Menu' })
  const theme = page.locator('meta[name="theme-color"]')
  await expect(theme).toHaveAttribute('content', canvas)

  await toggle.tap()
  await expect(sheet).toBeVisible()
  await expect(toggle).toHaveAttribute('data-state', 'open')
  // Safari’s bottom bar takes the sheet’s white while it’s open
  await expect(theme).toHaveAttribute('content', 'rgb(255, 255, 255)')
  // The page you’re on is marked
  await expect(sheet.getByRole('link', { name: 'Home' })).toHaveClass(
    /\btext-nav-active\b/
  )
  await expect(sheet.getByRole('link', { name: 'Notes' })).toHaveClass(
    /\btext-emphasis\b/
  )

  await page.keyboard.press('Escape')
  await expect(sheet).toBeHidden()
  await expect(toggle).toHaveAttribute('data-state', 'closed')
  await expect(theme).toHaveAttribute('content', canvas)
})

test('the menu sheet’s links navigate', async ({ page }) => {
  await visit(page, '/', 'navigation')
  await page.getByRole('button', { name: 'Toggle navigation menu' }).tap()
  const sheet = page.getByRole('dialog', { name: 'Menu' })
  await expect(sheet.getByRole('link')).toHaveText([
    'Home',
    'Design',
    'Code',
    'Collections',
    'Notes',
    'About',
    'Uses',
    'Contact',
    'Subscribe',
  ])

  await sheet.getByRole('link', { name: 'Notes' }).tap()
  await expect(page).toHaveURL('/notes')
  await expect(sheet).toBeHidden()
})

test('the menu sheet closes when pulled down', async ({ page }) => {
  await visit(page, '/about', 'navigation')
  await page.getByRole('button', { name: 'Toggle navigation menu' }).tap()
  const sheet = page.getByRole('dialog', { name: 'Menu' })
  await expect(sheet).toBeVisible()
  // A pull is ignored while the sheet is still arriving
  await page.waitForTimeout(400)

  const box = await sheet.boundingBox()
  const x = box.x + box.width / 2
  await page.mouse.move(x, box.y + 12)
  await page.mouse.down()
  await page.mouse.move(x, box.y + 200, { steps: 8 })
  await page.mouse.move(x, box.y + 400, { steps: 8 })
  await page.mouse.up()
  await expect(sheet).toBeHidden()
  await expect(page).toHaveURL('/about')
})

test.describe('in dark mode', () => {
  test.use({ colorScheme: 'dark' })

  test('the sheet colours the browser’s bottom bar', async ({ page }) => {
    await visit(page, '/', 'navigation')
    const theme = page.locator('meta[name="theme-color"]')
    await page.getByRole('button', { name: 'Toggle navigation menu' }).tap()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
    await expect(theme).toHaveAttribute('content', 'rgb(5, 35, 26)')
    await page.keyboard.press('Escape')
    await expect(theme).toHaveAttribute('content', canvas)
  })
})

test('the topics sheet opens on /blog', async ({ page }) => {
  await visit(page, '/blog', 'topics')
  const button = page.getByRole('button', { name: 'Categories' })
  const sheet = page.getByRole('dialog', { name: 'Categories' })

  await button.tap()
  await expect(sheet).toBeVisible()
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await expect(
    sheet.getByRole('menuitem', { name: 'Design', exact: true })
  ).toHaveAttribute('href', '/category/design')

  await page.keyboard.press('Escape')
  await expect(sheet).toBeHidden()

  await button.tap()
  await sheet.getByRole('menuitem', { name: 'Code', exact: true }).tap()
  await expect(page).toHaveURL('/category/code')
})

test('the topics sheet marks the page you’re on', async ({ page }) => {
  await visit(page, '/collections/motion', 'topics')
  // The button reads as a select would, showing the current topic
  await page.getByRole('button', { name: 'Motion' }).tap()
  const sheet = page.getByRole('dialog', { name: 'Collections' })
  const current = sheet.getByRole('menuitem', { name: /^Motion\b/ })
  await expect(current).toHaveAccessibleName(/current page$/)
  await expect(current).toHaveAttribute('data-current', 'true')
  await expect(
    sheet.getByRole('menuitem', { name: 'Colour' })
  ).not.toHaveAttribute('data-current')
})
