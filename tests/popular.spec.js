import { test, expect } from './fixtures.js'

// The popular posts on the home page, and the select that picks Design, Code
// or All. The island hydrates once it scrolls into view, and Astro takes
// the ssr attribute off it then
async function visit(page) {
  await page.goto('/')
  const popular = page.locator('#popular')
  await popular.scrollIntoViewIfNeeded()
  await expect(
    popular.locator('astro-island[component-url*="/popular."]')
  ).not.toHaveAttribute('ssr')
  const titles = popular.locator('article h2')
  // The lists come from view counts, which a build without them leaves empty
  test.skip((await titles.count()) === 0, 'The build has no view counts')
  return {
    popular,
    button: page.locator('#popular-posts').getByRole('button'),
    titles,
    design: await titles.allTextContents(),
  }
}

test('the popular posts switch lists with the mouse', async ({ page }) => {
  const { popular, button, titles, design } = await visit(page)
  await expect(button).toHaveText('Design')
  await expect(titles).toHaveCount(6)

  await button.click()
  const listbox = page.getByRole('listbox')
  await expect(listbox.getByRole('option')).toHaveText([
    'Design',
    'Code',
    'All',
  ])
  await listbox.getByRole('option', { name: 'Code' }).click()
  await expect(listbox).toBeHidden()
  await expect(button).toHaveText('Code')
  await expect(
    popular.getByRole('link', { name: 'Explore code' })
  ).toHaveAttribute('href', '/category/code')
  await expect(titles).not.toHaveText(design)
  await expect(titles).toHaveCount(6)
})

test('the popular posts switch lists from the keyboard', async ({ page }) => {
  const { popular, button, titles, design } = await visit(page)
  const listbox = page.getByRole('listbox')

  // The list opens on the option chosen
  await button.focus()
  await page.keyboard.press('Enter')
  await expect(listbox.getByRole('option', { name: 'Design' })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await expect(listbox.getByRole('option', { name: 'All' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(listbox).toBeHidden()
  await expect(button).toBeFocused()
  await expect(button).toHaveText('All')
  await expect(
    popular.getByRole('link', { name: 'View the archive' })
  ).toHaveAttribute('href', '/blog')
  await expect(titles).not.toHaveText(design)
  await expect(titles).toHaveCount(6)

  // Choosing Design again brings its list back as it was
  await page.keyboard.press('Enter')
  await expect(listbox.getByRole('option', { name: 'All' })).toBeFocused()
  await page.keyboard.press('ArrowUp')
  await page.keyboard.press('ArrowUp')
  await page.keyboard.press('Enter')
  await expect(button).toHaveText('Design')
  await expect(titles).toHaveText(design)
})
