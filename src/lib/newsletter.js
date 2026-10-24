// The subscriber count the newsletter form shows, read from EmailOctopus
// once per build. components/newsletter.js fetched the site’s own count
// API from the server, which failed, so every page showed the fallback
const FALLBACK = 700

let count

export function subscriberCount() {
  count ??= read()
  return count
}

async function read() {
  const url = import.meta.env.EMAILOCTOPUS_API_URL
  const key = import.meta.env.EMAILOCTOPUS_API_KEY
  const list = import.meta.env.EMAILOCTOPUS_LIST_ID
  if (!url || !key || !list) return FALLBACK

  try {
    const response = await fetch(`${url}lists/${list}?api_key=${key}`)
    const data = await response.json()
    return (response.ok && data.counts?.subscribed) || FALLBACK
  } catch {
    return FALLBACK
  }
}
