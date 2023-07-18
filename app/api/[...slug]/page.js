/* eslint-disable import/no-anonymous-default-export */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function increment(slug) {
  const supabase = createServerComponentClient({ cookies })
  const { data: post } = await supabase.from('pages').select().match({ slug }).single()


  let { data: pages, error } = await supabase
    .from('pages')
    .select('view_count')
    .match({ slug })
    .single()


  const views = !data.length ? 0 : Number(data[0].count);
}

const isProduction = process.env.NODE_ENV === 'production'

export default async (NextApiRequest, NextApiResponse) => {
  if (isProduction && NextApiRequest.method === 'POST') {
    // Call our stored procedure with the page_slug set by the request params slug
    await SupabaseAdmin.rpc('increment_page_view', { page_slug: NextApiRequest.query.slug })
    return NextApiResponse.status(200).json({
      message: `Successfully incremented page: ${NextApiRequest.query.slug}`,
    })
  }

  if (NextApiRequest.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await SupabaseAdmin.from('pages')
      .select('view_count')
      .filter('slug', 'eq', NextApiRequest.query.slug)

    if (data) {
      return NextApiResponse.status(200).json({
        total: data[0]?.view_count || null,
      })
    }
  }

  if (!isProduction) return

  return NextApiResponse.status(400).json({
    message: 'Unsupported Request',
  })
}
