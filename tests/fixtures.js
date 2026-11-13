// The test and expect every spec imports. Requests to other hosts are
// blocked, so tests never reach analytics, Typekit, embeds or production
// APIs, and pages fail the test if they throw. Playwright calls the
// fixture callback `use`; it’s `run` here, as ESLint reads `use` as a hook
import { test as base, expect } from '@playwright/test'

export const test = base.extend({
  context: async ({ context }, run) => {
    await context.route(/^https?:\/\/(?!localhost[:/])/, (route) =>
      route.abort()
    )
    await run(context)
  },
  page: async ({ page }, run) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error))
    await run(page)
    expect(errors, 'uncaught errors on the page').toEqual([])
  },
})

export { expect }
