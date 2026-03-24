import { NextResponse } from 'next/server'
import { allPosts, allNotes, allCollections } from 'content-collections'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] })
  }

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

  const postResults = allPosts
    .filter((post) => post.status === 'open')
    .map((post) => {
      const titleScore = matchScore(post.title) * 3
      const summaryScore = matchScore(post.summary) * 2
      const tagScore = matchScore(post.tags?.join(' '))
      const categoryScore = matchScore(post.categories?.join(' '))
      const total = titleScore + summaryScore + tagScore + categoryScore
      return {
        type: 'post',
        title: post.title,
        summary: post.summary || null,
        slug: post.slug,
        categories: post.categories,
        score: total,
      }
    })
    .filter((r) => r.score > 0)

  const noteResults = allNotes
    .filter((note) => note.status === 'published')
    .map((note) => {
      const titleScore = matchScore(note.title) * 3
      const summaryScore = matchScore(note.summary)
      const total = titleScore + summaryScore
      return {
        type: 'note',
        title: note.title,
        summary: note.summary || null,
        slug: note.slug,
        categories: [],
        score: total,
      }
    })
    .filter((r) => r.score > 0)

  const collectionResults = allCollections
    .map((item) => {
      const titleScore = matchScore(item.title) * 3
      const collectionScore = matchScore(item.collection?.join(' '))
      const total = titleScore + collectionScore
      return {
        type: 'collection',
        title: item.title,
        summary: null,
        slug: item.url,
        categories: item.collection || [],
        score: total,
      }
    })
    .filter((r) => r.score > 0)

  const results = [...postResults, ...noteResults, ...collectionResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ score, ...rest }) => rest)

  return NextResponse.json({ results })
}
