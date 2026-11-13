// Smoke tests for the Astro build’s islands and endpoints. They run against
// the build in .vercel/output through scripts/serve.mjs, so build first:
//   pnpm exec astro build && pnpm exec playwright test
// PORT picks the server’s port (4310 by default)
import { defineConfig, devices } from '@playwright/test'

const port = Number(process.env.PORT ?? 4310)

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? 'dot' : 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `node scripts/serve.mjs --port ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !process.env.CI,
  },
})
