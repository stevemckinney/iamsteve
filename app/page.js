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
      <div className="col-container flex flex-col items-center relative frame frame-outset-top pt-10 pb-18 gap-y-4">
        <h1 className="text-fern-1100 font-display text-7xl col-start-7 col-end-12 font-variation-extrabold lowercase text-center max-w-[13ch]">
          Exploring web design craft
        </h1>
        <p className="text-2xl text-ui-body text-center w-2/4 max-w-[30ch]">
          Tips and tutorials about the design{'\u00A0'}and{'\u00A0'}build of web interfaces
        </p>
        <ul className="inline-flex gap-4 py-2">
          <li>
            <Link href="/design" className="flex gap-2 font-ui text-lg lowercase items-center">
              <span className="p-1 bg-rio-300 rounded-lg">
                <Icon icon="pen" />
              </span>
              Explore design
            </Link>
          </li>
          <li>
            <Link href="/design" className="flex gap-2 font-ui text-lg lowercase items-center">
              <span className="p-1 bg-dandelion-300 rounded-lg">
                <Icon icon="code" />
              </span>
              Explore code
            </Link>
          </li>
        </ul>
        <div className="w-[798px] h-[276px] relative">
          <Image
            src="/images/illustration/pencil.svg"
            width={962}
            height={46}
            className={`max-w-[initial] absolute right-[calc(100%_-_175px)] bottom-[10.125rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/ruler.svg"
            width={594}
            height={122}
            className={`max-w-[initial] absolute left-[calc(100%_-_111px)] bottom-[17.5rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/sharpener.svg"
            width={96}
            height={96}
            className={`absolute top-[-4.35rem] left-[3.425rem] rotate-[15deg] max-w-[initial]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/type.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial] top-[1.6rem] left-[13.275rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/pen.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial] top-[.625rem] left-[21.75rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/terminal.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial] top-[1.875rem] right-[12.525rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/sticky.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial] top-[3.4rem] right-[3.525rem] rotate-[-15deg]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/star.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial] bottom-[2.25rem] left-[5.95rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/safari.svg"
            width={96}
            height={96}
            className={`absolute  max-w-[initial] top-[5.35rem] left-[12.95rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/cursor.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial] bottom-[1.875rem] left-[16.2rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/colour.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial] top-[8.625rem] left-[20.825rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/component.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial] bottom-[4.235rem] right-[15.675rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/figma.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial] bottom-[2.125rem] right-[19.05rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/pencil.svg"
            width={96}
            height={96}
            className={`absolute max-w-[initial] bottom-[-.625rem] right-[7.45rem]`}
            alt=""
            role="presentation"
          />
          <Image
            src="/images/illustration/spot/brush.svg"
            width={32}
            height={32}
            className={`absolute max-w-[initial] bottom-[3.625rem] right-[3rem]`}
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
