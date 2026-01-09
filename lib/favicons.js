/**
 * Favicon utilities
 */

/**
 * Get favicon path for a URL
 * Returns the cached favicon path or null if not found
 */
export function getFaviconPath(url) {
  if (!url) return null

  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname.replace('www.', '')
    const filename = domain.replace(/\./g, '-') + '.png'

    return `/favicons/${filename}`
  } catch {
    return null
  }
}

/**
 * Get domain from URL for display purposes
 */
export function getDomain(url) {
  if (!url) return ''

  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}
