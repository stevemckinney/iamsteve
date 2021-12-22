import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import CardLayout from '@/layouts/CardLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllCategories } from '@/lib/categories'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

export async function getStaticPaths() {
  const categories = await getAllCategories('blog')

  return {
    paths: Object.keys(categories).map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) =>
      post.status === 'open' && post.categories.map((t) => kebabCase(t)).includes(params.category)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `category/${params.categories}/feed.xml`)
    const rssPath = path.join(root, 'public', 'category', params.category)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, category: params.category } }
}

export default function Category({ posts, category }) {
  // Capitalize first letter and convert space to dash
  const title = category[0].toUpperCase() + category.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${category} - ${siteMetadata.author}`}
        description={`${category} category - ${siteMetadata.author}`}
      />
      <CardLayout posts={posts} title={title} />
    </>
  )
}
