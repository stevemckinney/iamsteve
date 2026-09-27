import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServerKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

const SupabaseAdmin = createClient(supabaseUrl, supabaseServerKey, {
  auth: {
    persistSession: false,
  },
})

export { SupabaseAdmin }
