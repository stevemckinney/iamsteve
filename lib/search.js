export function search(index, query, limit = 20) {
  if (!query || query.trim().length < 2) return []

  const terms = query.toLowerCase().trim().split(/\s+/)

  const matchScore = (text) => {
    if (!text) return 0
    const lower = text.toLowerCase()
    let score = 0
    for (const term of terms) {
      if (lower.includes(term)) score++
    }
    return score
  }

  return index
    .map((item) => {
      const titleScore = matchScore(item.title) * 3
      const summaryScore = matchScore(item.summary) * 2
      const tagScore = matchScore(item.tags?.join(' '))
      const categoryScore = matchScore(item.categories?.join(' '))
      const total = titleScore + summaryScore + tagScore + categoryScore
      return { ...item, score: total }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...rest }) => rest)
}
