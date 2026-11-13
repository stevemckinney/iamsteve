#!/usr/bin/env node
/**
 * Phase 4’s response matrix: what the edge answers, against production.
 * Each case goes to a target and to https://iamsteve.vercel.app, which skips
 * Cloudflare and, like a preview, isn’t the canonical host, so both send
 * noindex. It compares the status, Location, the headers proxy.js and
 * next.config.js set (vercel.json’s job now), whether Vary names Accept,
 * and the body of markdown and 410 responses. Requests are GET and OPTIONS
 * only, so nothing subscribes, sends, counts a view or writes anywhere.
 *
 *   node scripts/edge-check.mjs http://localhost:4323 [--expected]
 *   VERCEL_BYPASS=… node scripts/edge-check.mjs https://….vercel.app
 *
 * VERCEL_BYPASS is the project’s protection bypass secret, sent to the
 * target only. --expected lists the accepted differences too. Exits 1 when
 * a difference isn’t accepted, here or in a case’s `expect`.
 */
import crypto from 'node:crypto'
import pLimit from 'p-limit'

const PRODUCTION = 'https://iamsteve.vercel.app'
const POST = 'buttons'
const NOTE = 'anything-to-avoid-a-cms'
const MARKDOWN = 'text/markdown'

const SECURITY = [
  'content-security-policy',
  'referrer-policy',
  'x-frame-options',
  'x-content-type-options',
  'x-dns-prefetch-control',
  'strict-transport-security',
  'permissions-policy',
]

const header = (name) => (response) => response.headers.get(name)
const hash = (text) =>
  crypto.createHash('sha256').update(text).digest('hex').slice(0, 12)

// Read from a response. On production, proxy.js set Vary: Accept along with
// the Link header, but Next.js replaced the Vary on its pages, so there the
// Link header stands for it
const FIELDS = {
  status: (response) => response.status,
  location: header('location'),
  type: ({ status, headers }) =>
    status < 300 || status === 404 ? headers.get('content-type') : null,
  cache: header('cache-control'),
  robots: header('x-robots-tag'),
  link: header('link'),
  vary: ({ headers }, production) =>
    /\baccept\b/i.test(headers.get('vary') ?? '') ||
    (production && headers.has('link')),
  acao: header('access-control-allow-origin'),
  ...Object.fromEntries(SECURITY.map((name) => [name, header(name)])),
  body: ({ status, headers, body }) => {
    if (status === 410) return body.length ? 'not empty' : 'empty'
    return headers.get('content-type')?.startsWith(MARKDOWN) ? hash(body) : null
  },
}

// Differences that hold across cases
const ACCEPTED = [
  {
    when: (field, target, production) =>
      field === 'robots' && target === 'noindex' && production === null,
    reason:
      'vercel.json sends noindex off the canonical host on every response. proxy.js skipped static assets, and redirects ran before it',
  },
  {
    when: (field, target, production) =>
      field === 'acao' && target === '*' && production === null,
    reason: 'A static file now, and Vercel sends ACAO * with those',
  },
  {
    when: (field, target, production, test) =>
      test.trailing &&
      ['cache', 'link', 'vary', 'robots', ...SECURITY].includes(field),
    reason:
      'The adapter’s trailing-slash redirect comes after vercel.json’s header routes. On Next.js, Vercel redirected before any headers applied',
  },
]

const markdown = (path, accept = MARKDOWN) => ({ path, headers: { accept } })

// Production lists the oldest posts as the most viewed
const RANKED = {
  body: 'Popular follows real view counts (77ba82b2) when the build has them',
}

const REDIRECTS = [
  '/blog/how-to-use-kerning-tracking',
  '/blog/entry/horizontal‑scrolling‑responsive‑menu',
  '/blog/entry/horizontal-scrolling-responsive-menu-2',
  '/blog/about_version_six',
  '/blog/compass_mixins_you_should_know_about',
  '/downloads',
  '/blog/entry/buttons',
  '/blog/my_svg_workflow_from_awkward_to_simple',
  '/blog/typekit-gems',
  '/blog/stop-headroom.js-hiding-when-your-navigation-is-open',
  '/blog/inline_block',
  '/blog/entry/inline_block',
  '/blog/using_scale_color_in_sass',
  '/blog/entry/using_scale_color_in_sass',
  '/blog/create_a_sass_button_element_mixin',
  '/blog/entry/create_a_sass_button_element_mixin',
  '/blog/entry/sass_hints_tips',
  '/blog/entry/photoshop-grids-using-',
  '/blog/entry/css-grid',
  '/rss',
  '/public/feed',
  '/feed',
  '/feeds',
  '/blog/feed',
  '/static/favicon.ico',
  '/apple-touch-icon-precomposed.png',
  '/android.png',
  '/design',
  '/blog/{site_url}',
  '/category/css/page/2',
  '/subscribe',
  '/blog/about-version-6',
  '/blog/category/code',
  '/category/everything',
  '/$',
  '/index',
  '/visual-design-tips-you-can-apply-immediately',
  '/index.php',
  '/wp-login.php',
  '/wp-admin/setup-config.php',
  '/wp-content',
  '/.env',
  '/login.php',
  // The query carries over, and rules ignore case
  '/feed?x=1',
  '/blog/entry/css-grid?x=1&y=2',
  '/DOWNLOADS',
]

const GONE = [
  '/fonts/InterVariable.woff2',
  '/cdn-cgi/l/email-protection',
  '/blog/:splat',
  '/blog/some-post',
  '/portfolio',
  '/2',
  '/mo',
  '/**',
  '/Users/steve/Sites',
  // Case-sensitive, after the trailing-slash redirect, before tracking
  // parameters, and after the redirects
  '/PORTFOLIO',
  '/users/steve',
  '/portfolio?utm_source=x',
  '/blog/entry/unique',
]

const TRACKING = [
  'URL',
  '_rsc',
  'PageSpeed',
  'source',
  'ref',
  'S',
  'D',
  'C',
  'M',
  'channel_id',
  'entry_id',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
]

const CASES = [
  // Pages and files as they are
  ...[
    '/',
    '/blog',
    `/blog/${POST}`,
    '/notes',
    `/notes/${NOTE}`,
    '/about',
    '/uses',
    '/collections',
    '/collections/code',
    '/category/code',
    '/newsletter',
    '/contact',
    '/nope',
    '/feed.xml',
    '/sitemap.xml',
    '/robots.txt',
    '/llms.txt',
    '/favicon.ico',
    '/icon.svg',
    '/apple-icon.png',
    '/opengraph-image.png',
    '/images/tools.svg',
    '/.well-known/api-catalog',
    '/.well-known/agent-skills/index.json',
    '/.well-known/agent-skills/list-articles/SKILL.md',
    `/api/content/${POST}`,
    `/api/content/notes/${NOTE}`,
    '/api/search',
    `/blog/${POST}.md`,
    `/notes/${NOTE}.md`,
  ].map((path) => ({ path })),
  { path: '/api/content/home', expect: RANKED },
  {
    path: '/index.md',
    expect: { '*': 'New: the home markdown as a file, from phase 2' },
  },
  // On demand, and read only
  { path: '/search?q=css' },
  { path: '/api/newsletter/count' },
  { path: '/api/campaigns' },
  { path: `/api/views/${POST}` },
  { path: '/api/newsletter', method: 'OPTIONS' },
  // Markdown for agents
  { ...markdown('/'), expect: RANKED },
  markdown(`/blog/${POST}`),
  markdown(`/blog/${POST}`, 'text/html, text/markdown;q=0.9'),
  markdown(`/blog/${POST}`, 'TEXT/MARKDOWN'),
  markdown(`/blog/${POST}`, 'text/markdownx'),
  markdown(`/blog/${POST}`, 'application/text/markdown'),
  markdown(`/blog/${POST}.md`, 'text/html'),
  markdown(`/notes/${NOTE}`),
  markdown(`/BLOG/${POST}`),
  {
    ...markdown('/blog/nope'),
    expect: {
      body: 'Not found as markdown in production, the 404 page here',
      cache: 'The markdown route’s day-long cache reaches its 404 too',
    },
  },
  ...['/about', '/uses', '/collections/code'].map((path) => ({
    ...markdown(path),
    expect: {
      '*': 'Production answers a 404 in markdown, as nothing serves it. Here it’s the page',
    },
  })),
  // Redirects, 410s and tracking parameters
  ...REDIRECTS.map((path) => ({ path })),
  ...GONE.map((path) => ({ path })),
  ...TRACKING.map((param) => ({
    path: `/?${param}=x`,
    ...(param === '_rsc' && {
      expect: {
        '*': 'Next.js hides _rsc from middleware, so production never stripped it. Here it goes, as the list intends',
      },
    }),
  })),
  ...[
    '/?utm_source=x&a=1',
    '/?a=1&fbclid=x&b=2&ref=y',
    '/?utm_source',
    '/?UTM_SOURCE=x',
    `/blog/${POST}?ref=x`,
    '/search?q=css&ref=x',
    '/feed.xml?utm_source=x',
    '/images/tools.svg?utm_source=x',
  ].map((path) => ({ path })),
  // Trailing slashes
  ...['/blog/', `/blog/${POST}/`, '/about/', '/blog/?page=2'].map((path) => ({
    path,
    trailing: true,
  })),
]

async function snapshot(base, test, headers = {}) {
  const response = await fetch(new URL(test.path, base), {
    method: test.method ?? 'GET',
    headers: { ...test.headers, ...headers },
    redirect: 'manual',
  })
  return {
    status: response.status,
    headers: response.headers,
    body: await response.text(),
  }
}

function label(test) {
  const accept = test.headers?.accept
  return `${test.method ?? 'GET'} ${test.path}${
    accept ? ` (Accept: ${accept})` : ''
  }`
}

const target = process.argv[2]?.replace(/\/$/, '')
if (!target) {
  console.error('Usage: node scripts/edge-check.mjs <target> [--expected]')
  process.exit(1)
}
const listExpected = process.argv.includes('--expected')
const bypass = process.env.VERCEL_BYPASS
  ? { 'x-vercel-protection-bypass': process.env.VERCEL_BYPASS }
  : {}

const limit = pLimit(6)
const results = await Promise.all(
  CASES.map((test) =>
    limit(async () => {
      const [ours, theirs] = await Promise.all([
        snapshot(target, test, bypass),
        snapshot(PRODUCTION, test),
      ])
      const differences = []
      for (const [field, read] of Object.entries(FIELDS)) {
        const value = read(ours, false) ?? null
        const expected = read(theirs, true) ?? null
        if (value === expected) continue
        const reason =
          test.expect?.[field] ??
          test.expect?.['*'] ??
          ACCEPTED.find(({ when }) => when(field, value, expected, test))
            ?.reason
        differences.push({ field, value, expected, reason })
      }
      return { test, differences }
    })
  )
)

let unexpected = 0
let accepted = 0
for (const { test, differences } of results) {
  const shown = differences.filter(({ reason }) => !reason || listExpected)
  unexpected += differences.filter(({ reason }) => !reason).length
  accepted += differences.filter(({ reason }) => reason).length
  if (!shown.length) continue
  console.log(label(test))
  for (const { field, value, expected, reason } of shown) {
    console.log(`  ${field}: ${value} (production: ${expected})`)
    if (reason) console.log(`    accepted: ${reason}`)
  }
}
console.log(
  `\n${CASES.length} cases: ${unexpected} unexpected differences, ${accepted} accepted`
)
process.exitCode = unexpected ? 1 : 0
