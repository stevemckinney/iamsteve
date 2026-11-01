// app/api/content/[slug]/route.js: each post with a page as markdown.
// The Next.js route served drafts and closed posts too
import { allEntries, isRoutable } from '../../../lib/content.js'
import { postMarkdown } from '../../../lib/markdown-api.js'

export async function getStaticPaths() {
  return (await allEntries('blog')).filter(isRoutable).map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }))
}

export function GET({ props }) {
  return new Response(postMarkdown(props.entry), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
