'use client'

import { cache } from 'react'
import { SupabaseAdmin } from '@/lib/supabase-admin'

const Increment = cache(async (slug) => {
  const { data: page, error } = await SupabaseAdmin.rpc(process.env.NEXT_PUBLIC_DB_VIEWS_RPC, {
    page_slug: slug,
  })

  return page
})

export default Increment
