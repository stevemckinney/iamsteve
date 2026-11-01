// app/api/content/[slug]/route.js: any post as markdown, whatever its
// status, as on the Next.js site
import { allEntries } from '../../../lib/content.js'
import { postMarkdown } from '../../../lib/markdown-api.js'

export async function getStaticPaths() {
  return (await allEntries('blog')).map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }))
}

export function GET({ props }) {
  return new Response(postMarkdown(props.entry), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
