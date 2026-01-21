import { NextResponse } from 'next/server'

export function proxy(request) {
  const pathname = request.nextUrl.pathname

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
    '/blog/:path*.md',
    '/collections/:path*.md',
    '/uses.md',
    '/about.md',
    '/notes/:path*.md',
  ],
}
