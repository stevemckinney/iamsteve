'use server'

import { SupabaseAdmin } from '@/lib/supabase-admin'

export async function Increment(slug) {
  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return null
  }

  const { data, error } = await SupabaseAdmin.rpc(
    process.env.NEXT_PUBLIC_DB_VIEWS_RPC,
    {
      page_slug: slug,
      table_name: process.env.NEXT_PUBLIC_DB_VIEWS_TABLE,
    }
  )

  if (error) {
    console.error('Error incrementing view count:', error)
    return null
  }

  return data
}
