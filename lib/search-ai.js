import { allPosts, allNotes, allCollections } from 'content-collections'
import { buildIndex } from '@/lib/search-index'

// Claude reads the whole site in one go. Every entry in the search index
// becomes a numbered line of a catalogue, with enough of what it says to be
// judged by: a post brings its summary, tags and section headings, which
// name what a long post covers better than its summary can, and a link
// brings its domain, which Claude often knows more about than the title says.
//
// Claude answers with numbers. One it makes up matches nothing, so an answer
// can only ever point at a page that exists.

const instructions = `You are the search on iamsteve.me, Steve McKinney’s website about the design and build of websites. It has his blog posts and shorter notes, a few pages, and collections of links to other sites that he recommends.

Someone has typed into the site’s search menu. Choose the entries from the catalogue that best match what they are after. Go by what they mean rather than the exact words they used: a search for free fonts should find foundries and type resources even when no title says free. For links, draw on what you know about each site to judge what it offers.

Answer with up to 8 entries, the best match first, one per line, in this form and nothing else:

<id> | <reason>

The reason tells them in 3 to 10 words what they will find there. They can already see the title, so add to it rather than repeat it. Write it in British English and sentence case, with no full stop. For example:

12 | Pairing typefaces for headings and body text

Leave out entries that only loosely relate. If nothing fits, give an empty answer.

Each line of the catalogue reads id | kind | title | details. A post’s details are its summary, categories, tags and section headings. A link’s are its domain, what kind of site it is and the collections it is in.`

const kinds = {
  post: 'posts',
  note: 'notes',
  page: 'pages',
  category: 'categories',
  collection: 'collections',
  link: 'links',
}

const join = (...parts) => parts.filter(Boolean).join(' | ')

// Notes are short and half have no summary, so their opening goes in too
const opening = (text) => text.replace(/\s+/g, ' ').trim().slice(0, 200)

let built = null

// content-collections data is fixed at build time, so the prompt is the same
// for every search. Byte for byte the same, which is what lets it be cached.
export function catalogue() {
  if (built) return built

  const headings = new Map(
    allPosts.map((post) => [
      post.slug,
      post.headings
        .filter((heading) => heading.level === 'two' && heading.text)
        .map((heading) => heading.text)
        .join('; '),
    ])
  )
  const notes = new Map(allNotes.map((note) => [note.slug, note.content]))
  const links = new Map(allCollections.map((item) => [item.url, item.kind]))

  const entries = buildIndex()
  const lines = entries.map((entry, i) =>
    join(
      i + 1,
      entry.type,
      entry.title,
      entry.summary,
      notes.has(entry.slug) && opening(notes.get(entry.slug)),
      links.get(entry.slug),
      entry.categories.join(', '),
      entry.tags.length > 0 && `tags: ${entry.tags.join(', ')}`,
      headings.get(entry.slug) && `sections: ${headings.get(entry.slug)}`
    )
  )

  built = {
    entries,
    prompt: `${instructions}\n\n<catalogue>\n${lines.join('\n')}\n</catalogue>`,
  }
  return built
}

// What gets asked: the search as typed, and where in the menu it was typed.
// A scope narrows the catalogue by instruction rather than by editing it,
// since an edited catalogue would miss the cache.
export function question(term, node) {
  const search = `<search>${term}</search>`
  if (!node) return search
  const types = node.types.map((type) => kinds[type]).join(' and ')
  return node.within
    ? `${search}\nOnly choose ${types} filed under ${node.label}.`
    : `${search}\nOnly choose ${types}.`
}

// One line of the answer, as the entry it names and why. A line in any other
// form, or naming an id that is not in the catalogue, is no answer at all.
export function read(line) {
  const match = line.match(/^\W*(\d+)\W*?\|\s*(.+?)\s*$/)
  const entry = match && catalogue().entries[Number(match[1]) - 1]
  if (!entry) return null
  return { ...entry, reason: match[2].replace(/\.$/, '').slice(0, 120) }
}

// Whether an entry is somewhere the menu was standing, by the same rule its
// own search uses: the right kind, and filed under the place, or one of the
// places inside it
export function within(node, entry) {
  if (!node) return true
  return (
    node.types.includes(entry.type) &&
    (!node.within ||
      entry.categories?.includes(node.within) ||
      node.children.some((child) => child.slug === entry.slug))
  )
}
