/**
 * Compare each post body in the Astro build with the live site.
 *
 * Reads dist/blog/<slug>/index.html, fetches https://iamsteve.me/blog/<slug>
 * (cached in node_modules/.cache/compare-posts), and compares the children of
 * #article once both are normalised. Production wraps the MDX in the post
 * layout, so the comparison starts at the first node of the build’s body.
 *
 * Set aside as expected: attribute and class order, whitespace, comments,
 * next/image’s srcset, data-nimg and ?w= queries, react-aria’s generated ids,
 * and Cloudflare’s http to https link rewrites. Production code samples that
 * Cloudflare’s email obfuscation mangled are reported separately.
 *
 * Usage: pnpm exec astro build && node scripts/compare-posts.mjs [slug …]
 */
import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'

const ORIGIN = 'https://iamsteve.me'
const DIST = 'dist/blog'
const CACHE = 'node_modules/.cache/compare-posts'
const DROP = new Set([
  'srcSet',
  'dataNimg',
  'dataRac',
  'dataReactAriaPressable',
  'dataCopyCode',
])

const parser = unified().use(rehypeParse)
const printer = unified().use(rehypeStringify)

function findById(node, id) {
  if (node.properties?.id === id) return node
  for (const child of node.children || []) {
    const found = findById(child, id)
    if (found) return found
  }
  return null
}

function normalise(node) {
  if (node.type === 'text') {
    const value = node.value.replace(/\s+/g, ' ')
    return value.trim() ? { type: 'text', value } : null
  }
  if (node.type !== 'element') return null

  const properties = {}
  for (const key of Object.keys(node.properties).sort()) {
    let value = node.properties[key]
    if (DROP.has(key)) continue
    if (key === 'id' && String(value).startsWith('react-aria')) continue
    if (key === 'tabIndex' && node.tagName === 'button') continue
    if (key === 'className') value = [...value].sort()
    if (key === 'src') value = String(value).replace(/\?w=\d+&q=\d+$/, '')
    if (key === 'href') value = String(value).replace(/^http:\/\//, 'https://')
    if (key === 'style') {
      value = String(value).replace(/color:\s*transparent;?/, '').trim()
      if (!value) continue
    }
    // React writes a true data attribute as "true", Astro writes it bare
    if (key.startsWith('data') && value === 'true') value = ''
    properties[key] = value
  }

  // React splits text around expressions with <!-- --> comments, so drop
  // the comments and merge the text either side
  const children = []
  for (const child of node.children) {
    if (child.type === 'comment') continue
    const last = children[children.length - 1]
    if (child.type === 'text' && last?.type === 'text') last.value += child.value
    else if (child.type === 'text') children.push({ ...child })
    else children.push(child)
  }

  return {
    type: 'element',
    tagName: node.tagName,
    properties,
    children: children.map(normalise).filter(Boolean),
  }
}

function body(html, label) {
  const article = findById(parser.parse(html), 'article')
  if (!article) throw new Error(`No #article in ${label}`)
  return normalise(article).children.map((child) =>
    printer.stringify({ type: 'root', children: [child] })
  )
}

async function production(slug) {
  const file = path.join(CACHE, `${slug}.html`)
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8')
  const response = await fetch(`${ORIGIN}/blog/${slug}`)
  if (!response.ok) throw new Error(`${response.status} for /blog/${slug}`)
  const html = await response.text()
  fs.mkdirSync(CACHE, { recursive: true })
  fs.writeFileSync(file, html)
  return html
}

const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(DIST).filter((name) => !name.startsWith('.'))

const results = { match: [], cloudflare: [], differs: [] }

for (const slug of slugs) {
  const ours = body(
    fs.readFileSync(path.join(DIST, slug, 'index.html'), 'utf8'),
    slug
  )
  const live = body(await production(slug), slug)

  // Production’s #article starts with the post header and featured image
  const start = Math.max(live.indexOf(ours[0]), 0)
  const theirs = live.slice(start)

  let index = 0
  while (index < ours.length && theirs[index] === ours[index]) index++
  if (index === ours.length) {
    results.match.push(slug)
  } else if (theirs[index]?.includes('__cf_email__')) {
    results.cloudflare.push(slug)
  } else {
    results.differs.push({ slug, index, theirs: theirs[index], ours: ours[index] })
  }
}

console.log(`${results.match.length} of ${slugs.length} posts match production`)
if (results.cloudflare.length) {
  console.log(
    `${results.cloudflare.length} differ only where Cloudflare obfuscated an @ in a code sample: ${results.cloudflare.join(', ')}`
  )
}
for (const { slug, index, theirs, ours } of results.differs) {
  let at = 0
  while (theirs?.[at] === ours?.[at]) at++
  console.log(`\n${slug}, node ${index}:`)
  console.log(`  live:  …${theirs?.slice(Math.max(at - 60, 0), at + 140) ?? '(missing)'}`)
  console.log(`  build: …${ours?.slice(Math.max(at - 60, 0), at + 140) ?? '(missing)'}`)
}
process.exitCode = results.differs.length ? 1 : 0
