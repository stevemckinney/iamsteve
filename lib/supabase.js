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

export { SupabaseClientClient, SupabaseServerClient }
