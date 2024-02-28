// sort posts by date
export function sortPosts(allPosts) {
  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
}
