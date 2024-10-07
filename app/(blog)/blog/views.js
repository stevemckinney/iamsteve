'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const getAllPageViews = cache(async () => {
  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return {}
  }

  const supabase = createServerComponentClient({ cookies })
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
