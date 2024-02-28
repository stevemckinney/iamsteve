import { cookies } from 'next/headers'

import {
  createServerComponentClient,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'

const SupabaseClientClient = createClientComponentClient({ cookies })
const SupabaseServerClient = createServerComponentClient({ cookies })

export { SupabaseClientClient, SupabaseServerClient }
