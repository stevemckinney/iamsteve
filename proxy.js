import { NextResponse } from 'next/server'

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
]

const GONE_PATHS = ['/fonts/InterVariable.woff2', '/cdn-cgi/l/email-protection']

export function proxy(request) {
  const { pathname } = request.nextUrl

  // Return 410 Gone for removed resources
  if (GONE_PATHS.includes(pathname)) {
    return new NextResponse(null, { status: 410 })
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

  return NextResponse.next()
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
