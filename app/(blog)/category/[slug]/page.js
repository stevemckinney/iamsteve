/**
 * Blog category
 * eg: /category/design/page/2 /category/code/page2
 * See (blog)/layout.js for controlling page frame
 */

import { cache } from 'react'
import GithubSlugger from 'github-slugger'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils/content'
import PageHeader from '@/components/page-header'
import PageTitle from '@/components/page-title'
import Image from '@/components/image'
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
  const slugger = new GithubSlugger()
  const allData = await getData()
  const data = categories.find(
    (category) => category.slugAsParams === params.slug
  )

  const posts = await Promise.all(
    allPosts
      .filter((post) => {
        const categories = post.categories.map((category) => {
          if (typeof category === 'object' && category !== null) {
            return 'website'
          } else return category.replace(' ', '-').toLowerCase()
        })
        return categories.includes(params.slug.toLowerCase())
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((post) => post.status === 'open')
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

  if (!data) {
    notFound()
  }

  if (isNaN(pageNumber)) {
    notFound()
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
        <PageTitle>{data.title}</PageTitle>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 col-content gap-8">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <Card
              size="container"
              frontmatter={post}
              image={true}
              key={post._id}
            />
          ))
        ) : (
          <p>No posts in this category yet.</p>
        )}
      </div>
      {pagination.total > 1 && (
        <div className="col-content">
          <Pagination
            total={pagination.total}
            current={pagination.current}
            category={params.slug}
          />
        </div>
      )}
    </>
  )
}
