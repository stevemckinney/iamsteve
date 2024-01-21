/**
 * Blog / archive page
 * See (blog)/layout.js for controlling page frame
 */

import { cache } from 'react'
import { allPosts } from 'contentlayer/generated'

import { sortPosts } from '@/lib/utils/content'

import PageHeader from '@/components/page-header'
import PageTitle from '@/components/page-title'
import Card from '@/components/card'
import Pagination from '@/components/pagination'
import Image from '@/components/image'

export const dynamic = 'force-static'
export const revalidate = 86400
const POSTS_PER_PAGE = 12

const getData = cache(async () => {
  const postsByDate = sortPosts(
    allPosts.filter((post) => post.status === 'open')
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
      <Image
        src="/images/illustration/pencil-mono.svg"
        width={962}
        height={46}
        className={`col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed`}
        alt=" "
        aria-hidden="true"
      />
      <PageHeader>
        <PageTitle>Blog</PageTitle>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 col-content gap-8">
        {paginatedPosts.map((post) => (
          <Card
            size="container"
            frontmatter={post}
            image={true}
            key={post._id}
          />
        ))}
      </div>
      <div className="col-content">
        <Pagination total={pagination.total} current={pagination.current} />
      </div>
    </>
  )
}
