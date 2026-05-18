import { NextResponse } from 'next/server'

// Agent discovery resources advertised via RFC 8288 Link headers.
const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"; type="application/json"',
  '</llms.txt>; rel="https://llmstxt.org/rel/llms"; type="text/plain"',
  '</feed.xml>; rel="alternate"; type="application/rss+xml"; title="RSS feed"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</robots.txt>; rel="https://www.rfc-editor.org/rfc/rfc9309"; type="text/plain"',
].join(', ')

const MARKDOWN_ACCEPT = /(^|,\s*)text\/markdown(\s*;|\s*,|\s*$)/i

const MARKDOWN_ROUTES = [
  { pattern: /^\/$/, target: () => '/api/content/home' },
  { pattern: /^\/blog\/(.+)$/, target: (slug) => `/api/content/${slug}` },
  {
    pattern: /^\/notes\/(.+)$/,
    target: (slug) => `/api/content/notes/${slug}`,
  },
  {
    pattern: /^\/collections\/(.+)$/,
    target: (slug) => `/api/content/collections/${slug}`,
  },
  { pattern: /^\/uses$/, target: () => '/api/content/pages/uses' },
  { pattern: /^\/about$/, target: () => '/api/content/pages/about' },
]

function markdownTargetFor(pathname) {
  const normalized = pathname.replace(/\.md$/, '').replace(/\/$/, '') || '/'
  for (const { pattern, target } of MARKDOWN_ROUTES) {
    const match = normalized.match(pattern)
    if (match) return target(match[1])
  }
  return null
}

function withDiscoveryHeaders(response) {
  response.headers.append('Link', LINK_HEADER)
  response.headers.set('Vary', 'Accept')
  return response
}

const STRIP_PARAMS = [
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

const GONE_PATHS = [
  '/fonts/InterVariable.woff2',
  '/cdn-cgi/l/email-protection',
  '/blog/:splat',
  '/blog/entry/*',
  '/blog/entry/[slug]',
  '/portfolio',
  '/blog/entry/unique',
  '/blog/some-post',
  '/2',
  '/mo',
  '/**',
]

const GONE_PREFIXES = ['/Users/']

export function proxy(request) {
  const { pathname } = request.nextUrl

  if (GONE_PATHS.includes(pathname)) {
    return new NextResponse(null, { status: 410 })
  }

  for (const prefix of GONE_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      return new NextResponse(null, { status: 410 })
    }
  }

  const url = request.nextUrl.clone()
  let stripped = false

  for (const param of STRIP_PARAMS) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param)
      stripped = true
    }
  }

  if (stripped) {
    return NextResponse.redirect(url, 301)
  }

  // Serve markdown when the agent asks for it via Accept header or .md suffix.
  const acceptsMarkdown = MARKDOWN_ACCEPT.test(
    request.headers.get('accept') || ''
  )
  if (acceptsMarkdown || pathname.endsWith('.md')) {
    const target = markdownTargetFor(pathname)
    if (target) {
      const rewriteUrl = request.nextUrl.clone()
      rewriteUrl.pathname = target
      return withDiscoveryHeaders(NextResponse.rewrite(rewriteUrl))
    }
  }

  return withDiscoveryHeaders(NextResponse.next())
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     * - public assets (images, fonts, icons)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|icon).*)',
  ],
}
