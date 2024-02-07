/**
 * Single blog post
 * See (blog)/layout.js for controlling page frame
 * #single #post
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
import Date, { postYear } from '@/components/date'
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
    description: post.metadesc,
    openGraph: {
      title: post.title,
      description: post.metadesc,
      type: 'article',
      publishedTime: post.date,
      url: `${post.slug}`,
      images: [
        {
          url: post.ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metadesc,
      images: [post.ogImage],
    },
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

  const imageColor = post.theme ? post.theme.toString() : `#ccc`

  if (!post) {
    notFound()
  }

  const jsonLD = post.structuredData

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <article className={`grid col-container grid-cols-subgrid gap-y-12`}>
        <Image
          src="/images/illustration/pencil-mono.svg"
          width={962}
          height={46}
          className={`max-lg:hidden col-start-1 col-end-prose-start 2xl:col-end-4 max-w-[initial] justify-self-end self-start row-start-1 drop-shadow-placed`}
          alt=" "
          aria-hidden="true"
        />
        <Image
          src="/images/illustration/ruler-mono.svg"
          width={744}
          height={122}
          className={`max-lg:hidden col-start-[14] col-end-[-1] max-w-[initial] self-end row-start-1 drop-shadow-placed`}
          alt=" "
          aria-hidden="true"
        />
        <header className="col-content lg:col-prose flex flex-col gap-4 row-start-1">
          <Badge size={24} theme={`cornflour`} iconStart={`calendar`}>
            <Date dateString={post.date} />
          </Badge>
          <PageTitle
            className="mt-4"
            key={`title-${post.id}`}
            id={`title-${post.id}`}
          >
            {post.title}
          </PageTitle>
          {post.summary && (
            <p className="text-lg lg:text-2xl text-fern-1100 mb-4">
              {post.summary}
            </p>
          )}
          <div className="flex flex-wrap gap-y-4 justify-between">
            <div className="flex flex-row gap-4 items-center">
              {post.categories.length > 0 &&
                post.categories.map((category, index) => {
                  return (
                    <Category size={24} key={index}>
                      {category}
                    </Category>
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

        {/*post.categories.includes('Code') && postYear(post.date) < 2019 && (
          <div className="col-prose flex gap-2 leading-tight bg-cornflour-200/40 rounded-sm px-2 py-2">
            <Icon
              icon="square-info"
              className="text-cornflour-700 flex-[0_0_auto]"
            />
            <p className="p-0 m-0 font-ui lowercase text-cornflour-700">
              This post was published <Date dateString={post.date} relative />,
              so the approach may be outdated
            </p>
          </div>
        )*/}

        {!post.large && (
          <>
            {post.categories && post.categories.includes('Design') ? (
              <Placeholder
                category="Design"
                kind="post"
                alt={`${post.title} (featured image)`}
                aria-labelledby={`title-${post.id}`}
                tabIndex="0"
                width={864}
                height={540}
                className={`col-content lg:col-prose grid-cols-subgrid overflow-hidden *:w-full ${styles.featured}`}
              />
            ) : (
              <Placeholder
                category="Code"
                kind="post"
                alt={`${post.title} (featured image)`}
                aria-labelledby={`title-${post.id}`}
                tabIndex="0"
                width={864}
                height={540}
                className={`col-content lg:col-prose grid-cols-subgrid overflow-hidden *:w-full ${styles.featured}`}
              />
            )}
          </>
        )}
        {post.large && (
          <div
            className={`col-content lg:col-prose grid-cols-subgrid flex items-center overflow-hidden justify-center ${styles.featured}`}
            style={{ backgroundColor: `${imageColor}` }}
          >
            <Image
              src={post.large}
              alt={`${post.title} (featured image)`}
              width={864}
              height={540}
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              placeholder="blur"
              priority
            />
          </div>
        )}
        <div
          className={`${styles.prose} prose grid grid-cols-subgrid gap-x-8 gap-y-0 col-content lg:col-prose`}
        >
          <PostMdx code={post.body.code} />
        </div>
        <Support />
        <aside
          className={`col-content lg:col-prose flex flex-col gap-4 md:-mx-8`}
        >
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
