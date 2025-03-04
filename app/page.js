// Homepage
import { cache } from 'react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { allPosts } from 'contentlayer/generated'

import mergeDataBySlug from '@/lib/utils/merge-data-by-slug'

import Hero from '@/components/hero'
import Frame from '@/components/frame'
import LatestPosts from '@/components/posts/latest'
import PopularPosts from '@/components/posts/popular'

export const dynamic = 'force-static'
export const revalidate = 86400

const getData = cache(async () => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies().set(name, value, { ...options, path: '/' })
          })
        },
      },
    }
  )

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
    .filter((post) => post.status === 'open')
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))

  return {
    postsByDate: postsByDate.slice(0, 4),
    design: mergedData
      .filter((post) => post.categories.includes('Design'))
      .slice(0, 6),
    code: mergedData
      .filter((post) => post.categories.includes('Code'))
      .slice(0, 6),
  }
})

export default async function Home() {
  const { postsByDate, design, code } = await getData()

  return (
    <>
      <Hero />
      <main
        className="grid grid-cols-subgrid col-margin gap-y-10 md:gap-y-18 md:pb-18"
        id="content"
      >
        <Frame id="latest">
          <LatestPosts
            posts={postsByDate}
            title="What’s new"
            linkText="View the archive"
            linkHref="/blog"
          />
        </Frame>

        <Frame id="popular-design">
          <PopularPosts
            posts={design}
            title="design"
            linkText="Explore design"
            linkHref="/category/design"
            accentColor="text-rio-400"
          />
        </Frame>

        <Frame id="popular-code">
          <PopularPosts
            posts={code}
            title="code"
            linkText="Explore code"
            linkHref="/category/code"
            accentColor="text-dandelion-400"
          />
        </Frame>
      </main>
    </>
  )
}
