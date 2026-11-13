// The subscriber count the newsletter form shows, read from EmailOctopus
// once per build, and once per instance where a page renders on demand.
// components/newsletter.js fetched the site’s own count API from the
// server, which failed, so every page showed the fallback
// astro:env reads these as the code runs, where import.meta.env would write
// the key into the code of every page rendered on demand
import {
  EMAILOCTOPUS_API_URL as url,
  EMAILOCTOPUS_API_KEY as key,
  EMAILOCTOPUS_LIST_ID as list,
} from 'astro:env/server'

const FALLBACK = 700

let count

export function subscriberCount() {
  count ??= read()
  return count
}

async function read() {
  if (!url || !key || !list) return FALLBACK

  try {
    const response = await fetch(`${url}lists/${list}?api_key=${key}`)
    const data = await response.json()
    return (response.ok && data.counts?.subscribed) || FALLBACK
  } catch {
    return FALLBACK
  }
}
