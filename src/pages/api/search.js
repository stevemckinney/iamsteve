// app/api/search/route.js: every item the search menu and /search look
// through, from content in content-collections’ shapes
import { searchItems } from '../../../lib/search-items.js'
import { allEntries } from '../../lib/content.js'

const shaped = async (collection, shape) =>
  (await allEntries(collection)).map(shape)

export async function GET() {
  const items = searchItems({
    allPosts: await shaped('blog', ({ id, data }) => ({
      ...data,
      slug: `/blog/${id}`,
    })),
    allNotes: await shaped('notes', ({ id, data }) => ({
      ...data,
      slug: `/notes/${id}`,
    })),
    allPages: await shaped('pages', ({ id, data }) => ({
      ...data,
      slugAsParams: id,
    })),
    allCollections: await shaped('collections', ({ data }) => data),
  })

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  })
}
