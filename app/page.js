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
import Image from '@/components/image'

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
      <div className="grid grid-cols-subgrid col-container frame frame-outset-top pt-18 pb-18 gap-y-4">
        <div className="col-start-5 col-end-13 row-start-1 flex flex-col gap-4">
          <h1 className="text-fern-1100 font-display text-7xl col-start-7 col-end-12 font-variation-extrabold lowercase text-center">
            Exploring web design craft
          </h1>
          <p className="text-2xl text-ui-body text-center w-2/4 mx-auto">
            Tips and tutorials about the design{'\u00A0'}and{'\u00A0'}build of web interfaces
          </p>
          <ul className="flex gap-4 justify-center">
            <li>
              <Link href="/design" className="flex gap-2 font-ui lowercase items-center">
                <span className="p-1 bg-rio-300 rounded-lg">
                  <Icon icon="pen" />
                </span>
                Explore design
              </Link>
            </li>
            <li>
              <Link href="/design" className="flex gap-2 font-ui lowercase items-center">
                <span className="p-1 bg-dandelion-300 rounded-lg">
                  <Icon icon="code" />
                </span>
                Explore code
              </Link>
            </li>
          </ul>
        </div>
        <Image
          src="/images/illustration/pencil.svg"
          width={962}
          height={46}
          className={`col-start-1 col-end-7 max-w-[initial] justify-self-end self-start row-start-3`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/ruler.svg"
          width={594}
          height={122}
          className={`col-start-11 col-end-[-1] relative left-16 max-w-[initial] self-end row-start-1`}
          alt=""
          role="presentation"
        />
        <div className="col-start-6 col-end-12 row-start-2 row-end-5 h-56 self-end relative">
          <Image
            src="/images/illustration/spot/sharpener.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/type.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/pen.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/terminal.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/sticky.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/safari.svg"
            width={96}
            height={96}
            className={`absolute  max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/star.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/cursor.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/colour.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/component.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/figma.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/pencil.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/brush.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial]`}
            alt=""
            role="presentation"
          />
        </div>
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
