/**
 * Paginated blog category
 * eg: /category/design/page/2 /category/code/page2
 * See (blog)/layout.js for controlling page frame
 */

import { cache } from 'react'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils/content'
import { Header, Title, Column, Description } from '@/components/page'
import Category from '@/components/category'
import Icon from '@/components/icon'
import Card from '@/components/card'
import Pagination from '@/components/pagination'
import Image from '@/components/image'

import categories from '@/content/categories'

const POSTS_PER_PAGE = 12
export const revalidate = 2592000

const getData = cache(async () => {
  const postsByDate = sortPosts(allPosts).filter(
    (post) => post.status === 'open'
  )

  return {
    postsByDate,
  }
})

export async function generateStaticParams() {
  const allData = await getData()

  const paths = categories.flatMap((category) => {
    const categoryPosts = allData.postsByDate.filter((post) =>
      post.categories.includes(category.title)
    )
    const totalPages = Math.ceil(categoryPosts.length / POSTS_PER_PAGE)

    return Array.from({ length: totalPages }, (_, i) => ({
      slug: category.slugAsParams,
      page: (i + 1).toString(),
    }))
  })

  return paths
}

export async function generateMetadata(props) {
  const params = await props.params
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

export default async function BlogCategory(props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const data = categories.find(
    (category) => category.slugAsParams === params.slug
  )

  const parent = data.parent ? data.parent : false

  const posts = allPosts
    .filter((post) => post.status === 'open')
    .filter((post) =>
      post.categories.includes(
        params.slug.charAt(0).toUpperCase() + params.slug.slice(1)
      )
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const pageNumber = parseInt(params.page)
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
      <Header>
        <Column className="md:col-span-1">
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
        </Column>
        <ul className="md:col-span-1 grid grid-cols-2 gap-x-8 self-end column-categories lg:-mb-3">
          {categories.map((category) => {
            if (category.parent === false || category.exclude === true) return

            if (
              (!parent && data.title.toLowerCase() === category.parent) ||
              (parent && category.parent === parent)
            ) {
              return (
                <li className="self-end" key={category.title}>
                  <Category
                    size={24}
                    badge={false}
                    className="py-2 md:py-3 text-base md:text-lg lg:text-xl text-heading transition-all duration-200 ease-linear font-ui lowercase leading-none rounded flex gap-2 items-center text-current"
                  >
                    {category.title}
                  </Category>
                </li>
              )
            }
          })}
        </ul>
      </Header>
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
      <div className="col-content">
        <Pagination
          total={pagination.total}
          current={pagination.current}
          category={params.slug}
        />
      </div>
    </>
  )
}
