import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx-components'

// page components
import Image from '@/components/image'
import Chip from '@/components/chip'
import PageTitle from '@/components/page-title'
import Date from '@/components/date'

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
    <article className={`grid layout gap-x-8 gap-y-12 col-start-1 col-end-[-1]`}>
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
    </article>
  )
}
