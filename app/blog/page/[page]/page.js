import { cache } from 'react'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils/content'

import Card from '@/components/card'
import Pagination from '@/components/pagination'

export const dynamic = 'force-static'
export const revalidate = 86400
const POSTS_PER_PAGE = 12

const getData = cache(async () => {
  const postsByDate = sortPosts(allPosts).filter(
    (post) => post.status === 'open'
  )

  return {
    postsByDate,
  }
})

export const generateStaticParams = async () => {
  const allData = await getData()
  const totalPages = Math.ceil(allData.postsByDate.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))

  return paths
}

export default async function BlogIndex({ params }) {
  const allData = await getData()
  const posts = allData.postsByDate
  const pageNumber = parseInt(params.page)
  const paginatedPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  if (!allData) {
    notFound()
  }

  if (isNaN(pageNumber)) {
    notFound()
  }

  const pagination = {
    current: pageNumber,
    total: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <>
      <div className="grid col-container grid-cols-subgrid frame frame-outset-top pt-10 pb-[5.5rem] gap-y-8">
        <h1 className="col-content text-7xl font-variation-extrabold font-display text-fern-1100 lowercase">
          Blog
        </h1>
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
      </div>
    </>
  )
}
