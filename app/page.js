import { cache } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { allPosts } from 'contentlayer/generated'

import mergeDataBySlug from '@/lib/utils/merge-data-by-slug'

import Link from 'next/link'
import Icon from '@/components/icon'
import Title from '@/components/title'
import Image from '@/components/image'
import Hero from '@/components/hero'
import Card from '@/components/card'

import Tabs from '@/components/category/tabs'

export const dynamic = 'force-static'
export const revalidate = 86400

const getData = cache(async () => {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies })
  const { data: dbPosts } = await supabase
    .from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE)
    .select()

  const postsByDate = allPosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((post) => post.status.includes('open'))

  const postsWithViews = dbPosts?.map(({ slug, view_count }) => ({
    slug,
    view_count,
  }))

  const mergedData = mergeDataBySlug(postsWithViews, allPosts)
    .sort((a, b) => b.view_count - a.view_count)
    .filter((post) => post.status.includes('open'))

  const design = mergedData
    .filter((post) => post.categories.includes('Design'))
    .slice(0, 6)
  const code = mergedData
    .filter((post) => post.categories.includes('Code'))
    .slice(0, 6)

  return {
    postsByDate,
    mergedData,
    design,
    code,
  }
})

export default async function Home() {
  const allData = await getData()
  const posts = allData.postsByDate.slice(0, 4)
  const mergedData = allData.mergedData
  const design = allData.design
  const code = allData.code

  return (
    <>
      <main className="grid grid-cols-subgrid col-start-margin-start col-end-margin-end gap-y-10 md:gap-y-18 mb-10 md:pb-18">
        <Hero />
        <div
          className="grid col-container grid-cols-subgrid md:frame md:frame-16 lg:frame-40 lg:frame-outset-top gap-y-4 md:gap-y-8 pb-10 md:pb-18 mt-[1.375rem]"
          id="latest"
        >
          <Title
            link="/blog"
            text="View the archive"
            ariaID="latest"
            className="-mt-[1.375rem]"
          >
            What’s new
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 col-content gap-4 md:gap-8">
            {posts.map((post) => (
              <Card
                size="container"
                frontmatter={post}
                image={true}
                key={post._id}
                className="col-content-start col-span-6"
              />
            ))}
          </div>
        </div>

        <div
          className="grid col-container grid-cols-subgrid md:frame md:frame-16 lg:frame-40 lg:frame-outset-top gap-y-4 md:gap-y-8 pb-10 md:pb-18 mt-[1.375rem]"
          id="popular-code"
        >
          <Title
            link="/category/design"
            text="Explore design"
            ariaID="popular-design"
            className="-mt-[1.375rem]"
          >
            Popular <span className="text-rio-400">design</span>
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-content gap-4 md:gap-8">
            {design.map((post) => (
              <Card
                size="medium"
                frontmatter={post}
                image={false}
                key={post._id}
              />
            ))}
          </div>
        </div>

        <div
          className="grid col-container grid-cols-subgrid md:frame md:frame-16 lg:frame-40 lg:frame-outset-top gap-y-4 md:gap-y-8 pb-10 md:pb-18 mt-[1.375rem]"
          id="popular-code"
        >
          <Title
            link="/category/code"
            text="Explore code"
            ariaID="popular-code"
            className="-mt-[1.375rem]"
          >
            Popular <span className="text-dandelion-400">code</span>
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-content gap-4 md:gap-8">
            {code.map((post) => (
              <Card
                size="medium"
                frontmatter={post}
                image={false}
                key={post._id}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
