// app/api/content/notes/[slug]/route.js: published notes as markdown
import { allEntries, isPublished } from '../../../../lib/content.js'
import { noteMarkdown } from '../../../../lib/markdown-api.js'

export async function getStaticPaths() {
  return (await allEntries('notes')).filter(isPublished).map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }))
}

export function GET({ props }) {
  return new Response(noteMarkdown(props.entry), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
