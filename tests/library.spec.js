import { test, expect } from './fixtures.js'

// The Library menu in the desktop nav. Astro takes the ssr attribute off an
// island once it has hydrated, and a press before then would do nothing
async function open(page) {
  await page.goto('/')
  await expect(
    page.locator('astro-island[component-url*="/library-menu."]')
  ).not.toHaveAttribute('ssr')
  return page.getByRole('button', { name: 'Library' })
}

test('the Library menu opens and closes with the mouse', async ({ page }) => {
  const button = await open(page)
  const menu = page.getByRole('menu')

  await button.click()
  await expect(menu).toBeVisible()
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await expect(menu.getByRole('menuitem')).toHaveText([
    /^Design/,
    /^Code/,
    /^Collections/,
    /^Uses/,
  ])
  await expect(menu.getByRole('menuitem', { name: /^Uses/ })).toHaveAttribute(
    'href',
    '/uses'
  )

  // A click anywhere else closes it
  await page.mouse.click(20, 600)
  await expect(menu).toBeHidden()
  await expect(button).toHaveAttribute('aria-expanded', 'false')
})

test('the Library menu works from the keyboard', async ({ page }) => {
  const button = await open(page)
  const menu = page.getByRole('menu')

  await button.focus()
  await page.keyboard.press('Enter')
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('menuitem', { name: /^Design/ })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(menu.getByRole('menuitem', { name: /^Code/ })).toBeFocused()

  // Escape closes it and gives focus back to the button
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(button).toBeFocused()

  // Enter on an item follows its link
  await page.keyboard.press('ArrowDown')
  await expect(menu.getByRole('menuitem', { name: /^Design/ })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await expect(
    menu.getByRole('menuitem', { name: /^Collections/ })
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL('/collections')
})

test('the Library menu copies the feed URL', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  const button = await open(page)

  await button.click()
  const copy = page.getByRole('menu').getByRole('button')
  await expect(copy).toHaveAccessibleName('Copy feed URL')
  await copy.click()
  await expect(copy).toHaveAccessibleName('Copied')
  const copied = await page.evaluate(() => navigator.clipboard.readText())
  expect(copied).toBe('https://iamsteve.me/feed.xml')
  // The menu stays open, and the label comes back after two seconds
  await expect(page.getByRole('menu')).toBeVisible()
  await expect(copy).toHaveAccessibleName('Copy feed URL', { timeout: 3000 })
})
