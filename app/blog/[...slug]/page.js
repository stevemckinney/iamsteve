import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx-components'
import siteMetadata from '@/content/siteMetadata'

// page components
import Image from '@/components/image'
import Card from '@/components/card'
import Chip from '@/components/chip'
import PageTitle from '@/components/page-title'
import Date from '@/components/date'
import Icon from '@/components/icon'
import Link from '@/components/link'

import getAllPageViews from '../views'
import ViewCounter from '../counter'

// const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`

export const dynamic = 'force-static'
export const revalidate = 86400

import styles from './post.module.scss'

async function getPostFromParams(params) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({ params }) {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default async function PostPage({ params }) {
  const post = await getPostFromParams(params)
  const allViews = await getAllPageViews()

  if (!post) {
    notFound()
  }

  return (
    <article className={`grid layout gap-x-8 gap-y-12 col-start-1 col-end-[-1] pb-32`}>
      <header className="col-prose flex flex-col gap-4">
        <PageTitle>{post.title}</PageTitle>
        {post.summary && <p className="text-2xl text-fern-1100 mb-4">{post.summary}</p>}
        <div className="flex flex-row gap-4 items-center">
          {post.categories &&
            post.categories.map((category, index) => (
              <Chip theme="rio" iconKind={category} key={index}>
                {category}
              </Chip>
            ))}
          <Chip theme="cornflour" iconKind={`calendar`}>
            <Date dateString={post.date} />
          </Chip>
          <ViewCounter allViews={allViews} slug={post.slugAsParams} trackView />
        </div>
      </header>

      {post.images &&
        post.images.map((image, index) => (
          <div class={`col-prose ${styles.featured}`} key={index}>
            <Image
              src={image}
              className="radius"
              alt=""
              width={744}
              height={492}
              key={image}
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              placeholder="blur"
              priority
            />
          </div>
        ))}
      <div
        className={`${styles.prose} prose dark:prose-invert grid layout gap-x-8 gap-y-0 col-start-1 col-end-[-1]`}
      >
        <Mdx code={post.body.code} />
      </div>
      <Support />
      <aside className={`col-prose`}>
        <h2 className="text-lg font-display text-fern-1100">Next to read</h2>
        <NextPost id="97" />
      </aside>
    </article>
  )
}

export async function NextPost({ id }) {
  const post = allPosts.filter((post) => post.status.includes('open')).find((item) => item.id == id)

  return <p>post: {post && post.title}</p>
}

export function Support() {
  return (
    <aside className="bg-neutral-01-50 border border-1 border-neutral-01-200 rounded-lg flex flex-row items-center gap-8 justify-between px-8 py-5 col-prose -mx-8">
      <p className="p-0 m-0 text-base text-ui-body">
        Enjoying the reading experience? There’s no ads, tracking or cookie banners
      </p>
      <Link
        href={siteMetadata.bmc}
        className="flex shrink-0 grow-0 flex-row items-center gap-2 text-base font-ui lowercase"
      >
        <span className="flex shrink-0 grow-0 items-center justify-center bg-fern-100 rounded w-8 h-8">
          <Icon kind="bmc" />
        </span>{' '}
        Buy me a coffee
      </Link>
    </aside>
  )
}
