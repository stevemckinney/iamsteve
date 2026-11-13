import { test, expect } from './fixtures.js'

const post = '/blog/rules-i-follow-when-typesetting'

// One comparison, hydrated: client:visible waits until it’s on screen
async function comparison(page, name) {
  const region = page.getByRole('region', { name })
  await region.scrollIntoViewIfNeeded()
  await expect(
    page
      .locator('astro-island[component-url*="comparison-images"]')
      .filter({ has: region })
  ).not.toHaveAttribute('ssr')
  return {
    tab: (label) => region.getByRole('tab', { name: label }),
    images: region.locator('[tabindex="0"]'),
    image: (index) => region.locator('img').nth(index),
    status: region.locator('.sr-only'),
  }
}

async function expectShowing({ tab, image, status }, label, index) {
  await expect(tab(label)).toHaveAttribute('aria-selected', 'true')
  await expect(image(index)).toHaveAttribute('data-active', 'true')
  await expect(image(index)).toHaveCSS('opacity', '1')
  await expect(status).toHaveText(
    `Use the segmented control above to switch between views. Currently showing ${label} state.`
  )
}

test('Enter and Space on the images move to the next view', async ({
  page,
}) => {
  await page.goto(post)
  const parts = await comparison(
    page,
    'Compare typesetting with and without tracking'
  )
  await expectShowing(parts, 'Off', 0)

  await parts.images.focus()
  await page.keyboard.press('Enter')
  await expectShowing(parts, 'On', 1)
  await expect(parts.tab('Off')).toHaveAttribute('aria-selected', 'false')
  await expect(parts.image(0)).toHaveAttribute('data-active', 'false')

  await page.keyboard.press('Enter')
  await expectShowing(parts, 'Compare', 2)

  // Space wraps round to the first view, and doesn’t scroll the page
  const scrolled = await page.evaluate(() => window.scrollY)
  await page.keyboard.press('Space')
  await expectShowing(parts, 'Off', 0)
  expect(await page.evaluate(() => window.scrollY)).toBe(scrolled)
})

test('a tab shows its view', async ({ page }) => {
  await page.goto(post)
  const parts = await comparison(
    page,
    'Compare typesetting with and without leading'
  )
  // This one opens on its default, the second option
  await expectShowing(parts, 'On', 1)

  await parts.tab('Off').click()
  await expectShowing(parts, 'Off', 0)
  await expect(parts.image(1)).toHaveAttribute('data-active', 'false')
})
