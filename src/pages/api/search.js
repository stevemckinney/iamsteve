// app/api/search/route.js: every item the search menu and /search look
// through
import { buildIndex } from '../../lib/search-index.js'

export async function GET() {
  return new Response(JSON.stringify(await buildIndex()), {
    headers: { 'Content-Type': 'application/json' },
  })
}
