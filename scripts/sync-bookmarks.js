#!/usr/bin/env node
/**
 * Two-way sync between Safari bookmarks and content/collections.
 *
 *   node scripts/sync-bookmarks.js status    Drift report, both directions
 *   node scripts/sync-bookmarks.js export    Write bookmarks-import.json for compose-collection.js
 *   node scripts/sync-bookmarks.js pull      Write reconcile.html to import back into Safari
 *
 * Safari is the source for "what should be published": every bookmark under
 * Bookmarks Bar > Collections > <Name> maps to collection <Name>. The site is
 * the source for everything already published, including extra collections a
 * single Safari folder cannot express.
 */

const fs = require('fs')
const path = require('path')
const os = require('os')
const { execFileSync } = require('child_process')

const ROOT = process.cwd()
const COLLECTIONS_DIR = path.join(ROOT, 'content', 'collections')
const COLLECTIONS_FOLDER = 'Collections'
const LIVE_PLIST = path.join(
  os.homedir(),
  'Library',
  'Safari',
  'Bookmarks.plist'
)
const FALLBACK_PLIST = path.join(os.homedir(), 'Downloads', 'Bookmarks.plist')

// Canonical names, mirroring normalizeCollection in compose-collection.js
const CANONICAL = [
  'Accessibility',
  'CSS',
  'Code',
  'Colour',
  'Content',
  'Favourites',
  'Foundry',
  'Inspiration',
  'Motion',
  'Publication',
  'Resource',
  'Typography',
  'ux-design',
]
const canonical = (name) => {
  const hit = CANONICAL.find(
    (c) => c.toLowerCase() === String(name).toLowerCase().trim()
  )
  return hit || name
}

const normaliseUrl = (url) =>
  String(url || '')
    .trim()
    .toLowerCase()
    .replace(/[?#].*$/, '')
    .replace(/\/+$/, '')
    .replace(/^https?:\/\/(www\.)?/, '')

// --- Safari side ------------------------------------------------------------

// plutil -convert json fails on this plist (it holds Data and Date values that
// JSON cannot represent), so convert via python3's plistlib instead.
const PLIST_TO_JSON = `
import json, plistlib, sys, datetime
with open(sys.argv[1], "rb") as f:
    data = plistlib.load(f)
def fallback(o):
    if isinstance(o, (bytes, bytearray)):
        return None
    if isinstance(o, (datetime.datetime, datetime.date)):
        return o.isoformat()
    return str(o)
json.dump(data, sys.stdout, default=fallback)
`

// --plist <path> overrides the search order, for testing or reading a backup.
const plistArg = () => {
  const i = process.argv.indexOf('--plist')
  return i !== -1 && process.argv[i + 1] ? [process.argv[i + 1]] : null
}

const readPlist = () => {
  for (const file of plistArg() || [LIVE_PLIST, FALLBACK_PLIST]) {
    if (!fs.existsSync(file)) continue
    try {
      const json = execFileSync('python3', ['-c', PLIST_TO_JSON, file], {
        maxBuffer: 512 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore'],
      })
      warnIfStale(file)
      return { data: JSON.parse(json), source: file }
    } catch {
      continue
    }
  }
  console.error(
    [
      'Could not read Safari bookmarks.',
      '',
      `  Tried: ${LIVE_PLIST}`,
      `         ${FALLBACK_PLIST}`,
      '',
      'macOS protects ~/Library/Safari. Either:',
      '  1. System Settings > Privacy & Security > Full Disk Access > add Terminal,',
      '     then restart Terminal (fixes it permanently), or',
      '  2. Copy Bookmarks.plist to ~/Downloads in Finder before each run.',
    ].join('\n')
  )
  process.exit(1)
}

// Safari keeps bookmarks in memory and only flushes to disk periodically, so a
// file written minutes ago may not reflect changes just made in the browser.
const warnIfStale = (file) => {
  if (file !== LIVE_PLIST) return
  let running = false
  try {
    execFileSync('pgrep', ['-x', 'Safari'], { stdio: 'ignore' })
    running = true
  } catch {
    return
  }
  if (!running) return
  const ageMins = Math.round((Date.now() - fs.statSync(file).mtimeMs) / 60000)
  console.warn(
    `Safari is running and last wrote its bookmarks ${ageMins} min ago.\n` +
      `Recent changes may not be included. Quit Safari to force a flush.\n`
  )
}

const findFolder = (node, title) => {
  if (!node || typeof node !== 'object') return null
  if (node.WebBookmarkType === 'WebBookmarkTypeList' && node.Title === title)
    return node
  for (const child of node.Children || []) {
    const hit = findFolder(child, title)
    if (hit) return hit
  }
  return null
}

const leavesOf = (node, out = []) => {
  for (const child of node.Children || []) {
    if (child.WebBookmarkType === 'WebBookmarkTypeLeaf') {
      out.push({
        title: (child.URIDictionary && child.URIDictionary.title) || '',
        url: child.URLString || '',
      })
    } else if (child.WebBookmarkType === 'WebBookmarkTypeList') {
      leavesOf(child, out)
    }
  }
  return out
}

const readSafariCollections = () => {
  const { data, source } = readPlist()
  const root = findFolder(data, COLLECTIONS_FOLDER)
  if (!root) {
    console.error(
      `No "${COLLECTIONS_FOLDER}" folder found in ${source}.\n` +
        'Create it on the bookmarks bar, with one subfolder per collection.'
    )
    process.exit(1)
  }
  const items = []
  for (const child of root.Children || []) {
    if (child.WebBookmarkType !== 'WebBookmarkTypeList') continue
    const collection = canonical(child.Title)
    for (const leaf of leavesOf(child)) {
      if (leaf.url) items.push({ ...leaf, collection })
    }
  }
  return { items, source }
}

// --- Site side --------------------------------------------------------------

const readSiteCollections = () => {
  if (!fs.existsSync(COLLECTIONS_DIR)) return []
  return fs
    .readdirSync(COLLECTIONS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(COLLECTIONS_DIR, file), 'utf8')
      const fm = (raw.match(/^---\n([\s\S]*?)\n---/) || [])[1] || ''
      const one = (key) => {
        const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
        return m ? m[1].trim().replace(/^["']|["']$/g, '') : ''
      }
      const listed = fm.match(/collection:\s*\n((?:\s*-\s*.+\n?)+)/)
      const collections = listed
        ? listed[1]
            .trim()
            .split('\n')
            .map((l) =>
              l
                .replace(/^\s*-\s*/, '')
                .trim()
                .replace(/^["']|["']$/g, '')
            )
        : [one('collection')].filter(Boolean)
      return { file, title: one('title'), url: one('url'), collections }
    })
    .filter((entry) => entry.url)
}

// --- Commands ---------------------------------------------------------------

const buildIndex = () => {
  const { items, source } = readSafariCollections()
  const site = readSiteCollections()
  const siteByUrl = new Map(site.map((e) => [normaliseUrl(e.url), e]))
  const safariByUrl = new Map(items.map((e) => [normaliseUrl(e.url), e]))
  return { items, site, siteByUrl, safariByUrl, source }
}

const commands = {
  status() {
    const { items, site, siteByUrl, safariByUrl, source } = buildIndex()
    const unpublished = items.filter((i) => !siteByUrl.has(normaliseUrl(i.url)))
    const unbookmarked = site.filter(
      (e) => !safariByUrl.has(normaliseUrl(e.url))
    )
    const drifted = items
      .map((i) => ({ safari: i, site: siteByUrl.get(normaliseUrl(i.url)) }))
      .filter(
        ({ safari, site: s }) =>
          s && !s.collections.some((c) => canonical(c) === safari.collection)
      )

    console.log(
      `Safari:  ${items.length} bookmarks under ${COLLECTIONS_FOLDER}/  (${source})`
    )
    console.log(`Site:    ${site.length} published collections\n`)
    console.log(
      `  ${unpublished.length} bookmarked, not published   -> run: export`
    )
    console.log(
      `  ${unbookmarked.length} published, not bookmarked   -> run: pull`
    )
    console.log(`  ${drifted.length} in a different collection`)

    if (drifted.length) {
      console.log('\nCollection drift:')
      for (const { safari, site: s } of drifted) {
        console.log(`  ${safari.title.slice(0, 52)}`)
        console.log(
          `    Safari: ${safari.collection}   Site: ${s.collections.join(', ')}`
        )
      }
    }
    const nonCanonical = [
      ...new Set(site.flatMap((e) => e.collections)),
    ].filter((c) => !CANONICAL.includes(c))
    if (nonCanonical.length)
      console.log(
        `\nNon-canonical collection names on site: ${nonCanonical.join(', ')}`
      )
  },

  export() {
    const { items, siteByUrl } = buildIndex()
    const seen = new Set()
    const pending = items.filter((i) => {
      const key = normaliseUrl(i.url)
      if (siteByUrl.has(key) || seen.has(key)) return false
      seen.add(key)
      return true
    })
    const payload = pending.map((i) => ({
      title: i.title,
      url: i.url,
      collection: i.collection,
      kind: 'website',
      extension: 'md',
    }))
    const out = path.join(ROOT, 'bookmarks-import.json')
    fs.writeFileSync(out, JSON.stringify(payload, null, 2) + '\n')
    console.log(
      `Wrote ${payload.length} pending items to ${path.relative(ROOT, out)}`
    )
    console.log(
      `Review it, then: node scripts/compose-collection.js bookmarks-import.json`
    )
  },

  pull() {
    const { site, safariByUrl } = buildIndex()
    const missing = site.filter((e) => !safariByUrl.has(normaliseUrl(e.url)))
    const byCollection = new Map()
    for (const entry of missing) {
      const key = canonical(entry.collections[0] || 'Resource')
      if (!byCollection.has(key)) byCollection.set(key, [])
      byCollection.get(key).push(entry)
    }
    const esc = (s) =>
      String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
    const lines = [
      '<!DOCTYPE NETSCAPE-Bookmark-file-1>',
      '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
      '<TITLE>Bookmarks</TITLE>',
      '<H1>Bookmarks</H1>',
      '<DL><p>',
      `    <DT><H3>${COLLECTIONS_FOLDER} (pulled from site)</H3>`,
      '    <DL><p>',
    ]
    for (const [collection, entries] of [...byCollection].sort()) {
      lines.push(`        <DT><H3>${esc(collection)}</H3>`, '        <DL><p>')
      for (const e of entries)
        lines.push(
          `            <DT><A HREF="${esc(e.url)}">${esc(e.title || e.url)}</A>`
        )
      lines.push('        </DL><p>')
    }
    lines.push('    </DL><p>', '</DL><p>', '')
    const out = path.join(ROOT, 'reconcile.html')
    fs.writeFileSync(out, lines.join('\n'))
    console.log(
      `Wrote ${missing.length} items across ${
        byCollection.size
      } collections to ${path.relative(ROOT, out)}`
    )
    console.log(
      'Safari > File > Import From > Bookmarks HTML File to bring them back.'
    )
  },
}

const cmd = process.argv[2] || 'status'
if (!commands[cmd]) {
  console.error(`Unknown command "${cmd}". Use: status | export | pull`)
  process.exit(1)
}
commands[cmd]()
