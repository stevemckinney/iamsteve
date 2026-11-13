// app/api/views/[slug]/route.js and lib/supabase-admin.js: records a view
// of a post and answers with its new count. Only production counts; the
// Supabase client is made on first use, so builds need no credentials
import { getEntry } from 'astro:content'
import {
  NEXT_PUBLIC_ENABLE_VIEW_COUNTING,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
  VERCEL_ENV,
} from 'astro:env/server'
import { createClient } from '@supabase/supabase-js'
import { isRoutable } from '../../../lib/content.js'

export const prerender = false

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const noStore = {
  'Cache-Control': 'no-store',
}

function json(body, status = 200) {
  return Response.json(body, { status, headers: noStore })
}

let client

function supabase() {
  client ??= createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false } }
  )
  return client
}

export async function POST({ params, request }) {
  const { slug } = params

  if (!SLUG.test(slug)) {
    return json({ error: 'Invalid slug' }, 400)
  }

  const origin = request.headers.get('origin')
  if (origin) {
    let originHost = ''
    try {
      originHost = new URL(origin).host
    } catch {
      return json({ error: 'Invalid origin' }, 403)
    }

    const host = request.headers.get('host')
    if (host && originHost !== host) {
      return json({ error: 'Invalid origin' }, 403)
    }
  }

  const post = await getEntry('blog', slug)

  if (!post || !isRoutable(post)) {
    return json({ error: 'Not found' }, 404)
  }

  if (
    NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true' ||
    VERCEL_ENV !== 'production'
  ) {
    return json({ views: null })
  }

  const { data, error } = await supabase().rpc('increment_page_view', {
    page_slug: slug,
  })

  if (error) {
    console.error('Error incrementing view count:', error)
    return json({ error: 'Failed to record view' }, 500)
  }

  return json({ views: typeof data === 'number' ? data : null })
}

// What Next.js answers for a route with only POST: OPTIONS lists the
// methods, and anything else is an empty 405
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { Allow: 'OPTIONS, POST', ...noStore },
  })
}

export function ALL() {
  return new Response(null, { status: 405, headers: noStore })
}
