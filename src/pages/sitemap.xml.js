// app/sitemap.js, written out the way Next.js serialised a sitemap
import siteMetadata from '@/content/metadata'
import categories from '@/content/categories'
import { allEntries } from '../lib/content.js'

// Frontmatter date, never the build clock. An updated date wins when the
// post has one; otherwise the published date is used.
function contentDate(updated, published) {
  for (const value of [updated, published]) {
    if (!value) continue
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) return date
  }
}

function categorySlugs(post) {
  return post.categories.map((category) => {
    if (typeof category === 'object' && category !== null) return 'website'
    return category.replace(' ', '-').toLowerCase()
  })
}

async function generateSitemap() {
  const allPosts = (await allEntries('blog')).map(({ id, data }) => ({
    ...data,
    slug: `/blog/${id}`,
  }))
  const allNotes = (await allEntries('notes')).map(({ id, data }) => ({
    ...data,
    slug: `/notes/${id}`,
  }))

  let posts = allPosts.filter(
    (post) =>
      (post.status === 'open' || post.status === 'unlisted') && !post.noindex
  )

  let postEntries = posts.map((post) => ({
    url: `${siteMetadata.siteUrl}${post.slug}`,
    lastModified: contentDate(post.lastmod, post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  let notes = allNotes
    .filter((note) => note.status === 'published')
    .map((note) => ({
      url: `${siteMetadata.siteUrl}${note.slug}`,
      lastModified: note.date,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  let routes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/blog', priority: 0.9, changeFrequency: 'daily' },
    { route: '/search', priority: 0.4, changeFrequency: 'monthly' },
    { route: '/collections', priority: 0.7, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { route: '/uses', priority: 0.4, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.4, changeFrequency: 'yearly' },
    { route: '/newsletter', priority: 0.5, changeFrequency: 'monthly' },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency,
    priority,
  }))

  // Category pages list every open post, including ones kept out of the
  // sitemap with noindex, so the page date follows what the page shows.
  let openPosts = allPosts.filter((post) => post.status === 'open')

  let categoryEntries = categories.flatMap((category) => {
    const slug = category.slugAsParams.toLowerCase()
    let newest
    let postsInCategory = 0
    for (const post of openPosts) {
      if (!categorySlugs(post).includes(slug)) continue
      postsInCategory += 1
      const date = contentDate(post.lastmod, post.date)
      if (!date) continue
      if (!newest || date > newest) newest = date
    }

    // An empty category page is a soft 404. exclude only hides it from the
    // navigation, so website and terminal stay while they have posts.
    if (postsInCategory === 0) return []

    return [
      {
        url: `${siteMetadata.siteUrl}/category/${slug}`,
        lastModified: newest,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
    ]
  })

  return [...routes, ...categoryEntries, ...postEntries, ...notes]
}

export async function GET() {
  let content = '<?xml version="1.0" encoding="UTF-8"?>\n'
  content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  for (const item of await generateSitemap()) {
    content += '<url>\n'
    content += `<loc>${item.url}</loc>\n`
    if (item.lastModified) {
      const date =
        item.lastModified instanceof Date
          ? item.lastModified.toISOString()
          : item.lastModified
      content += `<lastmod>${date}</lastmod>\n`
    }
    content += `<changefreq>${item.changeFrequency}</changefreq>\n`
    content += `<priority>${item.priority}</priority>\n`
    content += '</url>\n'
  }
  content += '</urlset>\n'

  return new Response(content, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
