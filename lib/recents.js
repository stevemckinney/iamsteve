// What you picked last, kept on the device. The menu's default list is
// otherwise the same six links for everyone, every time, and people mostly
// come back to things they have already been to.
const key = 'iamsteve:recent-searches'
const limit = 5

export function readRecents() {
  try {
    const stored = JSON.parse(localStorage.getItem(key))
    return Array.isArray(stored) ? stored : []
  } catch {
    // private browsing, cleared storage, or something that is not ours
    return []
  }
}

export function addRecent(item) {
  const entry = {
    type: item.type,
    title: item.title,
    slug: item.slug,
    icon: item.icon,
    summary: item.summary,
    // what holds() reads to place it inside a node
    categories: item.categories,
  }
  if (!entry.slug || !entry.title) return readRecents()

  const next = [
    entry,
    ...readRecents().filter((recent) => recent.slug !== entry.slug),
  ].slice(0, limit)

  try {
    localStorage.setItem(key, JSON.stringify(next))
  } catch {
    // storage full or blocked; the list is a convenience, not state we need
  }
  return next
}
