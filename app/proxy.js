import { NextResponse } from 'next/server'

export function GET(request) {
  const pathname = request.nextUrl.pathname

  // Handle .md extension requests
  if (pathname.endsWith('.md')) {
    const slug = pathname.replace(/^\/blog\//, '').replace(/\.md$/, '')
    return NextResponse.rewrite(new URL(`/api/content/${slug}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/:path*.md'],
}
