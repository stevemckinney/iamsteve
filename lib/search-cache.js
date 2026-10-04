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

// Whether Claude searches too, found out once a page load in the same way.
// Off, whether switched off or out of budget for the month, the menu is the
// keyword search it always was. Not knowing counts as off.
let ai = null
let aiPending = null

export function peekAI() {
  return ai
}

export function checkAI() {
  aiPending ??= fetch('/api/search/ai')
    .then((response) => response.json())
    .then((data) => (ai = data.on === true))
    .catch(() => (ai = false))
  // Read after it settles, so a later turning off is what comes back
  return aiPending.then(() => ai)
}

// A search Claude could not answer turns it off for the rest of the visit
export function disableAI() {
  ai = false
}
