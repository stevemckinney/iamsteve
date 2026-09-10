// The search index, fetched once per page load and kept for every open. It
// lives outside the menu's chunk so a trigger can start the fetch the moment
// it is touched, rather than once the menu's code has arrived.
let cache = null
let pending = null

export function peekIndex() {
  return cache
}

export async function fetchIndex() {
  if (cache) return cache
  pending ??= fetch('/api/search').then((response) => {
    if (!response.ok) throw new Error(`search index ${response.status}`)
    return response.json()
  })
  // Clear the in-flight promise whether it settled or threw, or one bad
  // response would be handed back to every later call for the session
  try {
    cache = await pending
  } finally {
    pending = null
  }
  return cache
}
