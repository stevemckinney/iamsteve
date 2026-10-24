// Page view counts from Supabase, read once per build. Without the
// environment variables every count is missing
import { createClient } from '@supabase/supabase-js'

let views

export function pageViews() {
  views ??= read()
  return views
}

async function read() {
  const url = import.meta.env.NEXT_PUBLIC_SUPABASE_URL
  const key = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const table = import.meta.env.NEXT_PUBLIC_DB_VIEWS_TABLE
  if (!url || !key || !table) return new Map()

  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const { data, error } = await supabase.from(table).select('slug, view_count')
  if (error) {
    console.error('Error fetching page views:', error.message)
    return new Map()
  }
  return new Map(data.map(({ slug, view_count }) => [slug, view_count]))
}
