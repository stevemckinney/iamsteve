import { NextResponse } from 'next/server'

import siteMetadata from '@/content/metadata'
import { notFoundMarkdown, goneMarkdown } from '@/lib/agent/not-found'

// Agent discovery resources advertised via RFC 8288 Link headers.
const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"; type="application/json"',
  '</openapi.json>; rel="service-desc"; type="application/json"',
  '</llms.txt>; rel="https://llmstxt.org/rel/llms"; type="text/plain"',
  '</feed.xml>; rel="alternate"; type="application/rss+xml"; title="RSS feed"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</robots.txt>; rel="https://www.rfc-editor.org/rfc/rfc9309"; type="text/plain"',
].join(', ')

const MARKDOWN_ACCEPT = /(^|,\s*)text\/markdown(\s*;|\s*,|\s*$)/i

// Paths served from disk or by a route handler. They answer for themselves, so
// negotiation must not touch them: `/.well-known/agent-skills/*/SKILL.md` is a
// real file and would otherwise be swallowed by the markdown 404 below.
const RESERVED_PREFIXES = ['/.well-known/', '/api/', '/_next/']

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

// `Vary` is deliberately not set here. Next.js overwrites it on every page
// response with its own RSC token list, so `Accept` has to be added at the CDN
// for the negotiated paths — see the Vary rules in netlify.toml and
// vercel.json. Markdown responses set their own `Vary` in the route handler.
function withDiscoveryHeaders(response) {
  response.headers.append('Link', LINK_HEADER)
  return response
}

const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'Cache-Control': 'no-store',
  Vary: 'Accept, Accept-Encoding',
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

// Only the canonical host may be indexed. Archive subdomains, branch
// deploys and previews stay crawlable so Google can see the noindex.
const INDEXABLE_HOSTS = ['iamsteve.me', 'localhost']

export function proxy(request) {
  const { pathname } = request.nextUrl

  const respond = (response) => {
    if (!INDEXABLE_HOSTS.includes(request.nextUrl.hostname)) {
      response.headers.set('X-Robots-Tag', 'noindex')
    }
    return response
  }

  const isGone =
    GONE_PATHS.includes(pathname) ||
    GONE_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (isGone) {
    // A bare 410 tells an agent nothing about where to go instead.
    return respond(
      new NextResponse(goneMarkdown(siteMetadata.siteUrl, pathname), {
        status: 410,
        headers: MARKDOWN_HEADERS,
      })
    )
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
    return respond(NextResponse.redirect(url, 301))
  }

  // Serve markdown when the agent asks for it via Accept header or .md suffix.
  const acceptsMarkdown = MARKDOWN_ACCEPT.test(
    request.headers.get('accept') || ''
  )
  const reserved = RESERVED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )
  const wantsMarkdown =
    (acceptsMarkdown || pathname.endsWith('.md')) && !reserved

  if (wantsMarkdown) {
    const target = markdownTargetFor(pathname)
    if (target) {
      const rewriteUrl = request.nextUrl.clone()
      rewriteUrl.pathname = target
      return respond(withDiscoveryHeaders(NextResponse.rewrite(rewriteUrl)))
    }

    // A `.md` URL with no markdown representation never existed as a page, so
    // answer in the format that was asked for rather than the HTML 404.
    if (pathname.endsWith('.md')) {
      return respond(
        withDiscoveryHeaders(
          new NextResponse(notFoundMarkdown(siteMetadata.siteUrl, pathname), {
            status: 404,
            headers: MARKDOWN_HEADERS,
          })
        )
      )
    }
  }

  return respond(withDiscoveryHeaders(NextResponse.next()))
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
