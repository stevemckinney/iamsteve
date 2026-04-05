export const prerender = false

import type { APIRoute } from 'astro'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY
const dbViewsTable = import.meta.env.DB_VIEWS_TABLE || process.env.DB_VIEWS_TABLE || 'page_views'
const dbViewsRpc = import.meta.env.DB_VIEWS_RPC || process.env.DB_VIEWS_RPC || 'increment_page_view'

function getSupabase() {
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey)
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params
  const supabase = getSupabase()

  if (!supabase) {
    return new Response(JSON.stringify({ count: 0 }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { data } = await supabase
    .from(dbViewsTable)
    .select('view_count')
    .eq('slug', slug)
    .single()

  return new Response(JSON.stringify({ count: data?.view_count ?? 0 }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params
  const supabase = getSupabase()

  if (!supabase) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  await supabase.rpc(dbViewsRpc, { page_slug: slug })

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
