import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'

// layouts
import SearchLayout from '@/layouts/SearchLayout'

// components
import { PageSEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'

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

const Search = ({ posts, initialDisplayPosts, pagination }) => {
  return (
    <>
      <PageSEO title={`Search • ${siteMetadata.title}`} description={siteMetadata.description} />
      <SearchLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Search"
        show={true}
      />
    </>
  )
}

Search.getLayout = function getLayout(page) {
  return <LayoutWrapper subtle={true}>{page}</LayoutWrapper>
}

export default Search
