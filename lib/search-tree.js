import collectionsConfig from '@/content/collections'
import categoriesConfig from '@/content/categories'
import { typeIcon } from '@/lib/search'

// The menu browses the site as a tree. Every node is somewhere you can stand:
// enter it and you see its children first, then what it holds from the index,
// and a search from there stays inside it.
//
// Children come from config, so a node draws the moment it opens; contents
// wait on the index. A node's `within` names the category or collection its
// contents must carry, which is how posts and links find their way in — the
// index already tags a post with both its parent and its leaf category, and a
// link with its collection, so one rule reaches every level.

const categories = categoriesConfig.filter((item) => !item.exclude)

function category(config, types) {
  return {
    id: config.slugAsParams,
    type: 'category',
    label: config.title,
    icon: config.icon,
    placeholder: `Search ${config.title.toLowerCase()}…`,
    slug: config.slug,
    types,
    within: config.title,
    children: categories
      .filter((item) => item.parent === config.slugAsParams)
      .map((item) => category(item, ['post'])),
  }
}

export const root = [
  {
    id: 'collections',
    type: 'page',
    label: 'Collections',
    icon: typeIcon('collection'),
    placeholder: 'Search collections…',
    slug: '/collections',
    types: ['collection', 'link'],
    children: collectionsConfig.map((item) => ({
      id: item.slugAsParams,
      type: 'collection',
      label: item.title,
      icon: item.icon,
      placeholder: `Search ${item.title.toLowerCase()}…`,
      slug: item.slug,
      types: ['link'],
      within: item.title,
      children: [],
    })),
  },
  {
    id: 'blog',
    type: 'page',
    label: 'Blog',
    icon: typeIcon('post'),
    placeholder: 'Search the blog…',
    slug: '/blog',
    types: ['post', 'category'],
    children: categories
      .filter((item) => !item.parent)
      .map((item) => category(item, ['post', 'category'])),
  },
  {
    id: 'notes',
    type: 'page',
    label: 'Notes',
    icon: typeIcon('note'),
    placeholder: 'Search notes…',
    slug: '/notes',
    types: ['note'],
    children: [],
  },
]

// A path is the ids from the root down. An id that is not there ends the walk,
// so a stale path lands on the nearest node that still exists.
export function resolve(path) {
  let nodes = root
  let node = null
  for (const id of path) {
    const next = nodes.find((item) => item.id === id)
    if (!next) break
    node = next
    nodes = next.children
  }
  return node
}

// Whether an index entry belongs under a node
export function holds(node, entry) {
  return (
    node.types.includes(entry.type) &&
    (!node.within || entry.categories?.includes(node.within))
  )
}

// What a node lists from the index. Categories and collections are not listed
// here — the node's children stand for them, and can be entered.
const represented = new Set(['category', 'collection'])

export function contents(node, index) {
  return (index ?? []).filter(
    (entry) => holds(node, entry) && !represented.has(entry.type)
  )
}

// The children a node lists. A category with nothing in it is left out, and
// the index is the judge: it carries only the categories that have posts.
// Until it has loaded there is nothing to judge by, so every child shows.
export function listed(node, index) {
  const nodes = node ? node.children : root
  if (!index) return nodes
  return nodes.filter(
    (item) =>
      item.type !== 'category' ||
      index.some(
        (entry) => entry.type === 'category' && entry.slug === item.slug
      )
  )
}

// Where a page stands in the tree, by its slug, so a row for that page can
// be entered as well as opened wherever it turns up
const places = new Map()
function place(nodes, path) {
  for (const node of nodes) {
    const here = [...path, node.id]
    places.set(node.slug, here)
    place(node.children, here)
  }
}
place(root, [])

export function pathTo(slug) {
  return places.get(slug)
}

// Children whose name starts with what was typed, so Tab can go there
export function matching(node, query, index) {
  const typed = query.trim().toLowerCase()
  if (!typed) return []
  return listed(node, index).filter((item) =>
    item.label.toLowerCase().startsWith(typed)
  )
}
