/**
 * Single blog post
 * See (blog)/layout.js for controlling page frame
 */

import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import Script from 'next/script'
import { PostMdx } from '@/components/mdx-components'
import siteMetadata from '@/content/metadata'

// page components
import Image from '@/components/image'
import Placeholder from '@/components/placeholder'
import Card from '@/components/card'
import Category from '@/components/category'
import Badge from '@/components/badge'
import PageHeader from '@/components/page-header'
import PageTitle from '@/components/page-title'
import Date from '@/components/date'
import Icon from '@/components/icon'
import Link from '@/components/link'

import getAllPageViews from '../views'
import ViewCounter from '../counter'

// const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`

// force to revalidate every day
export const dynamic = 'force-static'
export const revalidate = 86400

// styling
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
    <>
      <article className={`grid col-container grid-cols-subgrid gap-y-12`}>
        <Image
          src="/images/illustration/pencil-mono.svg"
          width={962}
          height={46}
          className={`max-lg:hidden col-start-1 col-end-4 max-w-[initial] justify-self-end self-start mt-3 row-start-1 drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <Image
          src="/images/illustration/ruler-mono.svg"
          width={594}
          height={122}
          className={`max-lg:hidden col-start-[14] col-end-[-1] max-w-[initial] self-end row-start-1 drop-shadow-placed`}
          alt=""
          role="presentation"
        />
        <header className="col-prose flex flex-col gap-4 row-start-1">
          <Badge size={24} theme={`cornflour`} iconStart={`calendar`}>
            <Date dateString={post.date} />
          </Badge>
          <PageTitle className="mt-4" id={`title-${post.id}`}>
            {post.title}
          </PageTitle>
          {post.summary && (
            <p className="text-lg lg:text-2xl text-fern-1100 mb-4">
              {post.summary}
            </p>
          )}
          <div className="flex justify-between">
            <div className="flex flex-row gap-4 items-center">
              {post.categories &&
                post.categories.map((category) => {
                  return (
                    <>
                      <Category size={24} key={category}>
                        {category}
                      </Category>
                    </>
                  )
                })}
            </div>
            <Badge size={24} theme={`lavender`} iconStart={`views`}>
              <ViewCounter
                allViews={allViews}
                slug={post.slugAsParams}
                trackView
              />
            </Badge>
          </div>
        </header>
        {!post.image && !post.medium && (
          <>
            <div className={`col-prose grid-cols-subgrid ${styles.featured}`}>
              {post.categories && post.categories.includes('Design') ? (
                <Placeholder
                  category="Design"
                  kind="post"
                  href={post.slug}
                  title=""
                  className={`flex items-center justify-center rounded-lg overflow-hidden aspect-[1.6/1]`}
                  imageClass={`w-full h-full`}
                  aria-labelledby={`title-${post.id}`}
                  tabIndex="0"
                />
              ) : (
                <Placeholder
                  category="Code"
                  kind="post"
                  href={post.slug}
                  title=""
                  className={`flex items-center justify-center rounded-lg overflow-hidden aspect-[1.6/1]`}
                  imageClass={`w-full h-full`}
                  aria-labelledby={`title-${post.id}`}
                  tabIndex="0"
                />
              )}
            </div>
          </>
        )}
        {post.images &&
          post.images.map((image, index) => (
            <div
              className={`col-prose grid-cols-subgrid ${styles.featured}`}
              key={index}
            >
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
          className={`${styles.prose} prose grid grid-cols-subgrid gap-x-8 gap-y-0 col-prose col-prose`}
        >
          <PostMdx code={post.body.code} />
        </div>
        <Support />
        <aside className={`col-prose flex flex-col gap-4 md:-mx-8`}>
          <h2 className="text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0 md:px-8">
            Next to read
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card
              size="medium"
              image={false}
              frontmatter={getRandomItem(allPosts, post.categories[0])}
            />
            <Card
              size="medium"
              image={false}
              frontmatter={getRandomItem(allPosts, post.categories[0])}
            />
          </div>
        </aside>
      </article>
      {post.codepen === true && (
        <Script
          src="https://cpwebassets.codepen.io/assets/embed/ei.js"
          strategy="afterInteractive"
        />
      )}
    </>
  )
}

function getRandomItem(set, category) {
  const allItems = allPosts.filter(
    (post) => post.status === 'open' && post.categories.includes(category)
  )
  const items = Array.from(allItems)
  return items[Math.floor(Math.random() * items.length)]
}

export async function NextPost({ id }) {
  const post = allPosts
    .filter((post) => post.status === 'open')
    .find((item) => item.id === Number(id))

  return <Card size="medium" image={false} frontmatter={post} key={id} />
}

export function Support() {
  return (
    <aside className="bg-neutral-01-50 border border-1 border-neutral-01-200 rounded-lg flex flex-col gap-4 justify-between p-8 col-prose md:-mx-8">
      <p className="p-0 m-0 text-base text-ui-body">
        <strong className="text-fern-1100 font-bold">
          Enjoying the reading experience?
        </strong>{' '}
        There’s no ads, tracking or cookie banners, so your support is valued
      </p>
      <Link
        href={siteMetadata.bmc}
        className="flex shrink-0 grow-0 flex-row rounded-md items-center gap-2 text-base font-ui lowercase hover:opacity-70 transition duration-200"
      >
        Buy me a coffee
        <span className="flex shrink-0 grow-0 items-center justify-center bg-fern-100 rounded w-8 h-8">
          <Icon icon="bmc" />
        </span>
      </Link>
    </aside>
  )
}
