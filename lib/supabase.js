import { cookies } from 'next/headers'
import { createServerClient, createBrowserClient } from '@supabase/ssr'

const SupabaseClientClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const SupabaseServerClient = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    cookies: () => cookies(),
  }
)

export { SupabaseClientClient, SupabaseServerClient }
