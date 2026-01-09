#!/usr/bin/env node

/**
 * Fetch Favicons Script
 *
 * Fetches favicons for all collection items and caches them locally.
 * Only fetches missing favicons to keep build times fast.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FAVICON_DIR = path.join(__dirname, '../public/favicons')
const MANIFEST_PATH = path.join(FAVICON_DIR, 'manifest.json')
const COLLECTIONS_DIR = path.join(__dirname, '../content/collections')

// Ensure favicon directory exists
if (!fs.existsSync(FAVICON_DIR)) {
  fs.mkdirSync(FAVICON_DIR, { recursive: true })
}

// Load or create manifest
let manifest = {}
if (fs.existsSync(MANIFEST_PATH)) {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'))
}

/**
 * Extract domain from URL
 */
function getDomain(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return null
  }
}

/**
 * Generate safe filename from domain
 */
function getDomainFilename(domain) {
  return domain.replace(/\./g, '-') + '.png'
}

/**
 * Download file from URL
 */
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http

    const request = protocol.get(url, { timeout: 5000 }, (response) => {
      // Follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject)
        return
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }

      const file = fs.createWriteStream(dest)
      response.pipe(file)

      file.on('finish', () => {
        file.close()
        resolve()
      })

      file.on('error', (err) => {
        fs.unlink(dest, () => {})
        reject(err)
      })
    })

    request.on('error', reject)
    request.on('timeout', () => {
      request.destroy()
      reject(new Error('Request timeout'))
    })
  })
}

/**
 * Fetch favicon for a domain
 */
async function fetchFavicon(domain) {
  const filename = getDomainFilename(domain)
  const filepath = path.join(FAVICON_DIR, filename)

  // Try multiple sources in order
  const sources = [
    `https://${domain}/favicon.ico`,
    `https://${domain}/favicon.png`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
  ]

  for (const url of sources) {
    try {
      await downloadFile(url, filepath)

      // Verify file was created and has content
      if (fs.existsSync(filepath)) {
        const stats = fs.statSync(filepath)
        if (stats.size > 0) {
          console.log(`✓ Fetched: ${domain}`)
          return { filename, fetchedAt: new Date().toISOString() }
        }
      }
    } catch (err) {
      // Try next source
      continue
    }
  }

  console.log(`✗ Failed: ${domain}`)
  return null
}

/**
 * Get all collection URLs from markdown files
 */
function getCollectionUrls() {
  const urls = new Set()
  const files = fs.readdirSync(COLLECTIONS_DIR)

  for (const file of files) {
    if (!file.endsWith('.md')) continue

    const content = fs.readFileSync(path.join(COLLECTIONS_DIR, file), 'utf-8')
    const urlMatch = content.match(/^url:\s*["']?([^"'\n]+)["']?$/m)

    if (urlMatch && urlMatch[1]) {
      urls.add(urlMatch[1].trim())
    }
  }

  return Array.from(urls)
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Scanning collection items...')
  const urls = getCollectionUrls()
  console.log(`Found ${urls.length} unique URLs`)

  const domains = new Set()
  for (const url of urls) {
    const domain = getDomain(url)
    if (domain) {
      domains.add(domain)
    }
  }

  console.log(`Found ${domains.size} unique domains`)

  // Filter out already cached domains
  const uncachedDomains = Array.from(domains).filter(domain => !manifest[domain])

  if (uncachedDomains.length === 0) {
    console.log('✓ All favicons already cached!')
    return
  }

  console.log(`\n📥 Fetching ${uncachedDomains.length} missing favicons...\n`)

  let successCount = 0
  let failCount = 0

  for (let i = 0; i < uncachedDomains.length; i++) {
    const domain = uncachedDomains[i]

    const result = await fetchFavicon(domain)

    if (result) {
      manifest[domain] = result
      successCount++
    } else {
      failCount++
    }

    // Rate limiting: wait 100ms between requests
    if (i < uncachedDomains.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  // Save manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))

  console.log(`\n✓ Complete: ${successCount} fetched, ${failCount} failed`)
  console.log(`Total cached: ${Object.keys(manifest).length} domains`)
}

main().catch(console.error)
