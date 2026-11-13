import { test, expect } from './fixtures.js'

test('a code figure copies its lines and shows the tick', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  // The first block is numbered: p { and its four declarations
  await page.goto('/blog/rules-i-follow-when-typesetting')
  const button = page.locator('[data-copy-code]').first()

  await button.click()
  await expect(button).toHaveAttribute('aria-label', 'Copied')
  const copied = await page.evaluate(() => navigator.clipboard.readText())
  expect(copied.split('\n')).toEqual([
    'p {',
    '  hanging-punctuation: none;',
    '  hanging-punctuation: first;',
    '  hanging-punctuation: last;',
    '  hanging-punctuation: allow-end;',
    '}',
  ])
  await expect(button).toHaveAttribute('aria-label', 'Copy code', {
    timeout: 3000,
  })
})
