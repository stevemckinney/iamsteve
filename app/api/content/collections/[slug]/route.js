import { allCollections } from 'content-collections'

import collections from '@/content/collections'
import siteMetadata from '@/content/metadata'
import { markdownHeaders, markdownNotFound } from '@/lib/agent/markdown'

export async function GET(request, { params }) {
  const { slug } = await params
  const collection = collections.find((c) => c.slugAsParams === slug)

  if (!collection) {
    return markdownNotFound(`/collections/${slug}`)
  }

  // The same match the HTML page makes, so both representations agree.
  const entries = allCollections
    .filter((entry) =>
      entry.collection?.some(
        (name) => name.toLowerCase() === slug.toLowerCase()
      )
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const frontmatter = [
    '---',
    `title: "${collection.title.replace(/"/g, '\\"')}"`,
    `description: "Curated design resources about ${collection.title.toLowerCase()}."`,
    `count: ${entries.length}`,
    `url: ${siteMetadata.siteUrl}/collections/${slug}`,
    '---',
  ].join('\n')

  const body = entries
    .map(
      (entry) =>
        `- [${entry.title}](${entry.url}): added ${entry.date.slice(0, 10)}`
    )
    .join('\n')

  const output = `${frontmatter}

# ${collection.title}

Curated design resources about ${collection.title.toLowerCase()}, collected on
[iamsteve.me](${siteMetadata.siteUrl}/collections).

${body || 'Nothing collected here yet.'}

## Other collections

${collections
  .map((c) => `- [${c.title}](${siteMetadata.siteUrl}${c.slug})`)
  .join('\n')}
`

  return new Response(output, { headers: markdownHeaders })
}
