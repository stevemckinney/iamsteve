import { test, expect } from './fixtures.js'

test.beforeEach(async ({ context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
})

const clipboard = (page) => page.evaluate(() => navigator.clipboard.readText())

test('a note’s button copies its link and shows the tick for a moment', async ({
  page,
}) => {
  await page.goto('/notes/pages-within-pages')
  const button = page.locator('[data-copy-link]')
  const [link, tick] = [
    button.locator('svg').first(),
    button.locator('svg').last(),
  ]
  await expect(button).toHaveText('Copy link')
  await expect(tick).toContainClass('opacity-0 scale-75')

  await button.click()
  await expect(button).toHaveText('Copied')
  expect(await clipboard(page)).toBe(
    'https://iamsteve.me/notes/pages-within-pages'
  )
  await expect(link).toContainClass('opacity-0 scale-75')
  await expect(tick).not.toContainClass('opacity-0')

  await expect(button).toHaveText('Copy link', { timeout: 3000 })
  await expect(link).not.toContainClass('opacity-0')
  await expect(tick).toContainClass('opacity-0 scale-75')
})

test('on the notes page, each note’s button copies its own link', async ({
  page,
}) => {
  await page.goto('/notes')
  const note = page.locator('main article').nth(1)
  const href = await note.locator('h2 a').getAttribute('href')
  const button = note.locator('[data-copy-link]').filter({ visible: true })

  await button.focus()
  await page.keyboard.press('Enter')
  await expect(button).toHaveText('Copied')
  expect(await clipboard(page)).toBe(`https://iamsteve.me${href}`)
  await expect(
    page.locator('[data-copy-link]').filter({ hasText: 'Copied' })
  ).toHaveCount(1)
})
