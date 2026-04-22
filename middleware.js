import { NextResponse } from 'next/server'

/**
 * Agent discovery middleware
 *
 * Adds RFC 8288 Link response headers pointing to discovery resources, and
 * negotiates markdown for agents that send `Accept: text/markdown` by
 * rewriting to the existing markdown API routes.
 */

const linkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="https://modelcontextprotocol.io/rel/server-card"; type="application/json"',
  '</llms.txt>; rel="https://llmstxt.org/rel/llms"; type="text/plain"',
  '</feed.xml>; rel="alternate"; type="application/rss+xml"; title="RSS feed"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</robots.txt>; rel="https://www.rfc-editor.org/rfc/rfc9309"; type="text/plain"',
].join(', ')

function wantsMarkdown(accept) {
  if (!accept) return false
  // Coarse parse: q-values not strictly required for content negotiation here.
  return /(^|,\s*)text\/markdown(\s*;|\s*,|\s*$)/i.test(accept)
}

function markdownTargetFor(pathname) {
  // Map HTML routes to existing markdown API endpoints.
  const blog = pathname.match(/^\/blog\/([^/]+)\/?$/)
  if (blog) return `/api/content/${blog[1]}`

  const note = pathname.match(/^\/notes\/([^/]+)\/?$/)
  if (note) return `/api/content/notes/${note[1]}`

  return null
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  const accept = request.headers.get('accept') || ''

  // Markdown content negotiation for blog posts and notes.
  if (wantsMarkdown(accept)) {
    const target = markdownTargetFor(pathname)
    if (target) {
      const url = request.nextUrl.clone()
      url.pathname = target
      const response = NextResponse.rewrite(url)
      response.headers.set('Vary', 'Accept')
      response.headers.set('Link', linkHeader)
      return response
    }
  }

  const response = NextResponse.next()

  // Advertise agent discovery resources via Link headers (RFC 8288).
  response.headers.append('Link', linkHeader)

  // Vary on Accept so caches keep HTML and markdown variants distinct.
  response.headers.set('Vary', 'Accept')

  return response
}

export const config = {
  matcher: [
    // Run on all paths except static assets, image optimisation, and the
    // well-known/api routes that serve their own headers.
    '/((?!_next/static|_next/image|_next/data|favicon.ico|images/|icon/|favicons/|api/|\\.well-known/).*)',
  ],
}
