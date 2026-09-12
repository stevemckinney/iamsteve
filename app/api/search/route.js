import { NextResponse } from 'next/server'
import { buildIndex } from '@/lib/search-index'

export async function GET() {
  return NextResponse.json(buildIndex(), {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
