// sort posts by date
export function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}
