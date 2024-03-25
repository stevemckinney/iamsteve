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
import Frame from '@/components/frame'

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
    .filter((post) => post.status === 'open')

  const postsWithViews = dbPosts?.map(({ slug, view_count }) => ({
    slug,
    view_count,
  }))

  const mergedData = mergeDataBySlug(postsWithViews, allPosts)
    .sort((a, b) => b.view_count - a.view_count)
    .filter((post) => post.status === 'open')

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
      <main className="grid grid-cols-subgrid col-margin gap-y-10 md:gap-y-18 md:pb-18">
        <Hero />
        <Frame id="latest">
          <Title
            link="/blog"
            text="View the archive"
            ariaID="latest"
            className="sm:px-4 md:px-8 sm:-mx-4 md:-mx-8 sm:bg-neutral-01-150 sm:bg-[url(/images/texture.png)] sm:bg-[172px_auto] sm:bg-blend-multiply sm:-mt-[1.125rem] md:-mt-[1.375rem]"
          >
            What’s new
          </Title>

          <div className="grid col-start-margin-start col-end-margin-end sm:col-content gap-4 md:gap-8 max-sm:grid-flow-col max-sm:auto-cols-auto max-sm:overflow-auto max-sm:snap-x max-sm:snap-always max-sm:overscroll-x-contain md:grid-cols-2 max-sm:px-8 max-sm:py-8 max-sm:-my-8">
            {posts.map((post) => (
              <Card
                size="container"
                frontmatter={post}
                image={true}
                key={post._id}
                className="max-sm:w-[calc(100vw_-_48px)] max-sm:snap-center md:col-span-1"
              />
            ))}
          </div>
        </Frame>

        <Frame id="popular-code">
          <Title
            link="/category/design"
            text="Explore design"
            ariaID="popular-design"
            className="sm:px-4 md:px-8 sm:-mx-4 md:-mx-8 sm:bg-neutral-01-150 sm:bg-[url(/images/texture.png)] sm:bg-[172px_auto] sm:bg-blend-multiply sm:-mt-[1.125rem] md:-mt-[1.375rem]"
          >
            Popular <span className="text-rio-400">design</span>
          </Title>

          <div className="grid col-margin sm:col-content gap-4 md:gap-8 max-sm:grid-flow-col max-sm:auto-cols-auto max-sm:overflow-auto max-sm:snap-x max-sm:snap-always max-sm:overscroll-x-contain md:grid-cols-2 xl:grid-cols-3 max-sm:px-8 max-sm:py-8 max-sm:-my-8">
            {design.map((post) => (
              <Card
                size="container"
                frontmatter={post}
                image={false}
                key={post._id}
                className="max-sm:w-[calc(100vw_-_48px)] max-sm:snap-center md:col-span-1"
              />
            ))}
          </div>
        </Frame>

        <Frame id="popular-code">
          <Title
            link="/category/code"
            text="Explore code"
            ariaID="popular-code"
            className="sm:px-4 md:px-8 sm:-mx-4 md:-mx-8 sm:bg-neutral-01-150 sm:bg-[url(/images/texture.png)] sm:bg-[172px_auto] sm:bg-blend-multiply sm:-mt-[1.125rem] md:-mt-[1.375rem]"
          >
            Popular <span className="text-dandelion-400">code</span>
          </Title>

          <div className="grid col-margin sm:col-content gap-4 md:gap-8 max-sm:grid-flow-col max-sm:auto-cols-auto max-sm:overflow-auto max-sm:snap-x max-sm:snap-always max-sm:overscroll-x-contain md:grid-cols-2 xl:grid-cols-3 max-sm:px-8 max-sm:py-8 max-sm:-my-8">
            {code.map((post) => (
              <Card
                size="container"
                frontmatter={post}
                image={false}
                key={post._id}
                className="max-sm:w-[calc(100vw_-_48px)] max-sm:snap-center md:col-span-1"
              />
            ))}
          </div>
        </Frame>
      </main>
    </>
  )
}
