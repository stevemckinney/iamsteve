#!/usr/bin/env node
/**
 * Builds Astro the way Vercel builds production, so parity, the edge check
 * and the tests see what production would serve: in UTC (dates format in
 * the build machine’s time zone), with view counting on and production’s
 * views table, which the build only reads. .env.local has no publishable
 * key, so the anon key stands in for it (both can read the table).
 *
 *   node scripts/build.mjs [astro build options]
 */
import { spawn } from 'node:child_process'
import { loadEnv } from 'vite'

const env = loadEnv('production', process.cwd(), '')
const child = spawn(
  'pnpm',
  ['exec', 'astro', 'build', ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      TZ: 'UTC',
      NEXT_PUBLIC_DB_VIEWS_TABLE: 'pages',
      NEXT_PUBLIC_ENABLE_VIEW_COUNTING: 'true',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
        env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  }
)
child.on('exit', (code) => process.exit(code ?? 1))
