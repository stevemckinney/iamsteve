import Anthropic from '@anthropic-ai/sdk'
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

Someone has typed into the site’s search menu. Choose the entries from the catalogue that best match what they are after. Go by what they mean rather than the exact words they used: a search for free fonts should find foundries and type resources even when no title says free.

Look across every kind of entry. The links in the collections matter as much as the posts: a search for colour palettes should find tools for making a palette as well as posts about choosing one. For links, draw on what you know about each site to judge what it offers.

Answer with the ids of up to 8 entries, the best match first, one per line and nothing else. For example:

12
85
3

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

// One line of the answer, as the entry whose id it starts with. A line that
// starts with no id, or one that is not in the catalogue, is no answer at all.
export function read(line) {
  const match = line.match(/^\W*(\d+)/)
  return (match && catalogue().entries[Number(match[1]) - 1]) || null
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

// Claude, through Vercel’s AI Gateway, on a key of its own
export const gateway = 'https://ai-gateway.vercel.sh'

// What the gateway says once the key’s budget for the month is spent
export const spent = (error) =>
  error instanceof Anthropic.APIError &&
  error.type === 'quota_for_entity_exceeded'

// Which model answers, and how, set for each environment in Vercel rather
// than in code. Any model the gateway offers will do, Claude or another
// maker's, as the gateway takes Anthropic's API for all of them.
//
// AI_SEARCH_MODEL    The gateway's id for the model. Haiku unless set:
//                    picking from a list is light work, and every search
//                    pays for it.
// AI_SEARCH_OPTIONS  JSON added to every request, for thinking and the
//                    like. Each model asks for thinking its own way, so it
//                    goes in as that model wants it, such as
//                    {"thinking":{"type":"enabled","budget_tokens":1024}}
//                    or {"output_config":{"effort":"low"}}.
const model = process.env.AI_SEARCH_MODEL || 'anthropic/claude-haiku-4.5'
const options = readOptions(process.env.AI_SEARCH_OPTIONS)

function readOptions(json) {
  try {
    return JSON.parse(json || '{}')
  } catch {
    console.error('AI_SEARCH_OPTIONS is not JSON, so searches go without it')
    return {}
  }
}

// The model’s answer to a search, an entry at a time as it is written. Only
// entries somewhere the search was made come through, and each only once.
export async function* answer(term, node, { signal }) {
  const client = new Anthropic({
    apiKey: process.env.AI_GATEWAY_API_KEY,
    baseURL: gateway,
    timeout: 30_000,
  })
  const prompt = catalogue().prompt
  const started = Date.now()
  const stream = client.messages.stream(
    {
      model,
      // Room for a model that thinks first. One that doesn’t writes a few
      // lines, and only what is written is paid for.
      max_tokens: 4096,
      ...options,
      // The cache marker is Anthropic’s own, so only its models get one
      system: model.startsWith('anthropic/')
        ? [
            {
              type: 'text',
              text: prompt,
              cache_control: { type: 'ephemeral' },
            },
          ]
        : prompt,
      messages: [{ role: 'user', content: question(term, node) }],
    },
    // A reader who has moved on stops the answer, and what it costs
    { signal }
  )

  const seen = new Set()
  const pick = (line) => {
    const match = read(line)
    if (!match || seen.has(match.slug) || !within(node, match)) return null
    seen.add(match.slug)
    return match
  }

  let text = ''
  let usage = {}
  for await (const event of stream) {
    if (event.type === 'message_start') usage = { ...event.message.usage }
    if (event.type === 'message_delta') {
      usage.output_tokens = event.usage?.output_tokens
    }
    if (event.type !== 'content_block_delta') continue
    if (event.delta.type !== 'text_delta') continue
    text += event.delta.text
    const lines = text.split('\n')
    text = lines.pop()
    for (const line of lines) {
      const match = pick(line)
      if (match) yield match
    }
  }
  const match = pick(text)
  if (match) yield match

  // One line a search, so models can be compared on speed and tokens in the
  // function logs. The search itself is left out.
  console.log(
    `AI search: ${model}, ${Date.now() - started}ms, ${seen.size} matches, ` +
      `${usage.input_tokens ?? '?'} in, ` +
      `${usage.cache_read_input_tokens ?? 0} from cache, ` +
      `${usage.output_tokens ?? '?'} out`
  )
}
