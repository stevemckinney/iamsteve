import siteMetadata from '@/content/metadata'
import { apiError } from '@/lib/agent/errors'

/**
 * Anything under /api that no other route claims. Without this an unknown API
 * path falls through to the HTML 404 page, which an agent cannot parse.
 */
const notFound = async (request, { params }) => {
  const { path } = await params

  return apiError({
    status: 404,
    code: 'NOT_FOUND',
    message: `There is no API endpoint at /api/${path.join('/')}.`,
    hint: `Every available endpoint is described at ${siteMetadata.siteUrl}/openapi.json.`,
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
}

export const GET = notFound
export const POST = notFound
export const PUT = notFound
export const PATCH = notFound
export const DELETE = notFound
export const HEAD = notFound
export const OPTIONS = notFound
