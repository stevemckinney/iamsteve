import collections from '@/content/collections'

// Collection items store their topic as a raw frontmatter string, which is not
// always the display name — `ux-design` rather than `UX design`. Resolve it
// against the collections config, falling back to the raw value.
export function collectionTitle(collection) {
  const config = collections.find(
    (c) => c.slugAsParams === collection.toLowerCase()
  )
  return config ? config.title : collection
}
