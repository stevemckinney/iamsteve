import { cache } from 'react'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils/content'
import PageTitle from '@/components/page-title'
import Card from '@/components/card'
import Pagination from '@/components/pagination'

import categories from '@/content/categories'

const POSTS_PER_PAGE = 12

const getData = cache(async () => {
  const postsByDate = sortPosts(allPosts)

  return {
    postsByDate,
  }
})

export async function generateStaticParams() {
  const allData = await getData()
  const totalPages = Math.ceil(allData.postsByDate.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))

  return paths
}

export async function generateMetadata({ params }) {
  const category = categories.find((category) => category.slug === params.slug)

  if (!category) {
    return
  }

  return {
    template: '%s • iamsteve',
    title: category.title,
    description: category.description,
  }
}

export default async function BlogCategory({ params, searchParams }) {
  const data = categories.find((category) => category.slug === params.slug)

  if (!data) {
    notFound()
  }

  const posts = await Promise.all(
    allPosts
      .filter((post) =>
        post.categories.includes(
          data.slug.charAt(0).toUpperCase() + data.slug.slice(1)
        )
      )
      .filter((post) => post.status === 'open')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(async (post) => ({
        ...post,
      }))
  )

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
    <div className="grid col-container grid-cols-subgrid gap-y-12 pb-32 pt-18 frame frame-outset-top">
      <PageTitle>{data.title}</PageTitle>
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
        <Pagination
          total={pagination.total}
          current={pagination.current}
          category={params.slug}
        />
      </div>
    </div>
  )
}
