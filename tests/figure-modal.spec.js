import { devices } from '@playwright/test'
import { test, expect } from './fixtures.js'

const note = '/notes/pages-within-pages'
const alt = 'Apple M5 processor section'
const src = '/images/notes/pages-within-pages-apple.png'

// The trigger, once its island has hydrated, which client:visible leaves
// until it’s on screen
async function trigger(page) {
  const button = page.getByRole('button', { name: `Enlarge image: ${alt}` })
  await button.scrollIntoViewIfNeeded()
  await expect(
    page
      .locator('astro-island[component-url*="figure-modal"]')
      .filter({ has: button })
  ).not.toHaveAttribute('ssr')
  return button
}

async function open(page) {
  await page.goto(note)
  const button = await trigger(page)
  await button.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  // The size the image fits at is read once it loads
  await expect(dialog.locator('img')).toHaveJSProperty('complete', true)
  return { button, dialog }
}

// Where motion has moved the image to: its scale and offset
const transform = (page) =>
  page
    .getByRole('dialog')
    .locator('.touch-none')
    .evaluate((element) => {
      const { transform } = element.style
      const number = (pattern, fallback) =>
        Number(transform.match(pattern)?.[1] ?? fallback)
      return {
        scale: Math.round(number(/scale\(([-\d.]+)\)/, 1) * 100) / 100,
        x: Math.round(number(/translateX\(([-\d.]+)px\)/, 0)),
        y: Math.round(number(/translateY\(([-\d.]+)px\)/, 0)),
      }
    })

test.describe('on desktop', () => {
  test('the button lies over the figure rather than around it', async ({
    page,
  }) => {
    await page.goto(note)
    const button = await trigger(page)
    const figure = page.locator('figure').filter({ hasText: alt })
    await expect(button.locator('figure')).toHaveCount(0)
    expect(await button.boundingBox()).toEqual(await figure.boundingBox())
  })

  test('the figure opens its image, and Escape or a button closes it', async ({
    page,
  }) => {
    const { button, dialog } = await open(page)
    await expect(dialog.locator('img')).toHaveAttribute('src', src)
    await expect(dialog.locator('img')).toHaveAttribute('alt', alt)

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(button).toBeFocused()

    await button.click()
    await dialog.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(dialog).toBeHidden()

    // At its fitted size, a click on the image closes it too
    await button.click()
    await dialog.getByRole('button', { name: 'Close image' }).click()
    await expect(dialog).toBeHidden()
  })

  test('keys zoom and pan the image', async ({ page }) => {
    await open(page)

    await page.keyboard.press('+')
    await expect.poll(() => transform(page)).toEqual({ scale: 1.5, x: 0, y: 0 })
    await page.keyboard.press('=')
    await expect.poll(() => transform(page)).toEqual({ scale: 2, x: 0, y: 0 })

    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowUp')
    await expect.poll(() => transform(page)).toEqual({ scale: 2, x: 60, y: 60 })

    await page.keyboard.press('-')
    await expect.poll(() => transform(page)).toMatchObject({ scale: 1.5 })
    await page.keyboard.press('0')
    await expect.poll(() => transform(page)).toEqual({ scale: 1, x: 0, y: 0 })
  })

  test('the wheel zooms, and a double click zooms back out', async ({
    page,
  }) => {
    await open(page)
    const { width, height } = page.viewportSize()
    await page.mouse.move(width / 2, height / 2)

    await page.mouse.wheel(0, -100)
    await expect.poll(() => transform(page)).toMatchObject({ scale: 1.5 })

    await page.mouse.dblclick(width / 2, height / 2)
    await expect.poll(() => transform(page)).toEqual({ scale: 1, x: 0, y: 0 })
    await expect(page.getByRole('dialog')).toBeVisible()
  })
})

test.describe('on a phone', () => {
  // A describe group can’t switch browsers, so leave Pixel 7’s out
  const { defaultBrowserType, ...pixel } = devices['Pixel 7']
  test.use(pixel)

  test('a pinch zooms, a double tap zooms out and a tap closes', async ({
    page,
  }) => {
    const { dialog } = await open(page)
    const { width, height } = page.viewportSize()
    const [x, y] = [width / 2, height / 2]
    const cdp = await page.context().newCDPSession(page)
    const touch = (type, touchPoints) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints })
    const tap = async () => {
      await touch('touchStart', [{ x, y, id: 0 }])
      await touch('touchEnd', [])
    }

    await touch('touchStart', [
      { x: x - 20, y, id: 0 },
      { x: x + 20, y, id: 1 },
    ])
    for (let spread = 30; spread <= 80; spread += 10) {
      await touch('touchMove', [
        { x: x - spread, y, id: 0 },
        { x: x + spread, y, id: 1 },
      ])
    }
    await touch('touchEnd', [])
    await expect.poll(() => transform(page)).toMatchObject({ scale: 4 })

    await tap()
    await tap()
    await expect.poll(() => transform(page)).toEqual({ scale: 1, x: 0, y: 0 })
    await expect(dialog).toBeVisible()

    await tap()
    await expect(dialog).toBeHidden()
  })
})
