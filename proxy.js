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

function wantsMarkdown(accept) {
  if (!accept) return false
  return /(^|,\s*)text\/markdown(\s*;|\s*,|\s*$)/i.test(accept)
}

function markdownTargetFor(pathname) {
  const blog = pathname.match(/^\/blog\/([^/]+)\/?$/)
  if (blog) return `/api/content/${blog[1]}`

  const note = pathname.match(/^\/notes\/([^/]+)\/?$/)
  if (note) return `/api/content/notes/${note[1]}`

  const collection = pathname.match(/^\/collections\/([^/]+)\/?$/)
  if (collection) return `/api/content/collections/${collection[1]}`

  if (pathname === '/uses' || pathname === '/uses/') {
    return '/api/content/pages/uses'
  }
  if (pathname === '/about' || pathname === '/about/') {
    return '/api/content/pages/about'
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
]

const GONE_PREFIXES = ['/Users/']

export function proxy(request) {
  const { pathname } = request.nextUrl

  // Return 410 Gone for removed resources
  if (GONE_PATHS.includes(pathname)) {
    return new NextResponse(null, { status: 410 })
  }

  for (const prefix of GONE_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      return new NextResponse(null, { status: 410 })
    }
  }

  // Strip junk query parameters
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

  // Markdown content negotiation: agents that send `Accept: text/markdown`
  // get the existing markdown API response in place of the HTML page.
  if (wantsMarkdown(request.headers.get('accept'))) {
    const target = markdownTargetFor(pathname)
    if (target) {
      const rewriteUrl = request.nextUrl.clone()
      rewriteUrl.pathname = target
      return withDiscoveryHeaders(NextResponse.rewrite(rewriteUrl))
    }
  }

  // Handle .md extension requests
  if (pathname.endsWith('.md')) {
    // Blog posts
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace(/^\/blog\//, '').replace(/\.md$/, '')
      return NextResponse.rewrite(new URL(`/api/content/${slug}`, request.url))
    }

    // Collections
    if (pathname.startsWith('/collections/')) {
      const slug = pathname.replace(/^\/collections\//, '').replace(/\.md$/, '')
      return NextResponse.rewrite(
        new URL(`/api/content/collections/${slug}`, request.url)
      )
    }

    // Static pages (uses, about)
    if (pathname === '/uses.md') {
      return NextResponse.rewrite(
        new URL('/api/content/pages/uses', request.url)
      )
    }

    if (pathname === '/about.md') {
      return NextResponse.rewrite(
        new URL('/api/content/pages/about', request.url)
      )
    }

    // Notes
    if (pathname.startsWith('/notes/')) {
      const slug = pathname.replace(/^\/notes\//, '').replace(/\.md$/, '')
      return NextResponse.rewrite(
        new URL(`/api/content/notes/${slug}`, request.url)
      )
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
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|icon).*)',
  ],
}
