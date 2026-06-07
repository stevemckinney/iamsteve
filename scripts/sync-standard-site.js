/**
 * Sync published blog posts to standard.site (AT Protocol) records.
 *
 * Writes one site.standard.publication record and one site.standard.document
 * record per published post into the authenticated repo (PDS). Server-assigned
 * record keys are persisted to content/standard-site.json so the sync is
 * idempotent and the site can render verification links statically.
 *
 * Usage (Node 20+, app password from Bluesky settings):
 *   ATPROTO_IDENTIFIER=mcknny.com \
 *   ATPROTO_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx \
 *   node ./scripts/sync-standard-site.js
 *
 * Or with an env file: node --env-file=.env ./scripts/sync-standard-site.js
 *
 * Optional env:
 *   ATPROTO_SERVICE   PDS service URL (default https://bsky.social)
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const sharp = require('sharp')
const { AtpAgent } = require('@atproto/api')
const siteMetadata = require('../content/metadata')

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content/blog')
const MAP_PATH = path.join(ROOT, 'content/standard-site.json')
const ICON_PATH = path.join(ROOT, process.env.STANDARD_ICON || 'app/icon.svg')

// site.standard.theme.basic — fern-900 and neutral-01-150 design tokens as
// sRGB (fern-900 is authored in oklch; this is its sRGB conversion).
const rgb = (r, g, b) => ({ $type: 'site.standard.theme.color#rgb', r, g, b })
const FERN_900 = rgb(0, 84, 67)
const NEUTRAL_01_150 = rgb(241, 232, 228)
const BASIC_THEME = {
  $type: 'site.standard.theme.basic',
  background: NEUTRAL_01_150,
  foreground: FERN_900,
  accent: FERN_900,
  accentForeground: NEUTRAL_01_150,
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith('.md') ? [full] : []
  })
}

// Mirror the content-collections slug:
//   doc._meta.path.split('/').pop().replace(/^\d{4}-/, '')
// Folder posts (slug/index.md) resolve to their folder name.
function slugFor(filePath) {
  const rel = path
    .relative(BLOG_DIR, filePath)
    .split(path.sep)
    .join('/')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
  return rel
    .split('/')
    .pop()
    .replace(/^\d{4}-/, '')
}

function rkeyFromUri(uri) {
  return uri.split('/').pop()
}

// Plaintext extraction. remark/mdast are ESM-only, so load them lazily.
let _toPlain
async function getToPlain() {
  if (_toPlain) return _toPlain
  const [{ remark }, gfm, { toString }] = await Promise.all([
    import('remark'),
    import('remark-gfm'),
    import('mdast-util-to-string'),
  ])
  const processor = remark().use(gfm.default)
  // Prose only: drop fenced code blocks (noise for a plaintext field) and any
  // residual inline tags so textContent stays clean plaintext.
  _toPlain = (markdown) =>
    processor
      .parse(markdown)
      .children.filter((node) => node.type !== 'code')
      .map((node) => toString(node, { includeHtml: false }).trim())
      .filter(Boolean)
      .join('\n\n')
      .replace(/<[^>\n]{1,80}>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  return _toPlain
}

// Rasterise the brand mark to a square PNG and upload it as the publication
// icon blob. Returns the blob ref, or null if the source is missing.
async function uploadIcon(agent) {
  if (!fs.existsSync(ICON_PATH)) return null
  const png = await sharp(ICON_PATH)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer()
  const res = await agent.com.atproto.repo.uploadBlob(png, {
    encoding: 'image/png',
  })
  return res.data.blob
}

async function upsert(agent, repo, collection, rkey, record) {
  if (rkey) {
    await agent.com.atproto.repo.putRecord({ repo, collection, rkey, record })
    return `at://${repo}/${collection}/${rkey}`
  }
  const res = await agent.com.atproto.repo.createRecord({
    repo,
    collection,
    record,
  })
  return res.data.uri
}

async function main() {
  const identifier = process.env.ATPROTO_IDENTIFIER
  const password = process.env.ATPROTO_APP_PASSWORD
  if (!identifier || !password) {
    console.error('Missing ATPROTO_IDENTIFIER or ATPROTO_APP_PASSWORD env.')
    process.exit(1)
  }

  const agent = new AtpAgent({
    service: process.env.ATPROTO_SERVICE || 'https://bsky.social',
  })
  await agent.login({ identifier, password })
  const did = agent.session.did
  console.log(`Logged in as ${identifier} (${did})`)

  const map = fs.existsSync(MAP_PATH)
    ? JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'))
    : { did: null, publication: null, documents: {} }
  const documents = { ...map.documents }

  // Publication
  const icon = await uploadIcon(agent)
  const publicationUri = await upsert(
    agent,
    did,
    'site.standard.publication',
    map.publication ? rkeyFromUri(map.publication) : null,
    {
      $type: 'site.standard.publication',
      // Best practice: trim trailing slashes so url + document path joins cleanly.
      url: siteMetadata.siteUrl.replace(/\/+$/, ''),
      name: new URL(siteMetadata.siteUrl).host,
      description: siteMetadata.description,
      ...(icon ? { icon } : {}),
      basicTheme: BASIC_THEME,
      preferences: { showInDiscover: true },
    }
  )
  console.log(`Publication: ${publicationUri}`)

  // Documents — published, indexable posts
  const toPlain = await getToPlain()
  let count = 0
  for (const file of walk(BLOG_DIR)) {
    const { data, content } = matter(fs.readFileSync(file, 'utf8'))
    if (data.status !== 'open' || data.noindex === true) continue

    const slug = slugFor(file)
    const tags =
      Array.isArray(data.tags) && data.tags.length ? data.tags : undefined
    const textContent = toPlain(content)

    documents[slug] = await upsert(
      agent,
      did,
      'site.standard.document',
      documents[slug] ? rkeyFromUri(documents[slug]) : null,
      {
        $type: 'site.standard.document',
        site: publicationUri,
        title: data.title,
        path: `/blog/${slug}`,
        publishedAt: new Date(data.date).toISOString(),
        ...(data.lastmod
          ? { updatedAt: new Date(data.lastmod).toISOString() }
          : {}),
        ...(data.summary || data.metadesc
          ? { description: data.summary || data.metadesc }
          : {}),
        ...(tags ? { tags } : {}),
        ...(textContent ? { textContent } : {}),
      }
    )
    count++
  }

  fs.writeFileSync(
    MAP_PATH,
    JSON.stringify({ did, publication: publicationUri, documents }, null, 2) +
      '\n'
  )
  console.log(`Synced ${count} documents. Wrote ${MAP_PATH}`)
  console.log('Commit content/standard-site.json to publish the changes.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
