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
const { AtpAgent } = require('@atproto/api')
const siteMetadata = require('../content/metadata')

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'content/blog')
const MAP_PATH = path.join(ROOT, 'content/standard-site.json')

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
  const publicationUri = await upsert(
    agent,
    did,
    'site.standard.publication',
    map.publication ? rkeyFromUri(map.publication) : null,
    {
      $type: 'site.standard.publication',
      url: siteMetadata.siteUrl,
      name: siteMetadata.title,
      description: siteMetadata.description,
      preferences: { showInDiscover: true },
    }
  )
  console.log(`Publication: ${publicationUri}`)

  // Documents — published, indexable posts
  let count = 0
  for (const file of walk(BLOG_DIR)) {
    const { data } = matter(fs.readFileSync(file, 'utf8'))
    if (data.status !== 'open' || data.noindex === true) continue

    const slug = slugFor(file)
    const tags =
      Array.isArray(data.tags) && data.tags.length ? data.tags : undefined

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
        ...(data.summary || data.metadesc
          ? { description: data.summary || data.metadesc }
          : {}),
        ...(tags ? { tags } : {}),
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
