import { allPosts } from 'content-collections'
import categories from '@/content/categories'

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

// The categories worth listing: not set aside in config, and with at least
// one open post to show for themselves
export function getCategories() {
  const open = allPosts.filter((post) => post.status === 'open')
  return categories.filter(
    (category) =>
      !category.exclude &&
      open.some((post) => post.categories.includes(category.title))
  )
}
