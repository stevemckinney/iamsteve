import { cache } from 'react'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils/content'

import { Header, Title, Column, Description } from '@/components/page'
import Card from '@/components/card'
import Category from '@/components/category'
import Pagination from '@/components/pagination'
import Image from '@/components/image'

import categories from '@/content/categories'

export const dynamic = 'force-dynamic'
export const revalidate = false
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
      <Header>
        <Column className="md:col-span-1">
          <Title>Blog</Title>
          <Description>
            Tips and tutorials about the design and build of web interfaces
          </Description>
        </Column>
        {categories && (
          <ul className="md:col-span-1 grid grid-cols-2 gap-x-8 self-end column-categories -mb-2 lg:-mb-3">
            {categories.map((category) => {
              if (category.exclude === true || category.parent === true)
                return null
              return (
                <li className="self-end" key={category.title}>
                  <Category
                    size={24}
                    badge={false}
                    className="py-2 md:py-3 text-base md:text-lg lg:text-xl text-fern-1100 transition-all duration-200 ease-linear font-ui lowercase leading-none rounded flex gap-2 items-center text-current"
                  >
                    {category.title}
                  </Category>
                </li>
              )
            })}
          </ul>
        )}
      </Header>
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
