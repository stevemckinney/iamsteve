/**
 * Site-wide parity check: the Astro build in .vercel/output/static against
 * production.
 *
 * - URLs: what production serves (its sitemap, a bounded crawl of real
 *   <a href> elements and head links, known extras, and probes for what
 *   only the build has) against the files in the build. Pages that render
 *   on demand go through the build’s function (scripts/serve.mjs)
 * - Head: <html lang>, title, meta, link, script, noscript and JSON-LD,
 *   compared as normalised sets without framework internals
 * - Body: the page shell region by region, normalised and aligned node by
 *   node
 * - Files: every other text response (feeds, markdown, JSON) byte for byte,
 *   apart from the dates a build stamps
 *
 * Production is read as it is once loaded: React’s streamed Suspense
 * boundaries swapped in, and Cloudflare’s email obfuscation decoded. Then
 * both sides lose what isn’t parity: comments, framework scripts, Astro’s
 * island wrappers, attribute and class order, whitespace outside <pre>,
 * next/image and react-aria extras, generated ids, CSS module hashes and
 * Cloudflare’s https rewrites.
 *
 * Production is cached in node_modules/.cache/parity. Accepted differences
 * live in scripts/parity-expected.json, an array of entries. Each needs a
 * `url` glob and a `reason`, and narrows itself with any of `part` (urls,
 * head, body or files), `region`, `kind` (missing, extra, changed, type), `node`
 * (a CSS selector over normalised markup, so module classes read
 * `.module:name`), `attribute` (a name glob, for attribute differences) and
 * `text` (a substring of the difference as the report prints it).
 *
 * Usage: pnpm exec astro build && node scripts/parity.mjs [options]
 */
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import pLimit from 'p-limit'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://iamsteve.me'
const OUTPUT = path.join(ROOT, '.vercel/output')
const DIST = path.join(OUTPUT, 'static')
const PUBLIC = path.join(ROOT, 'public')
const CACHE = path.join(ROOT, 'node_modules/.cache/parity')
const SNAPSHOT = path.join(CACHE, 'snapshot.json')
const EXPECTED = path.join(ROOT, 'scripts/parity-expected.json')
const USER_AGENT =
  'iamsteve-parity/1.0 (scripts/parity.mjs; +https://iamsteve.me)'
const CONCURRENCY = 4
const CRAWL_LIMIT = 2000
const NOT_FOUND = '/this-page-does-not-exist'

const USAGE = `Usage: node scripts/parity.mjs [options]

  --refresh        fetch production again (only the --only URLs, if given)
  --only=<glob>    limit to matching URLs, e.g. --only='/blog/**'
  --urls           compare URLs, statuses and content types
  --head           compare heads
  --body           compare bodies
  --files          compare other text files byte for byte
                   (without any of these four, all of them run)
  --expected       list the differences parity-expected.json suppresses
  --verbose        list every page and difference
  --json <file>    write the full report as JSON
`

// Framework internals, left out of every comparison
const FRAMEWORK_URL = /^\/(_next|_astro|cdn-cgi)\//
const RUNTIME =
  /__next_f|TURBOPACK|\$R[A-Z]|self\.Astro|astro-island|astro:(load|idle|visible|media|only)/

const parser = unified().use(rehypeParse)

/* Command line */

function parseArgs(argv) {
  const options = { parts: new Set() }
  for (let index = 0; index < argv.length; index++) {
    const [name, inline] = argv[index].split(/=(.*)/s)
    const value = () => {
      const given = inline ?? argv[++index]
      if (!given) fail(`${name} needs a value\n\n${USAGE}`)
      return given
    }
    if (name === '--refresh') options.refresh = true
    else if (name === '--only') options.only = value()
    else if (['--urls', '--head', '--body', '--files'].includes(name))
      options.parts.add(name.slice(2))
    else if (name === '--expected') options.expected = true
    else if (name === '--verbose') options.verbose = true
    else if (name === '--json') options.json = value()
    else if (name === '--help' || name === '-h') {
      console.log(USAGE)
      process.exit(0)
    } else fail(`Unknown option ${argv[index]}\n\n${USAGE}`)
  }
  if (!options.parts.size)
    options.parts = new Set(['urls', 'head', 'body', 'files'])
  options.filter = options.only ? glob(options.only) : /^/
  return options
}

function fail(message) {
  console.error(message)
  process.exit(2)
}

// Globs: ** crosses slashes, * and ? don’t, {a,b} picks one, and a
// trailing /** also matches the folder itself
function glob(pattern) {
  let source = ''
  let braces = 0
  for (let index = 0; index < pattern.length; index++) {
    const char = pattern[index]
    if (pattern.endsWith('/**') && index === pattern.length - 3) {
      source += '(?:/.*)?'
      break
    }
    if (pattern.startsWith('**', index)) {
      source += '.*'
      index++
    } else if (char === '*') source += '[^/]*'
    else if (char === '?') source += '[^/]'
    else if (char === '{') {
      source += '(?:'
      braces++
    } else if (char === '}' && braces) {
      source += ')'
      braces--
    } else if (char === ',' && braces) source += '|'
    else source += char.replace(/[.+^$()|[\]\\]/g, '\\$&')
  }
  return new RegExp(`^${source}$`)
}

/* Production */

const BINARY =
  /\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|mp4|webm|mov|m4v|mp3|wav|woff2?|ttf|otf|eot|pdf|zip|gz|psd|sketch|fig)$/i
const TEXT = /^(text\/|application\/([\w.-]+\+)?(json|xml|javascript))/i
const HEADERS = [
  'content-type',
  'location',
  'cache-control',
  'x-robots-tag',
  'link',
  'vary',
  'access-control-allow-origin',
]
const LINK_RELS = new Set([
  'alternate',
  'apple-touch-icon',
  'canonical',
  'icon',
  'manifest',
  'mask-icon',
  'next',
  'prev',
])

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const bodyPath = (url) => path.join(CACHE, 'bodies', encodeURIComponent(url))
const read = (url) => fs.readFileSync(bodyPath(url), 'utf8')

// The path of an internal URL, or null for anything else
function internal(href, base = '/') {
  let url
  try {
    url = new URL(href.trim(), ORIGIN + base)
  } catch {
    return null
  }
  if (!/^https?:$/.test(url.protocol) || url.hostname !== 'iamsteve.me')
    return null
  return url.pathname
}

async function request(url, method) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(new URL(url, ORIGIN), {
        method,
        redirect: 'manual',
        headers: { 'user-agent': USER_AGENT, accept: 'text/html,*/*;q=0.8' },
      })
      if (attempt < 3 && [429, 502, 503, 504].includes(response.status)) {
        await response.body?.cancel()
        await sleep(attempt * 2000)
        continue
      }
      return response
    } catch (error) {
      if (attempt === 3) throw error
      await sleep(attempt * 2000)
    }
  }
}

async function fetchRecord(url) {
  // Binary files only need their status and type
  const method = BINARY.test(url) ? 'HEAD' : 'GET'
  let response
  try {
    response = await request(url, method)
    if (method === 'HEAD' && response.status === 405) {
      response = await request(url, 'GET')
    }
  } catch (error) {
    return { status: 0, error: error.message, fetchedAt: now() }
  }
  const headers = {}
  for (const name of HEADERS) {
    const value = response.headers.get(name)
    if (value !== null) headers[name] = value
  }
  const record = {
    status: response.status,
    type: headers['content-type'] ?? null,
    headers,
    fetchedAt: now(),
  }
  if (headers.location) record.location = headers.location
  const keep = [200, 404].includes(response.status) && TEXT.test(record.type)
  if (keep && method === 'GET') {
    fs.writeFileSync(bodyPath(url), await response.text())
    record.body = true
  } else await response.body?.cancel()
  return record
}

const now = () => new Date().toISOString()
const isHtml = (type) => /^text\/html/i.test(type ?? '')

// Real links only: <a href> elements, head links and social images. Code
// samples are text once parsed, so the href strings in them don’t count
function links(html, base) {
  const found = new Set()
  walk(parse(html), (node) => {
    const { href, rel, property, name, content } = node.attrs
    let target
    if (node.tag === 'a') target = href
    else if (node.tag === 'link' && rel) {
      const rels = rel.toLowerCase().split(/\s+/)
      if (rels.some((value) => LINK_RELS.has(value))) target = href
    } else if (
      node.tag === 'meta' &&
      /^(og|twitter):image$/.test(property ?? name)
    ) {
      target = content
    }
    const url = target && internal(target, base)
    if (url && !FRAMEWORK_URL.test(url)) found.add(url)
  })
  return found
}

function extras() {
  const slugs = (file) =>
    [
      ...fs
        .readFileSync(path.join(ROOT, file), 'utf8')
        .matchAll(/slugAsParams:\s*'([^']+)'/g),
    ].map(([, slug]) => slug)
  return [
    '/sitemap.xml',
    '/feed.xml',
    '/robots.txt',
    '/llms.txt',
    '/.well-known/api-catalog',
    '/.well-known/agent-skills/index.json',
    '/api/search',
    '/api/content/home',
    '/notes',
    '/thanks',
    '/components',
    // Search results, rendered on demand: the 40-result cap, every label,
    // nothing found, a query too short to search and one that’s trimmed
    '/search?q=css',
    '/search?q=notes',
    '/search?q=motion',
    '/search?q=qwxzv',
    '/search?q=a',
    '/search?q=%20css%20',
    ...Array.from({ length: 12 }, (_, index) => `/blog/page/${index + 1}`),
    ...slugs('content/categories.js').flatMap((slug) => [
      `/category/${slug}`,
      `/category/${slug}/page/2`,
    ]),
    ...slugs('content/collections.js').map((slug) => `/collections/${slug}`),
    NOT_FOUND,
  ]
}

// Fetch the seeds, four at a time. When crawling, follow internal links
// and redirects from what comes back, up to CRAWL_LIMIT URLs in all
async function fetchAll(snapshot, seeds, { crawl = false } = {}) {
  fs.mkdirSync(path.join(CACHE, 'bodies'), { recursive: true })
  const limit = pLimit(CONCURRENCY)
  const tasks = []
  let count = Object.keys(snapshot.urls).length
  let done = 0

  const add = (url, source, from) => {
    const known = snapshot.urls[url]
    if (known) {
      if (!known.sources.includes(source)) known.sources.push(source)
      return
    }
    if (source === 'crawl' && count >= CRAWL_LIMIT) {
      snapshot.limited = true
      return
    }
    count++
    snapshot.urls[url] = { sources: [source], ...(from && { from }) }
    tasks.push(
      limit(async () => {
        const record = Object.assign(snapshot.urls[url], await fetchRecord(url))
        progress(++done, tasks.length)
        if (!crawl) return
        const target = record.location && internal(record.location, url)
        if (target && !FRAMEWORK_URL.test(target)) add(target, 'crawl', url)
        if (record.status === 200 && record.body && isHtml(record.type)) {
          for (const link of links(read(url), url)) add(link, 'crawl', url)
        }
      })
    )
  }

  for (const [url, source, from] of seeds) add(url, source, from)
  // Crawling adds tasks while the first ones run
  for (let settled = 0; settled < tasks.length; ) {
    const batch = tasks.slice(settled)
    await Promise.all(batch)
    settled += batch.length
  }
  progress()
}

function progress(done, total) {
  if (!process.stderr.isTTY) return
  process.stderr.clearLine(0)
  process.stderr.cursorTo(0)
  if (done) process.stderr.write(`Fetching production: ${done} of ${total}`)
}

async function production(options, buildUrls) {
  const recrawl = options.refresh && !options.only
  let snapshot =
    !recrawl && fs.existsSync(SNAPSHOT)
      ? JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8'))
      : null

  if (!snapshot) {
    snapshot = { origin: ORIGIN, crawledAt: now(), limited: false, urls: {} }
    await fetchAll(snapshot, [['/sitemap.xml', 'extra']])
    const sitemap = snapshot.urls['/sitemap.xml'].body
      ? read('/sitemap.xml')
      : ''
    const seeds = [
      ...[...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
        .map(([, loc]) => internal(loc.replace(/&amp;/g, '&')))
        .filter(Boolean)
        .map((url) => [url, 'sitemap']),
      ...extras().map((url) => [url, 'extra']),
    ]
    await fetchAll(snapshot, seeds, { crawl: true })
  } else if (options.refresh) {
    const seeds = []
    for (const [url, { sources, from }] of Object.entries(snapshot.urls)) {
      if (!options.filter.test(url)) continue
      delete snapshot.urls[url]
      seeds.push(...sources.map((source) => [url, source, from]))
    }
    await fetchAll(snapshot, seeds)
  }

  // Probe anything the build has, or the extras gained, that the snapshot
  // doesn’t know yet, such as pages no sitemap entry or link reaches
  const known = new Set(extras())
  const unknown = [...known, ...buildUrls].filter(
    (url) => !snapshot.urls[url] && options.filter.test(url)
  )
  if (unknown.length) {
    await fetchAll(
      snapshot,
      unknown.map((url) => [url, known.has(url) ? 'extra' : 'probe'])
    )
  }
  fs.writeFileSync(SNAPSHOT, JSON.stringify(snapshot, null, 2))
  return snapshot
}

/* Build */

// What Vercel should send for a static file, by extension. Only a preview
// can confirm it (phase 4)
const TYPES = {
  html: 'text/html; charset=utf-8',
  xml: 'application/xml',
  txt: 'text/plain; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
  json: 'application/json',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  ico: 'image/vnd.microsoft.icon',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  pdf: 'application/pdf',
  woff: 'font/woff',
  woff2: 'font/woff2',
}

function files(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = prefix + entry.name
    return entry.isDirectory()
      ? files(path.join(directory, entry.name), `${file}/`)
      : [file]
  })
}

// Content-Type overrides in vercel.json, from headers (path-to-regexp
// sources) and routes (regex sources)
function overrides() {
  const file = path.join(ROOT, 'vercel.json')
  const config = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, 'utf8'))
    : {}
  const rules = []
  const contentType = (headers) =>
    Object.entries(headers).find(
      ([key]) => key.toLowerCase() === 'content-type'
    )
  for (const { source, headers = [] } of config.headers ?? []) {
    const header = headers.find(
      ({ key }) => key.toLowerCase() === 'content-type'
    )
    if (header) rules.push([sourcePattern(source), header.value])
  }
  for (const { src, headers = {}, has, missing } of config.routes ?? []) {
    // Parity asks the canonical host for HTML, which a route with
    // conditions (markdown negotiation, the host check) never answers
    if (has || missing) continue
    const header = contentType(headers)
    if (src && header) rules.push([new RegExp(`^${src}$`), header[1]])
  }
  return rules
}

function sourcePattern(source) {
  const pattern = source.replace(
    /:(\w+)(\([^)]*\))?([*+?])?|\([^)]*\)|[.+*?^$|[\]\\{}]/g,
    (match, name, inner, modifier) => {
      if (!name) return match.startsWith('(') ? match : `\\${match}`
      const part = inner ? inner.slice(1, -1) : '[^/]+'
      if (modifier === '*') return `(?:${part}(?:/${part})*)?`
      if (modifier === '+') return `${part}(?:/${part})*`
      return modifier === '?' ? `(?:${part})?` : `(?:${part})`
    }
  )
  return new RegExp(`^${pattern}$`)
}

function build() {
  if (!fs.existsSync(DIST))
    fail('No .vercel/output/static: run pnpm exec astro build first')
  const rules = overrides()
  const inventory = { urls: new Map(), framework: 0, notFound: null }
  for (const file of files(DIST)) {
    if (file.startsWith('_astro/')) {
      inventory.framework++
      continue
    }
    // Files from public/ are served as they are, by both sites
    const asset = fs.existsSync(path.join(PUBLIC, file))
    if (!asset && file === '404.html') {
      inventory.notFound = file
      continue
    }
    let url = `/${file}`
    if (!asset && url.endsWith('.html')) {
      url = url.replace(/(\/index)?\.html$/, '') || '/'
    }
    url = encodeURI(url)
    const extension = path.extname(file).slice(1).toLowerCase()
    const rule = rules.find(([pattern]) => pattern.test(url))
    const type = rule?.[1] ?? TYPES[extension] ?? 'application/octet-stream'
    inventory.urls.set(url, { file, asset, type })
  }
  return inventory
}

// Pages that render on demand have no file in the build. The ones
// production serves go through the build’s own function, as on Vercel, and
// their responses are kept in the cache for the comparisons to read
async function renderOnDemand(snapshot, inventory) {
  const config = JSON.parse(
    fs.readFileSync(path.join(OUTPUT, 'config.json'), 'utf8')
  )
  const routes = config.routes
    .filter(({ src, dest }) => src && dest && !dest.startsWith('/'))
    .map(({ src }) => new RegExp(src))
  const urls = Object.entries(snapshot.urls)
    .filter(([url, { status }]) => status === 200 && !inventory.urls.has(url))
    .map(([url]) => url)
    .filter((url) =>
      routes.some((route) => route.test(new URL(url, ORIGIN).pathname))
    )
  if (!urls.length) return
  const { createHandler } = await import('./serve.mjs')
  const handle = await createHandler()
  const folder = path.join(CACHE, 'on-demand')
  fs.rmSync(folder, { recursive: true, force: true })
  fs.mkdirSync(folder, { recursive: true })
  for (const url of urls) {
    const response = await handle(new Request(new URL(url, 'http://localhost')))
    if (response.status !== 200) continue
    const type = response.headers.get('content-type') ?? ''
    const name = encodeURIComponent(url) + (isHtml(type) ? '.html' : '')
    const file = path.join(folder, name)
    fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()))
    inventory.urls.set(url, { file, asset: false, type, onDemand: true })
  }
}

/* Parsing */

const RENAMED = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  tabIndex: 'tabindex',
  xmlLang: 'xml:lang',
  xmlSpace: 'xml:space',
  xmlnsXLink: 'xmlns:xlink',
}
const SVG_CASED = new Set(
  `attributeName attributeType baseFrequency calcMode clipPathUnits
  diffuseConstant edgeMode filterUnits gradientTransform gradientUnits
  kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust
  limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits
  maskUnits numOctaves pathLength patternContentUnits patternTransform
  patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio
  primitiveUnits refX refY repeatCount repeatDur specularConstant
  specularExponent spreadMethod startOffset stdDeviation surfaceScale
  systemLanguage tableValues textLength viewBox xChannelSelector
  yChannelSelector zoomAndPan`.split(/\s+/)
)
const kebab = (text) =>
  text.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)

// hast names attributes as DOM properties; turn them back into attributes
function attributeName(property, space) {
  if (RENAMED[property]) return RENAMED[property]
  if (/^data[A-Z0-9]/.test(property)) {
    return `data-${kebab(property[4].toLowerCase() + property.slice(5))}`
  }
  if (/^aria[A-Z]/.test(property))
    return `aria-${property.slice(4).toLowerCase()}`
  if (/^xLink[A-Z]/.test(property))
    return `xlink:${property.slice(5).toLowerCase()}`
  if (space === 'svg')
    return SVG_CASED.has(property) ? property : kebab(property)
  return property.toLowerCase()
}

// A plain tree of { tag, attrs, children }, with attribute names and string
// values, so normalising, matching and printing all see the same thing
function lite(node, space = 'html') {
  if (node.type === 'text' || node.type === 'comment') {
    return { type: node.type, value: node.value }
  }
  const own = node.tagName === 'svg' ? 'svg' : space
  const inner = node.tagName === 'foreignObject' ? 'html' : own
  const children = (node.content?.children ?? node.children ?? [])
    .map((child) => lite(child, inner))
    .filter(Boolean)
  if (node.type === 'root') return { type: 'root', children }
  if (node.type !== 'element') return null
  const attrs = {}
  for (const [property, value] of Object.entries(node.properties ?? {})) {
    if (value === false || value === null || value === undefined) continue
    attrs[attributeName(property, own)] =
      value === true
        ? ''
        : Array.isArray(value)
        ? value.join(property === 'accept' ? ', ' : ' ')
        : String(value)
  }
  return { type: 'element', tag: node.tagName, attrs, children }
}

const parse = (html) => lite(parser.parse(html))

function walk(node, visit) {
  for (const child of node.children ?? []) {
    if (child.type !== 'element') continue
    visit(child)
    walk(child, visit)
  }
}

function first(node, test) {
  for (const child of node.children ?? []) {
    if (child.type !== 'element') continue
    if (test(child)) return child
    const found = first(child, test)
    if (found) return found
  }
  return null
}

function all(node, test) {
  const found = []
  walk(node, (child) => test(child) && found.push(child))
  return found
}

// The parent and index of the first element that passes the test
function locate(node, test) {
  for (const [index, child] of (node.children ?? []).entries()) {
    if (child.type !== 'element') continue
    if (test(child)) return { parent: node, index, node: child }
    const found = locate(child, test)
    if (found) return found
  }
  return null
}

const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('')

const VOID = new Set(
  'area base br col embed hr img input link meta source track wbr'.split(' ')
)

function attributes(attrs) {
  return Object.entries(attrs)
    .map(([name, value]) =>
      value === ''
        ? ` ${name}`
        : ` ${name}="${value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`
    )
    .join('')
}

function html(node) {
  if (node.type === 'text') {
    return node.value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  }
  if (node.type !== 'element') return ''
  const open = `<${node.tag}${attributes(node.attrs)}>`
  if (VOID.has(node.tag)) return open
  return `${open}${node.children.map(html).join('')}</${node.tag}>`
}

/* Production artefacts */

// React streams each Suspense boundary: the fallback sits in place, the
// content follows in <div hidden id="S:n">, and an inline $RC or $RS call
// swaps it in. Make the same swaps, so the page reads as it does once loaded
function resolveSuspense(doc) {
  const code = all(doc, (node) => node.tag === 'script' && !node.attrs.src)
    .map(textOf)
    .join('\n')
  const swaps = [...code.matchAll(/\$R([CS])\("([^"]+)","([^"]+)"\)/g)].map(
    ([, type, first, second]) =>
      type === 'C'
        ? { target: first, content: second, boundary: true }
        : { target: second, content: first }
  )
  // A boundary no script mentions pairs by number, B:n with S:n
  for (const template of all(doc, (node) => /^B:\d+$/.test(node.attrs.id))) {
    const id = template.attrs.id
    if (!swaps.some(({ target }) => target === id)) {
      swaps.push({ target: id, content: id.replace('B', 'S'), boundary: true })
    }
  }

  for (const { target, content, boundary } of swaps) {
    const source = locate(doc, (node) => node.attrs.id === content)
    if (!source || !first(doc, (node) => node.attrs.id === target)) continue
    source.parent.children.splice(source.index, 1)
    const { parent, index } = locate(doc, (node) => node.attrs.id === target)
    let end = index + 1
    if (boundary) {
      // The fallback runs to the boundary’s closing <!--/$-->
      for (let depth = 0; end < parent.children.length; end++) {
        const { type, value } = parent.children[end]
        if (type !== 'comment') continue
        if (value === '/$' || value === '/&') {
          if (depth === 0) break
          depth--
        } else if (['$', '$?', '$~', '$!', '&'].includes(value)) depth++
      }
    }
    parent.children.splice(index, end - index, ...source.node.children)
  }
}

// Cloudflare hides anything that looks like an email address behind
// /cdn-cgi/l/email-protection, XOR-encoded in data-cfemail. Decode it back
// to what the origin sent, counting each one
function decodeEmail(hex) {
  const key = parseInt(hex.slice(0, 2), 16)
  const bytes = []
  for (let index = 2; index < hex.length; index += 2) {
    bytes.push(parseInt(hex.slice(index, index + 2), 16) ^ key)
  }
  return new TextDecoder().decode(new Uint8Array(bytes))
}

function decodeEmails(node) {
  let count = 0
  node.children = node.children.map((child) => {
    if (child.type !== 'element') return child
    const classes = (child.attrs.class ?? '').split(/\s+/)
    if (child.attrs['data-cfemail'] && classes.includes('__cf_email__')) {
      count++
      return { type: 'text', value: decodeEmail(child.attrs['data-cfemail']) }
    }
    const href = child.attrs.href ?? ''
    if (href.startsWith('/cdn-cgi/l/email-protection#')) {
      count++
      child.attrs.href = `mailto:${decodeEmail(href.split('#')[1])}`
    }
    count += decodeEmails(child)
    return child
  })
  return count
}

function load(source) {
  const doc = parse(source)
  resolveSuspense(doc)
  return { doc, emails: decodeEmails(doc) }
}

const isJsonLd = (node) =>
  node.tag === 'script' && node.attrs.type === 'application/ld+json'

// Next’s chunks, RSC payload and React’s streaming runtime; Astro’s bundles,
// inlined modules and island runtime; Cloudflare’s email decoder
function isFramework(node) {
  if (node.tag !== 'script') return false
  if (node.attrs.src !== undefined) return FRAMEWORK_URL.test(node.attrs.src)
  return (
    node.attrs.type === 'module' ||
    node.attrs.id === '_R_' ||
    RUNTIME.test(textOf(node))
  )
}

/* Head */

const LINK_ATTRIBUTES = [
  'rel',
  'href',
  'type',
  'sizes',
  'hreflang',
  'media',
  'crossorigin',
  'as',
  'fetchpriority',
  'title',
]
const SCRIPT_ATTRIBUTES = [
  'src',
  'type',
  'async',
  'defer',
  'nomodule',
  'crossorigin',
  'charset',
  'integrity',
]

// Cloudflare’s https rewrite, next/image’s ?w=…&q=… and the
// ?<name>.<hash>.<ext> query Next adds to its metadata images
function cleanUrl(url) {
  const clean = url
    .replace(/^http:\/\//, 'https://')
    .replace(/\?w=\d+&q=\d+$/, '')
  const [, base, file, name, extension] =
    /^(.*\/)([\w.-]+)\?([\w-]+)\.[\w-]+\.(\w+)$/.exec(clean) ?? []
  return file && file === `${name}.${extension}` ? base + file : clean
}

function sorted(value) {
  if (Array.isArray(value)) return value.map(sorted)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, sorted(value[key])])
  )
}

const item = (kind, key, text, node, extra) => ({
  kind,
  key,
  text,
  node,
  ...extra,
})

function linkItem(node) {
  const attrs = { ...node.attrs }
  if (!attrs.rel || FRAMEWORK_URL.test(attrs.href ?? '')) return null
  attrs.rel = attrs.rel.toLowerCase().split(/\s+/).sort().join(' ')
  if (attrs.rel === 'expect') return null
  // next/image preloads its srcset; the image itself is the first candidate
  if (attrs.imagesrcset && !attrs.href) {
    attrs.href = attrs.imagesrcset.trim().split(/\s+/)[0]
  }
  if (attrs.href) attrs.href = cleanUrl(attrs.href)
  if (attrs.crossorigin === '') attrs.crossorigin = 'anonymous'
  const kept = LINK_ATTRIBUTES.filter((name) => attrs[name] !== undefined)
  const text = `<link${attributes(
    Object.fromEntries(kept.map((n) => [n, attrs[n]]))
  )}>`
  // What makes a link the same link when its other attributes change
  const rels = attrs.rel.split(' ')
  const single = ['canonical', 'manifest', 'next', 'prev'].some((rel) =>
    rels.includes(rel)
  )
  const key = single
    ? `link rel="${attrs.rel}"`
    : rels.includes('alternate')
    ? `link rel="${attrs.rel}" type="${attrs.type ?? ''}"${
        attrs.hreflang ? ` hreflang="${attrs.hreflang}"` : ''
      }`
    : rels.includes('preload')
    ? `link rel="${attrs.rel}" as="${attrs.as ?? ''}"`
    : `link rel="${attrs.rel}" href="${attrs.href ?? ''}"`
  return item('link', key, text, node)
}

function metaItem(node) {
  const { attrs } = node
  if (attrs.charset !== undefined) {
    const text = `<meta charset="${attrs.charset.toLowerCase()}">`
    return item('meta', 'meta charset', text, node)
  }
  const field = ['name', 'property', 'http-equiv', 'itemprop'].find(
    (name) => attrs[name] !== undefined
  )
  if (!field || attrs.name === 'next-size-adjust') return null
  const media = attrs.media ? ` media="${attrs.media}"` : ''
  const key = `meta ${field}="${attrs[field]}"${media}`
  let content = attrs.content ?? ''
  if (/^(og:image(:url|:secure_url)?|twitter:image)$/.test(attrs[field])) {
    content = cleanUrl(content)
  }
  return item('meta', key, `<${key} content="${content}">`, node)
}

function scriptItem(node) {
  if (isJsonLd(node) || isFramework(node)) return null
  const { attrs } = node
  if (attrs.src !== undefined) {
    const kept = SCRIPT_ATTRIBUTES.filter((name) => attrs[name] !== undefined)
    const own = Object.fromEntries(kept.map((name) => [name, attrs[name]]))
    const text = `<script${attributes(own)}></script>`
    return item('script', `script src="${attrs.src}"`, text, node)
  }
  const code = textOf(node).trim().replace(/\s+/g, ' ')
  const type = attrs.type ? ` type="${attrs.type}"` : ''
  return item(
    'script',
    'script (inline)',
    `<script${type}>${code}</script>`,
    node
  )
}

// Each JSON-LD object, or each member of a @graph, is its own item, so a
// graph split across scripts or merged into one compares the same
function jsonLdItems(node) {
  const code = textOf(node)
  let data
  try {
    data = JSON.parse(code)
  } catch {
    return [
      item(
        'ld+json',
        'ld+json (invalid)',
        `ld+json ${code.slice(0, 200)}`,
        node
      ),
    ]
  }
  const context = data['@context']
  const entries = Array.isArray(data) ? data : data['@graph'] ?? [data]
  return entries.map((entry) => {
    const json = sorted(
      context && !entry['@context'] ? { '@context': context, ...entry } : entry
    )
    const type = [].concat(entry['@type'] ?? 'Thing').join(', ')
    const key = `ld+json ${type}${entry['@id'] ? ` ${entry['@id']}` : ''}`
    return item('ld+json', key, JSON.stringify(json), node, { json })
  })
}

function headItems(doc) {
  const items = []
  const root = first(doc, (node) => node.tag === 'html')
  if (root?.attrs.lang !== undefined) {
    const text = `<html lang="${root.attrs.lang}">`
    items.push(item('html', 'html lang', text, root))
  }
  const head = first(doc, (node) => node.tag === 'head')
  for (const node of head?.children ?? []) {
    if (node.type !== 'element') continue
    let found = null
    if (node.tag === 'title') {
      const title = textOf(node).trim().replace(/\s+/g, ' ')
      found = item('title', 'title', `<title>${title}</title>`, node)
    } else if (node.tag === 'meta') found = metaItem(node)
    else if (node.tag === 'link') found = linkItem(node)
    else if (node.tag === 'script') found = scriptItem(node)
    else if (node.tag === 'noscript') {
      const inside = normaliseChildren(node.children).map(html).join('')
      found = item(
        'noscript',
        'noscript',
        `<noscript>${inside}</noscript>`,
        node
      )
    }
    if (found) items.push(found)
  }
  // Next renders page JSON-LD in the body, so look everywhere
  for (const node of all(doc, isJsonLd)) items.push(...jsonLdItems(node))
  return items
}

// Match items as sets, then pair what’s left by key to call it changed
function compareHead(liveDoc, buildDoc) {
  const build = headItems(buildDoc)
  const unmatched = []
  for (const live of headItems(liveDoc)) {
    const index = build.findIndex(({ text }) => text === live.text)
    if (index === -1) unmatched.push(live)
    else build.splice(index, 1)
  }
  const records = []
  for (const live of unmatched) {
    const index = build.findIndex(({ key }) => key === live.key)
    if (index === -1) records.push({ part: 'head', kind: 'missing', live })
    else {
      const [counterpart] = build.splice(index, 1)
      records.push({ part: 'head', kind: 'changed', live, build: counterpart })
    }
  }
  for (const extra of build)
    records.push({ part: 'head', kind: 'extra', build: extra })
  return records
}

// Paths into two JSON values where they differ
function jsonChanges(live, build, at = '', changes = []) {
  const object = (value) => value && typeof value === 'object'
  if (
    object(live) &&
    object(build) &&
    Array.isArray(live) === Array.isArray(build)
  ) {
    const keys = new Set([...Object.keys(live), ...Object.keys(build)])
    for (const key of keys) {
      const step = Array.isArray(live)
        ? `${at}[${key}]`
        : at
        ? `${at}.${key}`
        : key
      jsonChanges(live[key], build[key], step, changes)
    }
  } else if (JSON.stringify(live) !== JSON.stringify(build)) {
    changes.push({ path: at, live, build })
  }
  return changes
}

/* Body */

const UNWRAP = new Set(['astro-island', 'astro-slot', 'astro-static-slot'])
const REFERENCES = new Set([
  'aria-activedescendant',
  'aria-controls',
  'aria-describedby',
  'aria-details',
  'aria-errormessage',
  'aria-flowto',
  'aria-labelledby',
  'aria-owns',
  'for',
  'form',
  'headers',
  'id',
  'list',
  'popovertarget',
])
// react-aria and React’s useId, in their React 18 and 19 shapes
const GENERATED_ID = /^(react-aria\S*|_R_\w*|«[rR]\w*»|:[rR]\w*:)$/
// CSS module classes: six characters (which can include _), _, local name
const MODULE_CLASS = /^[A-Za-z0-9_-]{6}_([A-Za-z][A-Za-z0-9_-]*)$/
const FOCUSABLE = new Set(['button', 'input', 'select', 'summary', 'textarea'])
const URLS = new Set(['action', 'cite', 'href', 'poster', 'src'])

// React SSR leftovers: client-rendered Suspense markers, unresolved
// boundaries and the empty hidden div Next streams metadata into. And the
// display: contents rule Astro writes before a page’s first island
function dropped(node) {
  const { tag, attrs } = node
  if (tag === 'script') return isJsonLd(node) || isFramework(node)
  if (tag === 'style') return /^astro-island,astro-slot,/.test(textOf(node))
  if (tag === 'template')
    return 'data-dgst' in attrs || /^[BP]:\d+$/.test(attrs.id)
  if (tag === 'div' && 'hidden' in attrs) {
    return (
      /^S:\d+$/.test(attrs.id) ||
      node.children.every((child) => child.type === 'comment')
    )
  }
  return false
}

function flatten(children) {
  return children.flatMap((child) => {
    if (child.type === 'comment') return []
    if (child.type !== 'element') return [child]
    if (dropped(child)) return []
    return UNWRAP.has(child.tag) ? flatten(child.children) : [child]
  })
}

// Text merges across what was dropped, then whitespace collapses
function normaliseChildren(children, pre = false) {
  const merged = []
  for (const child of flatten(children)) {
    const last = merged.at(-1)
    if (child.type === 'text' && last?.type === 'text') {
      last.value += child.value
    } else if (child.type === 'text') merged.push({ ...child })
    else merged.push(normaliseElement(child, pre))
  }
  // Whitespace inside <pre> is the code itself, so it stays
  return merged.flatMap((node) => {
    if (node.type !== 'text') return [node]
    const value = pre ? node.value : node.value.replace(/\s+/g, ' ')
    const kept = pre ? value : value.trim()
    return kept
      ? [{ type: 'text', value, hash: `t${value}`, sig: '#text' }]
      : []
  })
}

function normaliseElement(node, pre = false) {
  const attrs = {}
  for (const name of Object.keys(node.attrs).sort()) {
    const value = normaliseAttribute(node, name, node.attrs[name])
    if (value !== undefined) attrs[name] = value
  }
  const children = normaliseChildren(node.children, pre || node.tag === 'pre')
  return finish({ type: 'element', tag: node.tag, attrs, children })
}

function normaliseAttribute(node, name, value) {
  const { tag } = node
  if (name === 'data-rac' || name === 'data-precedence') return
  if (name.startsWith('data-react-aria')) return
  // next/image extras
  if (tag === 'img' && ['data-nimg', 'sizes', 'srcset'].includes(name)) return
  if (name === 'class') {
    const tokens = new Set(
      value
        .split(/\s+/)
        .filter(Boolean)
        .map((token) => token.replace(MODULE_CLASS, 'module:$1'))
    )
    return tokens.size ? [...tokens].sort().join(' ') : undefined
  }
  if (REFERENCES.has(name)) {
    // Card title ids name the content file, which is .mdx on this branch
    const tokens = value
      .split(/\s+/)
      .filter((token) => token && !GENERATED_ID.test(token))
      .map((token) =>
        token.startsWith('title-') ? token.replace(/\.mdx$/, '.md') : token
      )
    return tokens.length ? tokens.join(' ') : undefined
  }
  // react-aria’s tabindex="0" on what’s focusable anyway
  if (name === 'tabindex' && value === '0') {
    if (FOCUSABLE.has(tag) || (tag === 'a' && 'href' in node.attrs)) return
  }
  if (name === 'style') return normaliseStyle(value, tag === 'img')
  if (URLS.has(name)) {
    return value.replace(/^http:\/\//, 'https://').replace(/\?w=\d+&q=\d+$/, '')
  }
  // React writes a true data attribute as "true", Astro writes it bare
  if (name.startsWith('data-') && value === 'true') return ''
  return value
}

// Declarations, sorted, without next/image’s color:transparent
function normaliseStyle(style, image) {
  const declarations = []
  let depth = 0
  let quote = null
  let start = 0
  for (let index = 0; index <= style.length; index++) {
    const char = style[index]
    if (quote) {
      if (char === quote) quote = null
    } else if (char === '"' || char === "'") quote = char
    else if (char === '(') depth++
    else if (char === ')') depth--
    else if ((char === ';' && depth === 0) || index === style.length) {
      const part = style.slice(start, index)
      const colon = part.indexOf(':')
      const property = part.slice(0, colon).trim().toLowerCase()
      const declared = part
        .slice(colon + 1)
        .trim()
        .replace(/\s+/g, ' ')
      const transparent =
        image && property === 'color' && declared === 'transparent'
      if (colon > 0 && declared && !transparent) {
        declarations.push(`${property}:${declared}`)
      }
      start = index + 1
    }
  }
  return declarations.length ? declarations.sort().join(';') : undefined
}

function finish(node) {
  const hash = crypto
    .createHash('sha1')
    .update(`<${node.tag}${attributes(node.attrs)}>`)
  for (const child of node.children) hash.update('\0').update(child.hash)
  node.hash = hash.digest('base64')
  node.sig = `${node.tag}#${node.attrs.id ?? ''}.${node.attrs.class ?? ''}`
  return node
}

const element = (tag, children, attrs = {}) =>
  finish({ type: 'element', tag, attrs, children })

// The same tree with one node swapped, hashes recomputed on the way up
function replace(node, target, replacement) {
  if (node === target) return replacement
  if (node.type !== 'element') return node
  const children = node.children.map((child) =>
    replace(child, target, replacement)
  )
  if (children.every((child, index) => child === node.children[index]))
    return node
  return finish({ ...node, children })
}

function withoutScripts(node) {
  if (node.type !== 'element') return node
  const children = node.children
    .filter((child) => child.tag !== 'script')
    .map(withoutScripts)
  if (children.length === node.children.length) {
    if (children.every((child, index) => child === node.children[index]))
      return node
  }
  return finish({ ...node, children })
}

const REGIONS = [
  '#accessibility-links',
  'header#top',
  'main#content',
  '#article',
  'after main',
  'body',
]

const isMain = (node) => node.tag === 'main' && node.attrs.id === 'content'

// The shell, region by region. main#content keeps the #article element
// itself, and #article compares what’s inside it, as compare-posts did.
// Sprites (svg in body) are checked elsewhere
function regions(body, shell) {
  const outside = (children) =>
    children.filter((child) => child.tag !== 'svg' && child.tag !== 'script')
  if (!shell) return { body: element('#body', outside(body.children)) }

  const main = first(body, isMain)
  const found = {
    '#accessibility-links': first(
      body,
      (node) => node.attrs.id === 'accessibility-links'
    ),
    'header#top': first(
      body,
      (node) => node.tag === 'header' && node.attrs.id === 'top'
    ),
  }
  if (!main) return found
  const article = first(main, (node) => node.attrs.id === 'article')
  found['main#content'] = article
    ? replace(main, article, element(article.tag, [], article.attrs))
    : main
  if (article) found['#article'] = element('#article', article.children)

  // Everything after main, in document order, up to the end of body
  const trail = []
  const route = [body]
  while (route.at(-1) !== main) {
    const next = route
      .at(-1)
      .children.find(
        (child) => child === main || first(child, (node) => node === main)
      )
    route.push(next)
  }
  for (let depth = route.length - 1; depth > 0; depth--) {
    const siblings = route[depth - 1].children
    const after = siblings.slice(siblings.indexOf(route[depth]) + 1)
    trail.push(...(depth === 1 ? outside(after) : after))
  }
  const after = trail
    .filter((child) => child.tag !== 'script')
    .map(withoutScripts)
  if (after.length) found['after main'] = element('#after', after)
  return found
}

function bodyOf(doc) {
  const body = first(doc, (node) => node.tag === 'body')
  return body ? normaliseElement(body) : element('body', [])
}

// Longest common subsequence under a test, as index pairs
function lcs(a, b, same) {
  let start = 0
  while (start < a.length && start < b.length && same(a[start], b[start]))
    start++
  let endA = a.length
  let endB = b.length
  while (endA > start && endB > start && same(a[endA - 1], b[endB - 1])) {
    endA--
    endB--
  }
  const pairs = []
  for (let index = 0; index < start; index++) pairs.push([index, index])
  const rows = endA - start
  const columns = endB - start
  if (rows && columns && rows * columns <= 4e6) {
    const table = Array.from(
      { length: rows + 1 },
      () => new Uint16Array(columns + 1)
    )
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = columns - 1; j >= 0; j--) {
        table[i][j] = same(a[start + i], b[start + j])
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1])
      }
    }
    for (let i = 0, j = 0; i < rows && j < columns; ) {
      if (same(a[start + i], b[start + j])) {
        pairs.push([start + i, start + j])
        i++
        j++
      } else if (table[i + 1][j] >= table[i][j + 1]) i++
      else j++
    }
  }
  for (let index = 0; index < a.length - endA; index++) {
    pairs.push([endA + index, endB + index])
  }
  return pairs
}

const classes = (node) =>
  new Set((node.attrs.class ?? '').split(' ').filter(Boolean))

// Elements with the same tag count as one element changed when they share
// an id or most of their classes. A rewritten component then reads as one
// node missing and one extra, not as a tangle of changes inside
function similar(a, b) {
  if (a.type === 'text' || (a.attrs.id && a.attrs.id === b.attrs.id))
    return true
  const [x, y] = [classes(a), classes(b)]
  const shared = [...x].filter((token) => y.has(token)).length
  return x.size + y.size === 0 || shared / (x.size + y.size - shared) >= 0.5
}

// Align children: identical subtrees first, then the same tag, id and
// classes, then similar elements. Whatever’s left is missing or extra
const TESTS = [
  (a, b) => a.hash === b.hash,
  (a, b) => a.sig === b.sig,
  (a, b) => a.tag === b.tag && similar(a, b),
]

function align(live, build, level = 0, steps = []) {
  if (level === TESTS.length) {
    for (const node of live) steps.push(['missing', node, null])
    for (const node of build) steps.push(['extra', null, node])
    return steps
  }
  let i = 0
  let j = 0
  for (const [a, b] of [
    ...lcs(live, build, TESTS[level]),
    [live.length, build.length],
  ]) {
    align(live.slice(i, a), build.slice(j, b), level + 1, steps)
    if (a < live.length)
      steps.push([level ? 'pair' : 'same', live[a], build[b]])
    i = a + 1
    j = b + 1
  }
  return steps
}

// How the report names a node: tag, then id, a module class or a plain
// class, and its position among siblings of the same tag
function label(node, siblings) {
  if (node.type === 'text') return '#text'
  const tokens = [...classes(node)]
  const named =
    tokens.find((token) => token.startsWith('module:')) ??
    tokens.find((token) => !/[:[]/.test(token))
  const name = node.attrs.id ? `#${node.attrs.id}` : named ? `.${named}` : ''
  const same = siblings.filter((sibling) => sibling.tag === node.tag)
  const position =
    same.length > 1 ? `:nth-of-type(${same.indexOf(node) + 1})` : ''
  return `${node.tag}${name}${position}`
}

function compareNodes(live, build, context, records) {
  if (live.type === 'text') {
    records.push({ ...context, kind: 'changed', live, build, text: true })
    return
  }
  const changes = []
  const names = new Set([
    ...Object.keys(live.attrs),
    ...Object.keys(build.attrs),
  ])
  for (const name of [...names].sort()) {
    const [before, after] = [live.attrs[name], build.attrs[name]]
    if (before === after) continue
    const kind =
      before === undefined
        ? 'extra'
        : after === undefined
        ? 'missing'
        : 'changed'
    changes.push({ name, kind, live: before, build: after })
  }
  if (changes.length) {
    records.push({
      ...context,
      kind: 'changed',
      live,
      build,
      attributes: changes,
    })
  }
  const inner = {
    ...context,
    ancestors: {
      live: [...context.ancestors.live, live],
      build: [...context.ancestors.build, build],
    },
  }
  compareChildren(live.children, build.children, inner, records)
}

function compareChildren(live, build, context, records) {
  let previous = null
  for (const [step, a, b] of align(live, build)) {
    const node = a ?? b
    const siblings = a ? live : build
    const here = {
      ...context,
      path: [...context.path, label(node, siblings)],
      after: previous,
    }
    previous = node
    if (step === 'same') continue
    if (step === 'pair') compareNodes(a, b, here, records)
    else records.push({ ...here, kind: step, live: a, build: b })
  }
}

function compareBody(liveDoc, buildDoc) {
  const live = bodyOf(liveDoc)
  const build = bodyOf(buildDoc)
  // Pages without main#content on either side compare the whole body
  const shell = Boolean(first(live, isMain) || first(build, isMain))
  const liveRegions = regions(live, shell)
  const buildRegions = regions(build, shell)
  const result = {}
  for (const region of REGIONS) {
    const [a, b] = [liveRegions[region], buildRegions[region]]
    if (!a && !b) continue
    const records = []
    const context = {
      part: 'body',
      region,
      path: [],
      ancestors: { live: [], build: [] },
    }
    if (!b) records.push({ ...context, kind: 'missing', live: a, whole: true })
    else if (!a)
      records.push({ ...context, kind: 'extra', build: b, whole: true })
    else compareNodes(a, b, context, records)
    result[region] = records
  }
  return result
}

/* Expected differences */

// A small CSS selector engine: tag, #id, .class and [attr], [attr=v],
// [attr~=v], [attr^=v], [attr$=v] and [attr*=v], joined by descendant and
// child combinators, with commas between alternatives
function selector(source) {
  const split = (text, separator) => {
    const parts = []
    let depth = 0
    let quote = null
    let current = ''
    for (const char of text) {
      if (quote) quote = char === quote ? null : quote
      else if (char === '"' || char === "'") quote = char
      else if (char === '[') depth++
      else if (char === ']') depth--
      if (!quote && !depth && separator.test(char)) {
        parts.push(current)
        current = ''
        if (char === '>') parts.push('>')
      } else current += char
    }
    return [...parts, current].map((part) => part.trim()).filter(Boolean)
  }
  const compound = (text) => {
    const tests = []
    const pattern =
      /^[a-zA-Z*][\w-]*|#[^\s.#[]+|\.[^\s.#[]+|\[\s*([^\]~^$*=\s]+)\s*(?:([~^$*]?=)\s*(?:"([^"]*)"|'([^']*)'|([^\]\s]*))\s*)?\]/g
    for (const [token, name, operator, ...values] of text.matchAll(pattern)) {
      const value = values.find((part) => part !== undefined)
      if (token[0] === '#')
        tests.push((node) => node.attrs.id === token.slice(1))
      else if (token[0] === '.') {
        tests.push((node) =>
          (node.attrs.class ?? '').split(' ').includes(token.slice(1))
        )
      } else if (token[0] === '[') {
        tests.push((node) => {
          const actual = node.attrs[name]
          if (actual === undefined) return false
          if (!operator) return true
          if (operator === '=') return actual === value
          if (operator === '~=') return actual.split(/\s+/).includes(value)
          if (operator === '^=') return actual.startsWith(value)
          if (operator === '$=') return actual.endsWith(value)
          return actual.includes(value)
        })
      } else if (token !== '*') tests.push((node) => node.tag === token)
    }
    return (node) =>
      node?.type === 'element' && tests.every((test) => test(node))
  }
  return split(source, /,/).map((alternative) => {
    const steps = []
    let combinator = ' '
    for (const part of split(alternative, /[\s>]/)) {
      if (part === '>') combinator = '>'
      else {
        steps.push({ combinator, test: compound(part) })
        combinator = ' '
      }
    }
    return steps
  })
}

function selects(alternatives, node, ancestors = []) {
  // A text difference belongs to the element around it
  if (node?.type === 'text')
    [node, ancestors] = [ancestors.at(-1), ancestors.slice(0, -1)]
  const match = (steps, index, target, depth) => {
    if (!steps[index].test(target)) return false
    if (index === 0) return true
    if (steps[index].combinator === '>') {
      return (
        depth > 0 && match(steps, index - 1, ancestors[depth - 1], depth - 1)
      )
    }
    for (let up = depth - 1; up >= 0; up--) {
      if (match(steps, index - 1, ancestors[up], up)) return true
    }
    return false
  }
  return (
    Boolean(node) &&
    alternatives.some((steps) =>
      match(steps, steps.length - 1, node, ancestors.length)
    )
  )
}

function loadExpected() {
  if (!fs.existsSync(EXPECTED)) return []
  return JSON.parse(fs.readFileSync(EXPECTED, 'utf8')).map((entry, index) => {
    if (!entry.url || !entry.reason) {
      fail(
        `Entry ${index + 1} in ${path.relative(
          ROOT,
          EXPECTED
        )} needs a url and a reason`
      )
    }
    return {
      entry,
      url: glob(entry.url),
      node: entry.node && selector(entry.node),
      attribute: entry.attribute && glob(entry.attribute),
      used: 0,
    }
  })
}

// Take expected differences out of a page’s records: whole records, or
// single attribute changes when an entry names an attribute
function suppress(url, records, expected, suppressed) {
  return records.flatMap((record) => {
    let current = record
    for (const rule of expected) {
      const { entry } = rule
      if (!rule.url.test(url)) continue
      if (entry.part && entry.part !== current.part) continue
      if (entry.region && entry.region !== current.region) continue
      if (rule.node) {
        const live = selects(
          rule.node,
          current.live?.node ?? current.live,
          current.ancestors?.live
        )
        const build = selects(
          rule.node,
          current.build?.node ?? current.build,
          current.ancestors?.build
        )
        if (!live && !build) continue
      }
      if (entry.text && !describe(current).includes(entry.text)) continue
      if (rule.attribute) {
        if (!current.attributes) continue
        const hit = (change) =>
          rule.attribute.test(change.name) &&
          (!entry.kind || entry.kind === change.kind)
        const removed = current.attributes.filter(hit)
        if (!removed.length) continue
        rule.used += removed.length
        suppressed.push({
          url,
          rule,
          record: { ...current, attributes: removed },
        })
        current = {
          ...current,
          attributes: current.attributes.filter((change) => !hit(change)),
        }
        if (!current.attributes.length) return []
      } else if (!entry.kind || entry.kind === current.kind) {
        rule.used++
        suppressed.push({ url, rule, record: current })
        return []
      }
    }
    return [current]
  })
}

/* Describing differences */

const quote = (value) =>
  value === undefined ? '(none)' : JSON.stringify(value)

function clip(text, length = 160) {
  return text.length > length ? `${text.slice(0, length - 1)}…` : text
}

// A node’s start tag and the start of what’s inside
function snippet(node, length = 160) {
  if (!node) return '(none)'
  if (node.type === 'text') return quote(clip(node.value, length))
  return clip(html(node), length)
}

function where(record) {
  return [record.region, ...record.path].join(' > ')
}

function describe(record) {
  if (record.part === 'urls') return record.text
  if (record.part === 'files')
    return `${record.text}: ${quote(record.live)} → ${quote(record.build)}`
  if (record.part === 'head') {
    if (record.kind !== 'changed')
      return `${record.kind} ${(record.live ?? record.build).text}`
    const { live, build } = record
    if (live.json) {
      const changes = jsonChanges(live.json, build.json)
        .map(
          (change) =>
            `${change.path}: ${quote(change.live)} → ${quote(change.build)}`
        )
        .join('; ')
      return `changed ${live.key}: ${changes}`
    }
    return `changed ${live.text} → ${build.text}`
  }
  if (record.whole) return `${record.kind} ${record.region} (the whole region)`
  if (record.text) {
    return `changed ${where(record)}: text ${quote(
      record.live.value
    )} → ${quote(record.build.value)}`
  }
  if (record.attributes) {
    const changes = record.attributes
      .map(
        (change) =>
          `${change.name} ${quote(change.live)} → ${quote(change.build)}`
      )
      .join('; ')
    return `changed ${where(record)}: ${changes}`
  }
  return `${record.kind} ${where(record)}: ${html(record.live ?? record.build)}`
}

// Where two strings part, with a little either side
function divergence(live, build, before = 60, after = 100) {
  let at = 0
  while (at < live.length && live[at] === build[at]) at++
  const start = Math.max(at - before, 0)
  const cut = (text) =>
    `${start ? '…' : ''}${text.slice(start, at + after)}${
      text.length > at + after ? '…' : ''
    }`
  return [cut(live), cut(build)]
}

// The lines that show one difference
function details(record) {
  if (record.part === 'head') {
    if (record.kind !== 'changed')
      return [clip((record.live ?? record.build).text, 200)]
    if (record.live.json) {
      return jsonChanges(record.live.json, record.build.json).map(
        (change) =>
          `${change.path || '(root)'}: ${clip(quote(change.live), 90)} → ${clip(
            quote(change.build),
            90
          )}`
      )
    }
    const [live, build] = divergence(record.live.text, record.build.text)
    return [`live:  ${live}`, `build: ${build}`]
  }
  if (record.whole) return []
  if (record.text) {
    const [live, build] = divergence(record.live.value, record.build.value)
    return [`live:  ${quote(live)}`, `build: ${quote(build)}`]
  }
  if (record.attributes) {
    return record.attributes.flatMap((change) => {
      if (change.live === undefined || change.build === undefined) {
        return [
          `${change.name}: ${clip(quote(change.live), 90)} → ${clip(
            quote(change.build),
            90
          )}`,
        ]
      }
      const [live, build] = divergence(change.live, change.build, 40, 60)
      return [`${change.name}: ${quote(live)} → ${quote(build)}`]
    })
  }
  const lines = [snippet(record.live ?? record.build, 200)]
  if (record.after) lines.push(`after ${snippet(record.after, 100)}`)
  return lines
}

// The page’s own URL, as {url}
function general(text, url) {
  const escaped = url === '/' ? '' : url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replaceAll(
    new RegExp(`${ORIGIN}${escaped}(?=[#"?]|$)`, 'g'),
    '{url}'
  )
}

// What makes two differences the same across pages: the page’s own URL
// and position counters don’t count
function signature(record, url) {
  if (record.part === 'head') {
    return `head ${record.kind} ${general(
      (record.live ?? record.build).key,
      url
    )}`
  }
  if (record.whole) return `body ${record.kind} ${record.region}`
  const path = where(record).replace(/:nth-of-type\(\d+\)/g, '')
  if (record.text) return `body changed ${path} text`
  if (record.attributes) {
    const changes = record.attributes.map(({ kind, name }) => `${kind} ${name}`)
    return `body changed ${path} ${changes.join(' ')}`
  }
  return `body ${record.kind} ${path}`
}

/* Comparing */

function sameType(live, build) {
  const parts = (value) => {
    const [essence, ...parameters] = (value ?? '')
      .toLowerCase()
      .split(';')
      .map((part) => part.trim())
    const charset = parameters.find((part) => part.startsWith('charset='))
    return { essence, charset }
  }
  const [a, b] = [parts(live), parts(build)]
  return (
    a.essence === b.essence &&
    (!a.charset || !b.charset || a.charset === b.charset)
  )
}

// Production URLs against build files. Redirects, 410s and errors belong to
// the edge config (phase 4), so they’re listed rather than compared
function compareUrls(snapshot, inventory, filter) {
  const result = {
    records: [],
    redirects: [],
    gone: [],
    errors: [],
    broken: [],
    absent: [],
  }
  const add = (kind, url, text, extra) =>
    result.records.push({ part: 'urls', kind, url, text, ...extra })
  for (const [url, record] of Object.entries(snapshot.urls)) {
    if (!filter.test(url)) continue
    const built = inventory.urls.get(url)
    const { status } = record
    if (status === 200) {
      if (!built) add('missing', url, `missing ${url}`)
      else if (!sameType(record.type, built.type)) {
        const text = `type ${url}: ${record.type} → ${built.type}`
        add('type', url, text, { live: record.type, build: built.type })
      }
    } else if (status === 404 && url === NOT_FOUND) {
      // The 404 page itself, which the build writes as 404.html
      if (!inventory.notFound) add('missing', url, `missing ${url} (404.html)`)
    } else if (status === 404) {
      if (built && !built.asset) {
        add('extra', url, `extra ${url} (404 in production)`)
      } else if (record.sources.includes('crawl')) {
        result.broken.push(`${url} (linked from ${record.from})`)
      } else result.absent.push(url)
    } else if (status >= 300 && status < 400) {
      result.redirects.push({ url, status, location: record.location })
    } else if (status === 410) result.gone.push(url)
    else result.errors.push(`${url} (${status || record.error})`)
  }
  for (const [url, built] of inventory.urls) {
    if (built.asset || snapshot.urls[url] || !filter.test(url)) continue
    add('extra', url, `extra ${url} (not fetched from production)`)
  }
  return result
}

// HTML pages in both, and the 404 page
function comparePages(snapshot, inventory, options, expected, suppressed) {
  const pairs = []
  for (const [url, record] of Object.entries(snapshot.urls)) {
    const built = inventory.urls.get(url)
    const page = record.status === 200 && record.body && isHtml(record.type)
    if (page && built?.file.endsWith('.html') && !built.asset) {
      pairs.push([url, built.file])
    }
  }
  const missing = snapshot.urls[NOT_FOUND]
  if (missing?.status === 404 && missing.body && inventory.notFound) {
    pairs.push([NOT_FOUND, inventory.notFound])
  }
  return pairs
    .filter(([url]) => options.filter.test(url))
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([url, file]) => {
      const live = load(read(url))
      const build = load(fs.readFileSync(path.resolve(DIST, file), 'utf8'))
      const page = { url, emails: live.emails }
      if (options.parts.has('head')) {
        page.head = suppress(
          url,
          compareHead(live.doc, build.doc),
          expected,
          suppressed
        )
      }
      if (options.parts.has('body')) {
        page.body = {}
        for (const [region, records] of Object.entries(
          compareBody(live.doc, build.doc)
        )) {
          page.body[region] = suppress(url, records, expected, suppressed)
        }
      }
      return page
    })
}

// Dates a build stamps on its output, which differ every time
const VOLATILE = [
  [/^\/feed\.xml$/, /<lastBuildDate>[^<]*<\/lastBuildDate>/g],
  [/^\/sitemap\.xml$/, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g],
]

function steady(url, text) {
  return VOLATILE.reduce(
    (out, [route, pattern]) =>
      route.test(url) ? out.replace(pattern, '«build date»') : out,
    text
  )
}

// Text responses that aren’t HTML, in both, byte for byte
function compareFiles(snapshot, inventory, filter) {
  const result = { records: [], identical: 0 }
  for (const [url, record] of Object.entries(snapshot.urls)) {
    const built = inventory.urls.get(url)
    const text = record.status === 200 && record.body && !isHtml(record.type)
    if (!text || !built || !filter.test(url)) continue
    const live = steady(url, read(url))
    const build = steady(
      url,
      fs.readFileSync(path.resolve(DIST, built.file), 'utf8')
    )
    if (live === build) {
      result.identical++
      continue
    }
    const [from, to] = divergence(live, build)
    result.records.push({
      part: 'files',
      kind: 'changed',
      url,
      text: `changed ${url}`,
      live: from,
      build: to,
    })
  }
  return result
}

// partial: everything the build has matches, but production has more
function regionStatus(records) {
  if (!records.length) return 'match'
  if (records[0].whole) return records[0].kind
  return records.every(({ kind }) => kind === 'missing') ? 'partial' : 'differs'
}

function bodyStatus(page) {
  const statuses = Object.values(page.body).map(regionStatus)
  if (statuses.every((status) => status === 'match')) return 'match'
  const close = statuses.every(
    (status) => status === 'match' || status === 'partial'
  )
  return close ? 'partial' : 'differs'
}

/* Report */

const SECTIONS = [
  ['home', /^\/$/],
  ['404 page', new RegExp(`^${NOT_FOUND}$`)],
  ['blog', /^\/blog(\/page\/[^/]+)?$/],
  ['drafts', /^\/blog\/drafts(\/|$)/],
  ['posts', /^\/blog\/[^/]+$/],
  ['categories', /^\/category\//],
  ['notes', /^\/notes(\/|$)/],
  ['collections', /^\/collections(\/|$)/],
  ['api', /^\/api\//],
  ['well-known', /^\/\.well-known\//],
  ['feeds and indexes', /^\/(feed\.xml|sitemap\.xml|robots\.txt|llms\.txt)$/],
  ['files', /\.[a-z0-9]+$/i],
  ['pages', /^\/[^/]+$/],
  ['other', /^/],
]
const sectionOf = (url) => SECTIONS.find(([, pattern]) => pattern.test(url))[0]
const number = (count) => count.toLocaleString('en-GB')
const plural = (count, word, words = `${word}s`) =>
  `${number(count)} ${count === 1 ? word : words}`
const tally = (values, names) =>
  names.map((name) => number(values.filter((value) => value === name).length))
const PAD = ' '.repeat(11)

function list(items, verbose, limit = 5) {
  if (verbose || items.length <= limit + 1) return items.join(', ')
  const rest = number(items.length - limit)
  return `${items.slice(0, limit).join(', ')} and ${rest} more`
}

function when(iso) {
  const date = new Date(iso)
  const minutes = Math.round((Date.now() - date) / 60000)
  const age =
    minutes < 1
      ? 'just now'
      : minutes < 60
      ? `${plural(minutes, 'minute')} ago`
      : minutes < 2880
      ? `${plural(Math.round(minutes / 60), 'hour')} ago`
      : `${plural(Math.round(minutes / 1440), 'day')} ago`
  const stamp = date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${stamp}, ${age}`
}

// Differences with the same signature on different pages, most widespread
// first
function groups(entries) {
  const found = new Map()
  for (const entry of entries) {
    const key = signature(entry.record, entry.url)
    found.set(key, [...(found.get(key) ?? []), entry])
  }
  return [...found.values()]
    .map((group) => ({
      group,
      pages: [...new Set(group.map(({ url }) => url))],
    }))
    .sort((a, b) => b.pages.length - a.pages.length)
}

// The one-line name for a group of differences. URLs and positions vary
// from page to page, so a group that spans pages leaves them out
function headline(record, varies, spread, url) {
  if (record.part === 'head') {
    const item = record.live ?? record.build
    if (record.kind === 'changed' || varies || item.json) {
      return `${record.kind} ${spread ? general(item.key, url) : item.key}`
    }
    return `${record.kind} ${clip(item.text, 160)}`
  }
  if (record.whole) return `${record.kind} ${record.region} (the whole region)`
  const at = spread
    ? where(record).replace(/:nth-of-type\(\d+\)/g, '')
    : where(record)
  const names = record.attributes?.map(({ name }) => name).join(', ')
  if (names) return `changed ${at}: ${names}`
  return `${record.kind} ${at}${record.text ? ': text' : ''}`
}

function printGroups(lines, entries, total, options, limit = 30) {
  const found = groups(entries)
  const shown = options.verbose ? found : found.slice(0, limit)
  for (const { group, pages } of shown) {
    const [{ url, record }] = group
    const varies =
      new Set(group.map((entry) => describe(entry.record))).size > 1
    const everywhere = pages.length === total && total > 1
    const count = everywhere ? `all ${number(total)}` : number(pages.length)
    const title = headline(record, varies, pages.length > 1, url)
    lines.push(`  ${count.padStart(7)}  ${title}`)
    // A head item that’s the same on every page is in full above already
    const item = record.live ?? record.build
    const full =
      record.part === 'head' &&
      record.kind !== 'changed' &&
      !varies &&
      !item.json
    if (varies && pages.length > 1) lines.push(`${PAD}e.g. on ${url}`)
    if (!full) lines.push(...details(record).map((detail) => PAD + detail))
    if (pages.length < total) {
      const where = list(pages, options.verbose)
      lines.push(`${PAD}on ${where}`)
    }
  }
  if (shown.length < found.length) {
    const more = plural(found.length - shown.length, 'more kind')
    lines.push(`  … and ${more} (--verbose lists them)`)
  }
}

function printUrls(lines, report) {
  const { snapshot, inventory, urls, options } = report
  const records = Object.values(snapshot.urls)
  const total = plural(records.length, 'URL')
  const [sitemap, extra, crawl, probe] = [
    'sitemap',
    'extra',
    'crawl',
    'probe',
  ].map(
    (source) => records.filter(({ sources }) => sources.includes(source)).length
  )
  const assets = [...inventory.urls.values()].filter(
    ({ asset }) => asset
  ).length
  const pages = plural(inventory.urls.size - assets, 'page')
  const files = plural(assets, 'file')
  lines.push(
    '',
    'URLs',
    `  Production: ${total} (${sitemap} from the sitemap, ${extra} known extras, ${crawl} found by crawling, ${probe} probed for the build)`,
    `  Build: ${pages} and ${files} from public/, not counting _astro/`
  )

  const kind = (name) => urls.records.filter((record) => record.kind === name)
  const missing = kind('missing')
    .map(({ url }) => url)
    .sort()
  lines.push('', `  Missing from the build (${missing.length})`)
  for (const [section] of SECTIONS) {
    const found = missing.filter((url) => sectionOf(url) === section)
    if (!found.length) continue
    const name = section.padEnd(18)
    const size = String(found.length).padStart(4)
    const examples = list(found, options.verbose)
    lines.push(`    ${name}${size}  ${examples}`)
  }

  const extras = kind('extra')
  lines.push('', `  In the build, not served by production (${extras.length})`)
  for (const { text } of extras)
    lines.push(`    ${text.replace(/^extra /, '')}`)

  const types = kind('type')
  lines.push('', `  Different content types (${types.length})`)
  for (const { url, live, build } of types) {
    lines.push(`    ${url}: ${live} in production, ${build} in the build`)
  }

  // Listed for reference: the edge config’s job, or production’s own bugs
  let chains = 0
  const redirects = urls.redirects.map(({ url, status, location }) => {
    const next = snapshot.urls[internal(location ?? '', url)]
    const again = next?.status >= 300 && next?.status < 400
    if (again) chains++
    return `${url} → ${location} (${status}${again ? ', then again' : ''})`
  })
  const chained = chains ? `, ${chains} into another redirect` : ''
  const notes = [
    [redirects, `${plural(redirects.length, 'redirect')}${chained}`],
    [urls.gone, `${plural(urls.gone.length, 'URL')} gone (410)`],
    [urls.errors, plural(urls.errors.length, 'error')],
    [urls.broken, `${plural(urls.broken.length, 'broken link')} (404)`],
    [
      urls.absent,
      `404 in production and not in the build (${urls.absent.length})`,
    ],
  ].filter(([items]) => items.length)
  if (!notes.length) return
  lines.push(
    '',
    '  Not compared: edge behaviour (phase 4) and production’s own errors'
  )
  for (const [items, label] of notes) {
    const shown = list(items, options.verbose, 3)
    lines.push(`    ${label}: ${shown}`)
  }
}

function printHead(lines, pages, options) {
  const entries = pages.flatMap(({ url, head }) =>
    head.map((record) => ({ url, record }))
  )
  const differ = pages.filter(({ head }) => head.length).length
  const compared = plural(pages.length, 'page')
  const [match, differs] = [pages.length - differ, differ].map(number)
  lines.push('', `Head (${compared}: ${match} match, ${differs} differ)`)
  printGroups(lines, entries, pages.length, options)
}

function printBody(lines, pages, options) {
  const compared = plural(pages.length, 'page')
  const [match, partial, differs] = tally(pages.map(bodyStatus), [
    'match',
    'partial',
    'differs',
  ])
  lines.push(
    '',
    `Body (${compared}: ${match} match, ${partial} partial, ${differs} differ)`
  )
  const columns = ['match', 'partial', 'differs', 'missing', 'extra']
  const header = columns.map((column) => column.padStart(9)).join('')
  lines.push(`  ${'Region'.padEnd(22)}${header}`)
  for (const region of REGIONS) {
    const found = pages
      .filter(({ body }) => body[region])
      .map(({ body }) => regionStatus(body[region]))
    if (!found.length) continue
    const counts = tally(found, columns).map((count) => count.padStart(9))
    lines.push(`  ${region.padEnd(22)}${counts.join('')}`)
  }
  lines.push(
    '  partial: what the build has in the region matches, and production has more'
  )
  const decoded = pages.filter(({ emails }) => emails).map(({ url }) => url)
  if (decoded.length) {
    const shown = list(decoded, options.verbose)
    lines.push(
      `  Cloudflare’s email obfuscation, decoded before comparing, on ${shown}`
    )
  }

  const entries = pages.flatMap(({ url, body }) =>
    REGIONS.flatMap((region) =>
      (body[region] ?? []).map((record) => ({ url, record }))
    )
  )
  if (!entries.length) return
  lines.push('', '  Differences, most widespread first')
  printGroups(lines, entries, pages.length, options)

  // The first differing node on each page, pages that share it together
  const firsts = new Map()
  for (const { url, body } of pages) {
    const records = REGIONS.flatMap((region) => body[region] ?? [])
    if (!records.length) continue
    const record = records.find(({ whole }) => !whole) ?? records[0]
    const key = signature(record, url)
    if (!firsts.has(key)) firsts.set(key, { record, pages: [] })
    firsts.get(key).pages.push(`${url} (${records.length})`)
  }
  lines.push(
    '',
    '  First difference on each page, with its count of differing nodes'
  )
  for (const { record, pages: found } of firsts.values()) {
    const where = list(found, options.verbose)
    lines.push(`    ${headline(record, false, found.length > 1)}`)
    lines.push(
      ...details(record).map((detail) => `      ${detail}`),
      `      ${where}`
    )
  }
}

function printFiles(lines, files, options) {
  lines.push('', `Files that differ (${number(files.records.length)})`)
  const shown = options.verbose ? files.records : files.records.slice(0, 30)
  for (const { url, live, build } of shown) {
    lines.push(
      `  ${url}`,
      `    live:  ${quote(live)}`,
      `    build: ${quote(build)}`
    )
  }
  if (shown.length < files.records.length)
    lines.push(`  and ${files.records.length - shown.length} more (--verbose)`)
}

function printExpected(lines, report) {
  const { suppressed, expected, options } = report
  if (options.expected) {
    lines.push('', `Expected differences (${suppressed.length} suppressed)`)
    for (const rule of expected.filter(({ used }) => used)) {
      const mine = suppressed.filter((entry) => entry.rule === rule)
      const count = plural(mine.length, 'difference')
      const where = list(
        [...new Set(mine.map(({ url }) => url))],
        options.verbose
      )
      lines.push(`  ${rule.entry.reason}`, `    ${count} on ${where}`)
      for (const { url, record } of options.verbose ? mine : mine.slice(0, 3)) {
        const text = clip(describe(record), 150)
        lines.push(`    ${url}: ${text}`)
      }
    }
  }
  const { unused } = report
  if (!unused.length) return
  lines.push(
    '',
    `Entries in parity-expected.json that matched nothing (${unused.length})`
  )
  for (const { entry } of unused) lines.push(`  ${entry.url}: ${entry.reason}`)
}

function summary({ options, urls, files, pages = [], suppressed }) {
  const lines = []
  const count = (records, names) =>
    names.map((name) =>
      number(records.filter(({ kind }) => kind === name).length)
    )
  const compared = plural(pages.length, 'page')
  if (urls) {
    const [missing, extra, type] = count(urls.records, [
      'missing',
      'extra',
      'type',
    ])
    lines.push(
      `  URLs      ${missing} missing from the build, ${extra} only in the build, ${type} with another content type`
    )
  }
  if (options.parts.has('head')) {
    const records = pages.flatMap(({ head }) => head)
    const differ = pages.filter(({ head }) => head.length).length
    const [match, differs] = [pages.length - differ, differ].map(number)
    const [missing, extra, changed] = count(records, [
      'missing',
      'extra',
      'changed',
    ])
    lines.push(
      `  Head      ${compared}: ${match} match, ${differs} differ; ${missing} items missing, ${extra} extra, ${changed} changed`
    )
  }
  if (options.parts.has('body')) {
    const states = ['match', 'partial', 'differs']
    const [match, partial, differs] = tally(pages.map(bodyStatus), states)
    const records = pages.flatMap(({ body }) => Object.values(body).flat())
    const nodes = plural(records.length, 'differing node')
    lines.push(
      `  Body      ${compared}: ${match} match, ${partial} partial, ${differs} differ; ${nodes}`
    )
    const articles = pages
      .filter(({ body }) => body['#article'])
      .map(({ body }) => regionStatus(body['#article']))
    if (articles.length) {
      const [match, partial, differs] = tally(articles, states)
      const of = plural(articles.length, 'page')
      lines.push(
        `            #article on ${of}: ${match} match, ${partial} partial, ${differs} differ`
      )
    }
  }
  if (files) {
    const compared = plural(files.identical + files.records.length, 'file')
    lines.push(
      `  Files     ${compared}: ${number(files.identical)} identical, ${number(
        files.records.length
      )} differ`
    )
  }
  const differences = plural(suppressed.length, 'difference')
  const on = plural(new Set(suppressed.map(({ url }) => url)).size, 'page')
  const hint = options.expected ? '' : ' (--expected lists them)'
  lines.push(`  Expected  ${differences} on ${on} suppressed${hint}`)
  return lines
}

function print(report) {
  const { options, snapshot, urls, pages = [] } = report
  const only = options.only ? `, URLs matching ${options.only}` : ''
  const crawled = when(snapshot.crawledAt)
  const lines = [
    `Parity: the build against ${ORIGIN}${only}`,
    `Production snapshot crawled ${crawled} (--refresh fetches it again)`,
  ]
  if (snapshot.limited) lines.push(`The crawl stopped at ${CRAWL_LIMIT} URLs`)
  lines.push('', 'Summary', ...summary(report))
  if (urls) printUrls(lines, report)
  if (pages.length && options.parts.has('head'))
    printHead(lines, pages, options)
  if (pages.length && options.parts.has('body'))
    printBody(lines, pages, options)
  if (report.files?.records.length) printFiles(lines, report.files, options)
  printExpected(lines, report)
  console.log(lines.join('\n'))
}

/* JSON */

function serialise(record) {
  const out = { kind: record.kind, description: clip(describe(record), 2000) }
  if (record.part === 'body') {
    Object.assign(out, { region: record.region, path: record.path.join(' > ') })
    if (!record.whole) {
      const show = (node) =>
        node && clip(node.type === 'text' ? node.value : html(node), 2000)
      Object.assign(out, { live: show(record.live), build: show(record.build) })
    }
    if (record.attributes) out.attributes = record.attributes
  } else if (record.part === 'head') {
    Object.assign(out, { live: record.live?.text, build: record.build?.text })
  }
  return out
}

function writeJson(file, report) {
  const { options, snapshot, urls, pages = [], suppressed } = report
  const json = {
    origin: ORIGIN,
    generatedAt: now(),
    crawledAt: snapshot.crawledAt,
    parts: [...options.parts],
    only: options.only ?? null,
    urls: urls && {
      differences: urls.records.map(({ kind, url, text, live, build }) => ({
        kind,
        url,
        text,
        live,
        build,
      })),
      redirects: urls.redirects,
      gone: urls.gone,
      errors: urls.errors,
      broken: urls.broken,
    },
    files: report.files && {
      identical: report.files.identical,
      differences: report.files.records.map(({ url, live, build }) => ({
        url,
        live,
        build,
      })),
    },
    pages: pages.map(({ url, emails, head, body }) => ({
      url,
      cloudflareEmails: emails,
      head: head?.map(serialise),
      body:
        body &&
        Object.fromEntries(
          Object.entries(body).map(([region, records]) => [
            region,
            {
              status: regionStatus(records),
              differences: records.map(serialise),
            },
          ])
        ),
    })),
    expected: {
      suppressed: suppressed.map(({ url, rule, record }) => ({
        url,
        reason: rule.entry.reason,
        ...serialise(record),
      })),
      unused: report.unused.map(({ entry }) => entry),
    },
  }
  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`)
}

/* Main */

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const inventory = build()
  const generated = [...inventory.urls]
    .filter(([, { asset }]) => !asset)
    .map(([url]) => url)
  const snapshot = await production(options, generated)
  await renderOnDemand(snapshot, inventory)
  const expected = loadExpected()
  const suppressed = []
  const report = { options, snapshot, inventory, expected, suppressed }

  if (options.parts.has('urls')) {
    const urls = compareUrls(snapshot, inventory, options.filter)
    urls.records = urls.records.flatMap((record) =>
      suppress(record.url, [record], expected, suppressed)
    )
    report.urls = urls
  }
  if (options.parts.has('head') || options.parts.has('body')) {
    report.pages = comparePages(
      snapshot,
      inventory,
      options,
      expected,
      suppressed
    )
  }

  if (options.parts.has('files')) {
    const files = compareFiles(snapshot, inventory, options.filter)
    files.records = files.records.flatMap((record) =>
      suppress(record.url, [record], expected, suppressed)
    )
    report.files = files
  }

  // Only a full run can tell that an entry no longer matches anything
  const full = !options.only && options.parts.size === 4
  report.unused = full ? expected.filter(({ used }) => !used) : []

  print(report)
  if (options.json) writeJson(options.json, report)
  const unexpected =
    (report.urls?.records.length ?? 0) +
    (report.files?.records.length ?? 0) +
    (report.pages ?? []).reduce(
      (sum, { head = [], body = {} }) =>
        sum + head.length + Object.values(body).flat().length,
      0
    )
  process.exitCode = unexpected ? 1 : 0
}

await main()
