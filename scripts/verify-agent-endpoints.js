#!/usr/bin/env node
/**
 * Checks the endpoints and machine-readable files agents rely on, against a
 * running server. Defaults to the local production server:
 *
 *   pnpm build && pnpm serve &
 *   node scripts/verify-agent-endpoints.js
 *   node scripts/verify-agent-endpoints.js https://iamsteve.me
 */
const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')

let failures = 0

function report(name, problems) {
  if (problems.length === 0) {
    console.log(`  ok   ${name}`)
    return
  }
  failures += 1
  console.log(`  FAIL ${name}`)
  for (const problem of problems) console.log(`       ${problem}`)
}

async function check(name, path, expect, options = {}) {
  let response
  let body
  try {
    response = await fetch(`${base}${path}`, { redirect: 'follow', ...options })
    body = await response.text()
  } catch (error) {
    report(name, [`request failed: ${error.message}`])
    return null
  }

  const problems = []
  const type = response.headers.get('content-type') || ''
  const vary = response.headers.get('vary') || ''

  if (expect.status && response.status !== expect.status) {
    problems.push(`expected ${expect.status}, got ${response.status}`)
  }
  if (expect.type && !type.includes(expect.type)) {
    problems.push(`expected ${expect.type}, got "${type}"`)
  }
  if (
    expect.varyIncludes &&
    !vary.toLowerCase().includes(expect.varyIncludes)
  ) {
    problems.push(`Vary is missing ${expect.varyIncludes}, got "${vary}"`)
  }
  for (const fragment of expect.contains || []) {
    if (!body.includes(fragment)) problems.push(`body is missing "${fragment}"`)
  }
  if (expect.minLength && body.length < expect.minLength) {
    problems.push(`body is ${body.length} bytes, wanted ${expect.minLength}`)
  }
  if (expect.json) {
    try {
      const problem = expect.json(JSON.parse(body))
      if (problem) problems.push(problem)
    } catch (error) {
      problems.push(`invalid JSON: ${error.message}`)
    }
  }
  if (expect.body) {
    const problem = expect.body(body, response)
    if (problem) problems.push(problem)
  }

  report(name, problems)
  return body
}

const markdown = { headers: { Accept: 'text/markdown' } }

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function main() {
  console.log(`Verifying ${base}\n`)

  const llms = await fetch(`${base}/llms.txt`).then((response) =>
    response.ok ? response.text() : ''
  )
  const post = llms.match(/\/api\/content\/([a-z0-9-]+)/)?.[1]
  const sitemap = await fetch(`${base}/sitemap.xml`).then((response) =>
    response.ok ? response.text() : ''
  )
  const note = sitemap.match(/\/notes\/([a-z0-9-]+)</)?.[1]
  const collectionsIndex = await fetch(`${base}/collections`).then((response) =>
    response.ok ? response.text() : ''
  )
  const collection = collectionsIndex.match(
    /href="\/collections\/([a-z0-9-]+)"/
  )?.[1]

  console.log('Content without JavaScript')
  await check('homepage renders server-side', '/', {
    status: 200,
    type: 'text/html',
    body: (html) => {
      const text = textOf(html)
      if (text.length < 500) return `only ${text.length} chars of text`
      if (!/<h1[\s>]/.test(html)) return 'no h1 in the raw HTML'
      if (!/<h2[\s>]/.test(html)) return 'no h2 in the raw HTML'
      if (!/<h3[\s>]/.test(html)) return 'flat heading structure, no h3'
      return null
    },
  })

  console.log('\nMarkdown content negotiation')
  await check(
    'homepage as markdown',
    '/',
    { status: 200, type: 'text/markdown', varyIncludes: 'accept' },
    markdown
  )
  if (post) {
    await check(
      'article as markdown',
      `/blog/${post}`,
      {
        status: 200,
        type: 'text/markdown',
        varyIncludes: 'accept',
        contains: ['---'],
      },
      markdown
    )
    await check('article via the .md suffix', `/blog/${post}.md`, {
      status: 200,
      type: 'text/markdown',
      varyIncludes: 'accept',
    })
    await check('article still serves HTML to browsers', `/blog/${post}`, {
      status: 200,
      type: 'text/html',
    })
  }
  if (note) {
    await check(
      'note as markdown',
      `/notes/${note}`,
      { status: 200, type: 'text/markdown', varyIncludes: 'accept' },
      markdown
    )
  }
  if (collection) {
    await check(
      'collection listing as markdown',
      `/collections/${collection}`,
      {
        status: 200,
        type: 'text/markdown',
        varyIncludes: 'accept',
        contains: ['## Other collections'],
      },
      markdown
    )
  }
  for (const page of ['/about', '/uses']) {
    await check(
      `${page} as markdown`,
      page,
      { status: 200, type: 'text/markdown', varyIncludes: 'accept' },
      markdown
    )
  }

  console.log('\nAgent-friendly 404s')
  await check(
    'unknown path returns a real 404',
    '/some-path-that-does-not-exist',
    {
      status: 404,
      type: 'text/html',
      body: (html) => {
        const text = textOf(html)
        if (text.length < 200) return `404 body has only ${text.length} chars`
        for (const href of ['/sitemap.xml', '/llms.txt', '/openapi.json']) {
          if (!html.includes(`href="${href}"`))
            return `404 body does not link ${href}`
        }
        return null
      },
    }
  )
  await check('unknown .md path answers in markdown', '/no-such-page.md', {
    status: 404,
    type: 'text/markdown',
    varyIncludes: 'accept',
    contains: ['# 404 Not Found', '/llms.txt', '/sitemap.xml'],
  })
  await check(
    'unknown article slug answers in markdown',
    '/api/content/no-such-post',
    {
      status: 404,
      type: 'text/markdown',
      contains: ['# 404 Not Found'],
    }
  )
  await check('removed URLs answer 410 with a way forward', '/portfolio', {
    status: 410,
    type: 'text/markdown',
    contains: ['# 410 Gone', '/llms.txt'],
  })

  console.log('\nOpenAPI')
  await check('openapi.json', '/openapi.json', {
    status: 200,
    type: 'application/json',
    json: (spec) => {
      if (!spec.openapi?.startsWith('3.')) return `openapi is "${spec.openapi}"`
      if (!spec.paths || Object.keys(spec.paths).length === 0) return 'no paths'
      if (!spec.components?.schemas?.Error) return 'no Error schema'
      return null
    },
  })

  console.log('\nJSON error responses')
  await check('unknown API path', '/api/does-not-exist', {
    status: 404,
    type: 'application/json',
    json: ({ error }) =>
      error?.code && error?.message && error?.hint
        ? null
        : 'error is missing code, message or hint',
  })
  await check(
    'newsletter rejects a body with no email',
    '/api/newsletter',
    {
      status: 400,
      type: 'application/json',
      json: ({ error }) =>
        error?.code === 'EMAIL_REQUIRED'
          ? null
          : `unexpected code ${error?.code}`,
    },
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    }
  )
  await check(
    'newsletter rejects malformed JSON',
    '/api/newsletter',
    {
      status: 400,
      type: 'application/json',
      json: ({ error }) =>
        error?.code === 'INVALID_JSON'
          ? null
          : `unexpected code ${error?.code}`,
    },
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    }
  )

  console.log('\nDiscovery')
  await check('llms.txt', '/llms.txt', {
    status: 200,
    type: 'text/plain',
    contains: ['/openapi.json'],
  })
  await check('feed.xml', '/feed.xml', { status: 200, type: 'xml' })
  await check('sitemap.xml', '/sitemap.xml', { status: 200, type: 'xml' })
  await check('robots.txt', '/robots.txt', {
    status: 200,
    type: 'text/plain',
    contains: ['Sitemap'],
  })
  await check('api-catalog', '/.well-known/api-catalog', {
    status: 200,
    type: 'linkset+json',
    json: (linkset) =>
      JSON.stringify(linkset).includes('/openapi.json')
        ? null
        : 'the catalog does not point at the OpenAPI description',
  })
  const skills = await check(
    'agent-skills index',
    '/.well-known/agent-skills/index.json',
    {
      status: 200,
      type: 'application/json',
      json: (index) => (index.skills?.length ? null : 'no skills listed'),
    }
  )
  for (const skill of JSON.parse(skills || '{"skills":[]}').skills) {
    await check(`skill ${skill.name}`, new URL(skill.url).pathname, {
      status: 200,
      type: 'text/markdown',
      minLength: 200,
      contains: [`name: ${skill.name}`],
    })
  }
  await check('Link header advertises the API description', '/', {
    status: 200,
    body: (_body, response) => {
      const link = response.headers.get('link') || ''
      return link.includes('rel="service-desc"')
        ? null
        : `Link header has no service-desc: "${link}"`
    },
  })

  console.log(
    failures === 0
      ? '\nAll checks passed'
      : `\n${failures} check${failures === 1 ? '' : 's'} failed`
  )
  process.exit(failures === 0 ? 0 : 1)
}

main()
