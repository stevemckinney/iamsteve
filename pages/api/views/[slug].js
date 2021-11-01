import { NextApiRequest, NextApiResponse } from 'next'
import { SupabaseAdmin } from '@/lib/supabase-admin'

export default async (NextApiRequest, NextApiResponse) => {
  if (NextApiRequest.method === 'POST') {
    // Call our stored procedure with the page_slug set by the request params slug
    await SupabaseAdmin.rpc('increment_page_view', { page_slug: NextApiRequest.query.slug })
    return NextApiResponse.status(200).json({
      message: `Successfully incremented page: ${NextApiRequest.query.slug}`
    })
  }

  if (NextApiRequest.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const { data } = await SupabaseAdmin.from('pages').select('view_count').filter('slug', 'eq', NextApiRequest.query.slug)

    if (data) {
      return NextApiResponse.status(200).json({
        total: data[0]?.view_count || null
      })
    }
  }

  return NextApiResponse.status(400).json({
    message: 'Unsupported Request'
  });
};