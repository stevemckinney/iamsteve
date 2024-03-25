/**
 * Blog category
 * eg: /category/design/page/2 /category/code/page2
 * See (blog)/layout.js for controlling page frame
 */

import { cache } from 'react'
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils/content'
import { Header, Title, Column, Description } from '@/components/page'
import Icon from '@/components/icon'
import Image from '@/components/image'
import Category from '@/components/category'
import Card from '@/components/card'
import Pagination from '@/components/pagination'
import Link from '@/components/link'

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
  const allData = await getData()
  const data = categories.find(
    (category) => category.slugAsParams === params.slug
  )
  const parent = data.parent

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
        className={`col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden`}
        alt=" "
        aria-hidden="true"
      />
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
                    className="py-2 md:py-3 text-base md:text-lg lg:text-xl hover:text-dandelion-600 transition duration-200 ease-linear font-ui lowercase leading-none rounded flex gap-2 items-center text-current"
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
