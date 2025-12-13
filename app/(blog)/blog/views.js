'use server'

import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// Helper function to create Supabase client
async function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        async getAll() {
          return (await cookies()).getAll()
        },
        async setAll(cookiesToSet) {
          const cookieStore = await cookies()
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, { ...options, path: '/' })
          })
        },
      },
    }
  )
}

// Optimized function to fetch a single page view count
export const getPageView = cache(async (slug) => {
  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return 0
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE)
    .select('view_count')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching page view:', error)
    return 0
  }

  return data?.view_count || 0
})

// Internal function to fetch all page views
async function _getAllPageViews() {
  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return {}
  }

  const supabase = await createClient()

  const { data: pages, error } = await supabase
    .from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE)
    .select('slug, view_count')

  if (error) {
    console.error('Error fetching page views:', error)
    return {}
  }

  return pages.reduce((acc, page) => {
    acc[page.slug] = page.view_count
    return acc
  }, {})
}

// Cached version of getAllPageViews with 5-minute revalidation
export const getAllPageViews = unstable_cache(
  async () => _getAllPageViews(),
  ['all-page-views'],
  {
    revalidate: 300, // 5 minutes
    tags: ['page-views'],
  }
)
