import { getPublicationUri } from '@/lib/standard-site'

export const dynamic = 'force-static'
export const revalidate = 86400

// Publication verification endpoint.
// Returns the publication record's AT-URI so consumers can confirm that
// iamsteve.me points back to the site.standard.publication record.
export async function GET() {
  const uri = getPublicationUri()

  if (!uri) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(uri, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
