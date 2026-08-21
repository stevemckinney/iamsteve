import siteMetadata from '@/content/metadata'

import { notFoundMarkdown } from './not-found'

/**
 * `Vary: Accept` is what stops a shared cache handing the HTML variant to an
 * agent that asked for markdown, or the other way round.
 */
export const MARKDOWN_VARY = 'Accept, Accept-Encoding'

export const markdownHeaders = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'Cache-Control': 'public, max-age=86400, s-maxage=86400',
  Vary: MARKDOWN_VARY,
}

/**
 * A 404 an agent can act on: the same recovery links the HTML 404 page shows,
 * served as markdown. `pathname` is the public URL that was asked for.
 */
export function markdownNotFound(pathname) {
  return new Response(notFoundMarkdown(siteMetadata.siteUrl, pathname), {
    status: 404,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'no-store',
      Vary: MARKDOWN_VARY,
    },
  })
}
