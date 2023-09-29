import { cache } from 'react'
import { allPosts } from 'contentlayer/generated'

import { sortPosts } from '@/lib/utils/content'

import PageHeader from '@/components/page-header'
import PageTitle from '@/components/page-title'
import Card from '@/components/card'
import Pagination from '@/components/pagination'

export const dynamic = 'force-static'
export const revalidate = 86400
const POSTS_PER_PAGE = 12

const getData = cache(async () => {
  const postsByDate = sortPosts(
    allPosts.filter((post) => post.status.includes('open'))
  )

  return {
    postsByDate,
  }
})

export default async function BlogIndex({ params }) {
  const allData = await getData()
  const posts = allData.postsByDate
  const pageNumber = 1
  const paginatedPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    current: pageNumber,
    total: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <>
      <PageHeader>
        <PageTitle>Blog</PageTitle>
      </PageHeader>
      <div className="grid grid-cols-3 col-content gap-8">
        {paginatedPosts.map((post) => (
          <>
            <Card
              size="medium"
              frontmatter={post}
              image={true}
              key={post._id}
            />
          </>
        ))}
      </div>
      <div className="col-content">
        <Pagination total={pagination.total} current={pagination.current} />
      </div>
    </>
  )
}
