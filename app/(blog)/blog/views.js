import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { createClient } from '@supabase/supabase-js'

function createReadClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: false,
      },
    }
  )
}

async function readPageView(slug) {
  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return 0
  }

  const supabase = createReadClient()

  const { data, error } = await supabase
    .from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE)
    .select('view_count')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching page view:', error)
    throw error
  }

  return data?.view_count || 0
}

export const getPageView = cache((slug) =>
  unstable_cache(() => readPageView(slug), ['page-view', slug], {
    revalidate: 3600,
    tags: [`views:${slug}`],
  })()
)

async function readAllPageViews() {
  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return {}
  }

  const supabase = createReadClient()

  const { data, error } = await supabase
    .from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE)
    .select('slug, view_count')

  if (error) {
    console.error('Error fetching page views:', error)
    return {}
  }

  return (data || []).reduce((acc, page) => {
    acc[page.slug] = page.view_count
    return acc
  }, {})
}

export const getAllPageViews = unstable_cache(
  readAllPageViews,
  ['all-page-views'],
  {
    revalidate: 300,
    tags: ['page-views'],
  }
)
