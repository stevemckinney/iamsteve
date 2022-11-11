import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import CardLayout from '@/layouts/CardLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 12

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

const Blog = ({ posts, initialDisplayPosts, pagination }) => {
  return (
    <>
      <PageSEO title={`Blog • ${siteMetadata.title}`} description={siteMetadata.description} />
      <CardLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog"
      />
    </>
  )
}

export default Blog
