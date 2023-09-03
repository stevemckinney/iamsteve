import { cache } from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { allPosts } from 'contentlayer/generated'

import { sortPosts } from '../lib/utils/content'
import mergeDataByID from '../lib/utils/mergeDataByID'

import Link from 'next/link'
import Icon from '@/components/icon'
import Subscribe from '@/components/subscribe'
import Title from '@/components/title'

export const dynamic = 'force-static'
export const revalidate = 86400

const getData = cache(async () => {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies })
  const { data: dbPosts } = await supabase.from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE).select()

  const postsByDate = sortPosts(allPosts)
    .filter((post) => post.status.includes('open'))
    .slice(0, 32)

  const postsWithViews = dbPosts?.map(({ id, view_count }) => ({
    id,
    view_count,
  }))

  const mergedData = mergeDataByID(allPosts, postsWithViews)
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 32)

  return {
    postsByDate,
    mergedData,
  }
})

export default async function Home() {
  const allData = await getData()
  const posts = allData.postsByDate.slice(0, 60)
  const design = allData.mergedData
    .filter((post) => post.categories.includes('Design'))
    .filter((post) => post.status.includes('open'))
    .slice(0, 8)
  const code = allData.mergedData
    .filter((post) => post.categories.includes('Code'))
    .filter((post) => post.status.includes('open'))
    .slice(0, 8)

  return (
    <>
      <div className="col-container frame frame-outset-top">
        <h1 className="font-display text-7xl lowercase text-center pt-48 pb-48">
          Exploring web design craft
        </h1>
        <p>Tips and tutorials about the design and build of web interfaces</p>
        <ul className="flex gap-4">
          <li>
            <Link href="/design" className="flex gap-1 font-ui lowercase">
              <Icon icon="pen" />
              Explore design
            </Link>
          </li>
          <li>
            <Link href="/design" className="flex gap-1 font-ui lowercase">
              <Icon icon="code" />
              Explore code
            </Link>
          </li>
        </ul>
      </div>
      <div className="grid col-container grid-cols-subgrid frame" id="latest">
        <div className="col-prose">
          <Subscribe />
          <Title title="What’s new" link="/blog" text="View the archive" ariaID="latest" />

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <article className="p-8 border border-slate-100" key={post._id}>
                <h3 className="text-lg">
                  <Link href={`${post.slug}`}>{post.title}</Link>
                </h3>
                {post.summary && <p>{post.summary}</p>}
              </article>
            ))}
          </div>

          <h2 className="text-xl mb-4 mt-8">Popular in design</h2>

          <div className="flex flex-col gap-4">
            {design.map((post) => (
              <article className="p-8 border border-slate-100" key={post._id}>
                <h3 className="text-lg">
                  <Link href={`${post.slug}`}>{post.title}</Link>
                </h3>
                {post.view_count && <p>{post.view_count}</p>}
              </article>
            ))}
          </div>

          <h2 className="text-xl mb-4 mt-8">Popular in code</h2>

          <div className="flex flex-col gap-4">
            {code.map((post) => (
              <article className="p-8 border border-slate-100" key={post._id}>
                <h3 className="text-lg">
                  <Link href={`${post.slug}`}>{post.title}</Link>
                </h3>
                {post.view_count && <p>{post.view_count}</p>}
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
