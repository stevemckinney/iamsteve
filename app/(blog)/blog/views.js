'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const getAllPageViews = cache(async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: pages } = await supabase
    .from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE)
    .select('slug, view_count')

  return pages
})

export default getAllPageViews
