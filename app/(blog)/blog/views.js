'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const getAllPageViews = cache(async () => {
  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return {}
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies().set(name, value, { ...options, path: '/' })
          })
        },
      },
    }
  )

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
})
