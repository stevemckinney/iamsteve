import { createClient } from '@supabase/supabase-js'

let client

function getClient() {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: false,
        },
      }
    )
  }

  return client
}

const SupabaseAdmin = {
  rpc(...args) {
    return getClient().rpc(...args)
  },
}

export { SupabaseAdmin }
