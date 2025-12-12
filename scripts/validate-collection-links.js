const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const matter = require('gray-matter')
const axios = require('axios')
const pLimit = require('p-limit').default

// Configuration
const COLLECTIONS_DIR = 'content/collections'
const CACHE_FILE = '.link-validation-cache'
const RESULTS_FILE = '.validation-results.json'
const CACHE_TTL_DAYS = 7
const CONCURRENT_REQUESTS = 5
const REQUEST_TIMEOUT_MS = 10000
const MAX_RETRIES = 2

// HTTP client with browser-like headers
const client = axios.create({
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    DNT: '1',
    Connection: 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
  },
  maxRedirects: 5,
  validateStatus: (status) => status >= 200 && status < 400,
})

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

// Check if cache entry is still valid
function isCacheValid(entry) {
  if (!entry || !entry.timestamp) return false
  const age = Date.now() - entry.timestamp
  return age < CACHE_TTL_DAYS * 24 * 60 * 60 * 1000
}

// Get domain key for duplicate detection
function getDomainKey(url) {
  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname.replace('www.', '')

    // Special handling for platforms with unique content per path
    const platformsWithUniqueContent = [
      'medium.com',
      'github.com',
      'youtube.com',
      'twitter.com',
      'x.com',
      'linkedin.com',
      'behance.net',
      'dribbble.com',
    ]

    // For content platforms, include path in key
    if (platformsWithUniqueContent.some((p) => domain.includes(p))) {
      return `${domain}${urlObj.pathname}`
    }

    // For regular sites, just use domain
    return domain
  } catch {
    return url // Fallback to full URL if parsing fails
  }
}

// Detect duplicate URLs across all collections
function detectDuplicates(allCollections) {
  const urlMap = new Map() // domain/path -> [files]
  const duplicates = []

  allCollections.forEach(({ file, url }) => {
    const key = getDomainKey(url)

    if (!urlMap.has(key)) {
      urlMap.set(key, [])
    }
    urlMap.get(key).push({ file, url })
  })

  // Find duplicates
  for (const [key, files] of urlMap.entries()) {
    if (files.length > 1) {
      duplicates.push({
        domain: key,
        files: files,
        count: files.length,
      })
    }
  }

  return duplicates
}

// Categorize errors: 404 is definitely broken, everything else needs manual check
function categorizeError(result) {
  if (result.statusCode === 404) {
    return { category: 'broken', priority: 'high', icon: '❌' }
  }
  return { category: 'needs_check', priority: 'low', icon: '⚠️' }
}

// Validate single URL with retries
async function validateUrl(url, retries = MAX_RETRIES) {
  try {
    // Try HEAD first (faster)
    await client.head(url)
    return { status: 'valid', statusCode: 200 }
  } catch (error) {
    if (error.response?.status === 405) {
      // Method not allowed, try GET
      try {
        await client.get(url, { maxContentLength: 1024 * 100 }) // 100KB limit
        return { status: 'valid', statusCode: 200 }
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
          statusCode: getError.response?.status,
        }
      }
    }

    if (
      retries > 0 &&
      (error.code === 'ETIMEDOUT' ||
        error.response?.status === 429 ||
        error.response?.status >= 500)
    ) {
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 * (MAX_RETRIES - retries + 1))
      )
      return validateUrl(url, retries - 1)
    }

    return {
      status: 'error',
      error: error.message,
      statusCode: error.response?.status,
      code: error.code,
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
  const filesToCheck = getFilesToCheck()

  console.log(`Checking ${filesToCheck.length} collection files...`)

  const results = {
    valid: [],
    broken: [], // 404 errors only
    needs_check: [], // All other errors
    duplicates: [],
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

      // Check cache
      if (cache[url] && isCacheValid(cache[url])) {
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
        cache[url] = { status: 'valid', timestamp: Date.now() }
      } else {
        const errorCategory = categorizeError(result)
        console.log(
          `${errorCategory.icon} ${filename}: ${result.error || result.statusCode}`
        )

        const errorInfo = {
          file: filename,
          url,
          error: result.error,
          statusCode: result.statusCode,
          code: result.code,
        }

        // Categorize: 404s are definitely broken, everything else needs manual check
        if (errorCategory.category === 'broken') {
          results.broken.push(errorInfo)
        } else {
          results.needs_check.push(errorInfo)
        }
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

  const summary = `
**Summary:**
- ✅ Valid: ${results.valid.length}
- ❌ Broken (High Priority): ${results.broken.length}
- ⚠️ Needs Check (Low Priority): ${results.needs_check.length}
- 🔗 Duplicate URLs: ${results.duplicates.length}
  `.trim()

  let details = ''

  // Broken links (404s only - high priority)
  if (results.broken.length > 0) {
    details += '\n\n### ❌ Broken Links (Definitely Dead - High Priority)\n\n'
    details += '| File | URL | Error |\n'
    details += '|------|-----|-------|\n'
    results.broken.forEach(({ file, url, error, statusCode, code }) => {
      const errorMsg = statusCode
        ? `HTTP ${statusCode}`
        : code || error || 'Unknown'
      details += `| ${file} | ${url} | ${errorMsg} |\n`
    })
  }

  // Needs manual check (everything else - low priority, likely bot blocks)
  if (results.needs_check.length > 0) {
    details +=
      '\n\n### ⚠️ Needs Manual Check (Likely Bot Protection - Low Priority)\n\n'
    details += '| File | URL | Error |\n'
    details += '|------|-----|-------|\n'
    results.needs_check.forEach(({ file, url, error, statusCode, code }) => {
      const errorMsg = statusCode
        ? `HTTP ${statusCode}`
        : code || error || 'Unknown'
      details += `| ${file} | ${url} | ${errorMsg} |\n`
    })
  }

  // Duplicate URLs
  if (results.duplicates.length > 0) {
    details += '\n\n### 🔗 Duplicate URLs Found\n\n'
    results.duplicates.forEach(({ domain, files, count }) => {
      details += `**${domain}** (${count} files)\n`
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

  // Set output for GitHub Actions
  console.log(`::set-output name=broken_count::${results.broken.length}`)

  // Exit with non-zero if broken links found (optional - comment out to make non-blocking)
  // process.exit(results.broken.length > 0 ? 1 : 0);
}

main().catch(console.error)
