import { allPosts } from 'content-collections'
import { SupabaseAdmin } from '@/lib/supabase-admin'

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const noStore = {
  'Cache-Control': 'no-store',
}

function json(body, status = 200) {
  return Response.json(body, { status, headers: noStore })
}

export const dynamic = 'force-dynamic'

export async function POST(request, context) {
  const { slug } = await context.params

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

  const post = allPosts.find(
    (item) =>
      item.slugAsParams === slug &&
      (item.status === 'open' || item.status === 'unlisted')
  )

  if (!post) {
    return json({ error: 'Not found' }, 404)
  }

  if (process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING !== 'true') {
    return json({ views: null })
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
    return json({ error: 'Failed to record view' }, 500)
  }

  return json({ views: typeof data === 'number' ? data : null })
}
