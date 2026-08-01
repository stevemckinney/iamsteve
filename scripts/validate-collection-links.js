const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const matter = require('gray-matter')
const pLimit = require('p-limit').default

// Configuration
const COLLECTIONS_DIR = 'content/collections'
const CACHE_FILE = '.link-validation-cache'
const RESULTS_FILE = '.validation-results.json'
const IGNORE_FILE = 'link-check-ignore.json'
const CACHE_TTL_DAYS = 7
const CONCURRENT_REQUESTS = 5
const REQUEST_TIMEOUT_MS = 10000
const MAX_RETRIES = 2

// Query params that never change which page you land on
const TRACKING_PARAMS =
  /^(utm_|mc_(cid|eid)$|fbclid$|gclid$|igshid$|ref$|source$)/i

// Many CDNs reject HEAD outright, so retry these with GET before believing them
const RETRY_WITH_GET = new Set([403, 404, 405, 406, 409, 429, 501])

// Responses that mean "a server answered, but refused to prove the page exists"
const BOT_PROTECTION_CODES = new Set([401, 403, 406, 429, 503])

// Browser-like headers for requests
const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  DNT: '1',
  Connection: 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
}

// Load cache
function loadCache() {
  if (!fs.existsSync(CACHE_FILE)) return {}
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
  } catch {
    return {}
  }
}

// Save cache
function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
}

// Load acknowledged links — URLs checked by hand that should be left alone
function loadIgnoreList() {
  if (!fs.existsSync(IGNORE_FILE)) return new Map()
  try {
    const { urls } = JSON.parse(fs.readFileSync(IGNORE_FILE, 'utf8'))
    return new Map(
      Object.entries(urls || {}).map(([url, reason]) => [
        normaliseUrl(url),
        reason,
      ])
    )
  } catch (error) {
    console.warn(`⚠️  Could not read ${IGNORE_FILE}: ${error.message}`)
    return new Map()
  }
}

// Check if cache entry is still valid
function isCacheValid(entry) {
  if (!entry || !entry.timestamp) return false
  const age = Date.now() - entry.timestamp
  return age < CACHE_TTL_DAYS * 24 * 60 * 60 * 1000
}

// Track how long a URL has held its current status, across runs. A link that
// has been refused every week is stable; one that just changed is the news.
function recordStatus(cache, url, status, statusCode) {
  const previous = cache[url]
  const now = Date.now()
  const changed = !previous || previous.status !== status

  cache[url] = {
    status,
    statusCode,
    timestamp: now,
    since: changed ? now : previous.since || previous.timestamp || now,
    runs: changed ? 1 : (previous.runs || 1) + 1,
  }

  return cache[url]
}

// A bare domain link — for these a responding host answers most of the question
function isHomepage(url) {
  try {
    return new URL(url).pathname.replace(/\/$/, '') === ''
  } catch {
    return false
  }
}

// Normalise a URL so that two links to the same page produce the same key.
// Collapses protocol, www, trailing slash, fragment and tracking params.
function normaliseUrl(url) {
  try {
    const urlObj = new URL(url)

    urlObj.protocol = 'https:'
    urlObj.hostname = urlObj.hostname.replace(/^www\./, '').toLowerCase()
    urlObj.hash = ''

    for (const param of [...urlObj.searchParams.keys()]) {
      if (TRACKING_PARAMS.test(param)) urlObj.searchParams.delete(param)
    }
    urlObj.searchParams.sort()

    return urlObj.toString().replace(/\/$/, '')
  } catch {
    return url // Fallback to full URL if parsing fails
  }
}

// Detect links to the same page across all collections
function detectDuplicates(allCollections) {
  const urlMap = new Map() // normalised url -> [files]
  const duplicates = []

  allCollections.forEach(({ file, url }) => {
    const key = normaliseUrl(url)

    if (!urlMap.has(key)) {
      urlMap.set(key, [])
    }
    urlMap.get(key).push({ file, url })
  })

  for (const [key, files] of urlMap.entries()) {
    if (files.length > 1) {
      duplicates.push({
        url: key,
        files: files,
        count: files.length,
      })
    }
  }

  return duplicates
}

// Categorize: 404/410 are dead, bot protection is unverifiable, rest needs a look
function categorizeError(result) {
  if (result.statusCode === 404 || result.statusCode === 410) {
    return { category: 'broken', priority: 'high', icon: '❌' }
  }
  if (result.blocked) {
    return { category: 'blocked', priority: 'none', icon: '🛡️' }
  }
  return { category: 'needs_check', priority: 'low', icon: '⚠️' }
}

// Identify a refusal by bot protection rather than a missing page
function isBotProtection(status, headers) {
  if (!BOT_PROTECTION_CODES.has(status)) return false

  const via = `${headers.get('server') || ''} ${
    headers.get('cf-mitigated') || ''
  } ${headers.get('x-powered-by') || ''}`.toLowerCase()

  const vendor =
    headers.has('cf-ray') ||
    headers.has('x-datadome') ||
    /cloudflare|akamai|datadome|sucuri|incapsula|imperva|perimeterx/.test(via)

  // 401/403 from a known WAF, or any of these codes, means we simply can't tell
  return vendor || status === 403 || status === 429 || status === 503
}

// Make a fetch request with timeout and browser-like headers
async function request(url, method = 'HEAD') {
  const response = await fetch(url, {
    method,
    headers: REQUEST_HEADERS,
    redirect: 'follow',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  if (response.status >= 200 && response.status < 400) {
    return { status: 'valid', statusCode: response.status }
  }

  return {
    status: 'error',
    statusCode: response.status,
    error: `HTTP ${response.status}`,
    blocked: isBotProtection(response.status, response.headers),
  }
}

// Validate single URL with retries
async function validateUrl(url, retries = MAX_RETRIES) {
  try {
    // Try HEAD first (faster)
    let result = await request(url, 'HEAD')
    if (result.status === 'valid') return result

    // Plenty of servers and CDNs reject HEAD, so a GET is the honest answer
    if (RETRY_WITH_GET.has(result.statusCode)) {
      try {
        const getResult = await request(url, 'GET')
        if (getResult.status === 'valid') return getResult
        result = getResult
      } catch (getError) {
        if (retries > 0) {
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (MAX_RETRIES - retries + 1))
          )
          return validateUrl(url, retries - 1)
        }
        return {
          status: 'error',
          error: getError.message,
          statusCode: getError.cause?.code,
        }
      }
    }

    // Retry on timeout, rate limit, or server error
    if (
      retries > 0 &&
      (result.statusCode === 429 || result.statusCode >= 500)
    ) {
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 * (MAX_RETRIES - retries + 1))
      )
      return validateUrl(url, retries - 1)
    }

    return result
  } catch (error) {
    const isTimeout =
      error.name === 'TimeoutError' || error.cause?.code === 'ETIMEDOUT'

    if (retries > 0 && isTimeout) {
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 * (MAX_RETRIES - retries + 1))
      )
      return validateUrl(url, retries - 1)
    }

    return {
      status: 'error',
      error: error.message,
      code: error.cause?.code,
    }
  }
}

// Get files to check
function getFilesToCheck() {
  const checkAll = process.env.CHECK_ALL === 'true'

  if (checkAll) {
    return fs
      .readdirSync(COLLECTIONS_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => path.join(COLLECTIONS_DIR, f))
  }

  // Get changed files from git
  try {
    const output = execSync('git diff --name-only HEAD~1 HEAD', {
      encoding: 'utf8',
    })
    return output
      .split('\n')
      .filter((f) => f.startsWith(COLLECTIONS_DIR) && f.endsWith('.md'))
  } catch {
    // Fallback: check all if git diff fails
    return fs
      .readdirSync(COLLECTIONS_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => path.join(COLLECTIONS_DIR, f))
  }
}

async function main() {
  const cache = loadCache()
  const ignored = loadIgnoreList()
  const filesToCheck = getFilesToCheck()

  console.log(`Checking ${filesToCheck.length} collection files...`)

  const results = {
    valid: [],
    broken: [], // 404/410 — the page is genuinely gone
    blocked: [], // Refused by bot protection — unverifiable, not actionable
    needs_check: [], // Everything else
    duplicates: [],
    acknowledged: [], // Listed in link-check-ignore.json
    skipped: [],
  }

  const limit = pLimit(CONCURRENT_REQUESTS)

  const tasks = filesToCheck.map((file) =>
    limit(async () => {
      const content = fs.readFileSync(file, 'utf8')
      const { data } = matter(content)

      if (!data.url) {
        results.skipped.push({ file, reason: 'No URL in frontmatter' })
        return
      }

      const url = data.url
      const filename = path.basename(file)

      // Acknowledged by hand — leave it alone
      if (ignored.has(normaliseUrl(url))) {
        console.log(`🔕 ${filename} (acknowledged)`)
        results.acknowledged.push({
          file: filename,
          url,
          reason: ignored.get(normaliseUrl(url)),
        })
        return
      }

      // Check cache — only a known-good result lets us skip the request
      if (
        cache[url] &&
        cache[url].status === 'valid' &&
        isCacheValid(cache[url])
      ) {
        console.log(`✓ ${filename} (cached)`)
        results.valid.push({ file: filename, url, cached: true })
        return
      }

      // Validate URL
      console.log(`Checking ${filename}: ${url}`)
      const result = await validateUrl(url)

      if (result.status === 'valid') {
        console.log(`✓ ${filename}`)
        results.valid.push({ file: filename, url })
        recordStatus(cache, url, 'valid', result.statusCode)
      } else {
        const errorCategory = categorizeError(result)

        // Track the raw category so a streak keeps counting across runs
        const history = recordStatus(
          cache,
          url,
          errorCategory.category,
          result.statusCode
        )

        // A domain that repeatedly fails to resolve has genuinely gone, but one
        // transient DNS blip in CI should not condemn a live site
        const deadDomain = result.code === 'ENOTFOUND' && history.runs >= 2
        const category = deadDomain ? 'broken' : errorCategory.category

        console.log(
          `${deadDomain ? '❌' : errorCategory.icon} ${filename}: ${
            result.error || result.statusCode
          }`
        )

        results[category].push({
          file: filename,
          url,
          error: result.error,
          statusCode: result.statusCode,
          code: result.code,
          since: history.since,
          runs: history.runs,
          changed: history.runs === 1,
          homepage: isHomepage(url),
        })
      }
    })
  )

  await Promise.all(tasks)

  // Detect duplicate URLs across all collections
  const allCollections = fs
    .readdirSync(COLLECTIONS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const content = fs.readFileSync(path.join(COLLECTIONS_DIR, f), 'utf8')
      const { data } = matter(content)
      return { file: f, url: data.url }
    })
    .filter((c) => c.url) // Only collections with URLs

  results.duplicates = detectDuplicates(allCollections)

  // Save cache and results
  saveCache(cache)

  const failures = [
    ...results.broken,
    ...results.blocked,
    ...results.needs_check,
  ]
  const changedCount = failures.filter((r) => r.changed).length

  const summary = `
**Summary:**
- ✅ Valid: ${results.valid.length}
- ❌ Broken (High Priority): ${results.broken.length}
- ⚠️ Needs Check (Low Priority): ${results.needs_check.length}
- 🛡️ Blocked by bot protection: ${results.blocked.length}
- 🆕 Changed since last run: ${changedCount}
- 🔗 Duplicate URLs: ${results.duplicates.length}
- 🔕 Acknowledged: ${results.acknowledged.length}
  `.trim()

  let details = ''

  const errorTable = (rows) => {
    let table =
      '| File | URL | Error | Since |\n|------|-----|-------|-------|\n'
    rows.forEach(({ file, url, error, statusCode, code, since, runs }) => {
      const errorMsg = statusCode
        ? `HTTP ${statusCode}`
        : code || error || 'Unknown'
      const seen =
        runs > 1
          ? `${new Date(since).toISOString().slice(0, 10)} (${runs} runs)`
          : '🆕 new'
      table += `| ${file} | ${url} | ${errorMsg} | ${seen} |\n`
    })
    return table
  }

  // Broken links (404/410 confirmed by GET - high priority)
  if (results.broken.length > 0) {
    details += '\n\n### ❌ Broken Links (Definitely Dead - High Priority)\n\n'
    details += errorTable(results.broken)
  }

  // Needs manual check (timeouts, DNS failures, server errors)
  if (results.needs_check.length > 0) {
    details += '\n\n### ⚠️ Needs Manual Check (Low Priority)\n\n'
    details += errorTable(results.needs_check)
  }

  // Blocked by bot protection — split by how much doubt there actually is.
  // A refusal still proves DNS, TLS and a live server, so for a bare domain
  // there is little left to doubt. Only a deep link can still have rotted.
  if (results.blocked.length > 0) {
    const deepLinks = results.blocked.filter((r) => !r.homepage)
    const homepages = results.blocked.filter((r) => r.homepage)

    if (deepLinks.length > 0) {
      details += `\n\n### 🛡️ Blocked deep links (${deepLinks.length})\n\n`
      details +=
        'The host is answering, but these point at a specific page that could not be confirmed. Worth opening by hand.\n\n'
      details += errorTable(deepLinks)
    }

    if (homepages.length > 0) {
      details += '\n\n<details>\n<summary>🛡️ Blocked homepages '
      details += `(${homepages.length}) — host responding, so the site is alive</summary>\n\n`
      details += errorTable(homepages)
      details += `\nAdd any of these to \`${IGNORE_FILE}\` to stop them appearing here.\n`
      details += '\n</details>\n'
    }
  }

  // Duplicate URLs — two files pointing at the same page
  if (results.duplicates.length > 0) {
    details += '\n\n### 🔗 Duplicate URLs Found\n\n'
    results.duplicates.forEach(({ url, files, count }) => {
      details += `**${url}** (${count} files)\n`
      files.forEach(({ file, url }) => {
        details += `  - \`${file}\` → ${url}\n`
      })
      details += '\n'
    })
  }

  fs.writeFileSync(
    RESULTS_FILE,
    JSON.stringify(
      {
        summary,
        details,
        broken_count: results.broken.length,
        results,
      },
      null,
      2
    )
  )

  console.log('\n' + summary)
  console.log(details)

  // Set output for GitHub Actions (::set-output is no longer honoured)
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `broken_count=${results.broken.length}\n`
    )
  }

  // Exit with non-zero if broken links found (optional - comment out to make non-blocking)
  // process.exit(results.broken.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error)

  // Write a fallback results file so downstream workflow steps don't fail
  fs.writeFileSync(
    RESULTS_FILE,
    JSON.stringify(
      {
        summary: `**Summary:**\n- ⚠️ Validation script encountered an error: ${error.message}`,
        details: '',
        broken_count: 0,
        results: {
          valid: [],
          broken: [],
          blocked: [],
          needs_check: [],
          duplicates: [],
          acknowledged: [],
          skipped: [],
        },
      },
      null,
      2
    )
  )

  // -1 means "unknown", so a crash neither files an issue nor closes an open one
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'broken_count=-1\n')
  }
})
