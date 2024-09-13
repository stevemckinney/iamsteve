import { allPosts } from 'contentlayer/generated'

export async function getPostFromParams(params) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

// sort posts by date
export function sortPosts(allPosts) {
  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

