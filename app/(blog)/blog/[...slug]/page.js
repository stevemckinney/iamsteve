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
import TableOfContents from '@/components/table-of-contents'
import Image from '@/components/image'
import Placeholder from '@/components/placeholder'
import Card from '@/components/card'
import Category from '@/components/category'
import Badge from '@/components/badge'
import PageHeader from '@/components/page-header'
import PageTitle from '@/components/page-title'
import {
  format,
  parseISO,
  formatDistance,
  formatRelative,
  subYears,
  getYear,
} from 'date-fns'
import Icon from '@/components/icon'
import Link from '@/components/link'
import NewsletterForm from '@/components/newsletter-form'

import getAllPageViews from '../views'
import ViewCounter from '../counter'

const editUrl = (fileName) =>
  `${siteMetadata.siteRepo}/blob/main/content/blog/${fileName}`

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

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.metadesc,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastmod,
      authors: [siteMetadata.author],
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
      description: post.summary,
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

  const currentYear = new Date().getFullYear()
  const postYear = new Date(post.date).getFullYear()
  const yearsAgo = currentYear - postYear

  const isOldCodePost = post.categories.includes('Code') && yearsAgo > 2

  const date = parseISO(post.date)

  if (!post) {
    notFound()
  }

  const jsonLD = [
    post.structuredData,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'iamsteve.me',
          item: `${siteMetadata.siteUrl}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${siteMetadata.siteUrl}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${post.title}`,
          item: `${siteMetadata.siteUrl}/blog/${post.slugAsParams}`,
        },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <article className={`grid col-container grid-cols-subgrid relative`}>
        <hr className="relative col-container lg:hidden w-full h-[2px] bg-[url(/images/dash.svg)] border-none" />
        <Sidebar allViews={allViews} post={post} />
        <hr className="relative col-container lg:hidden w-full h-[2px] bg-[url(/images/dash.svg)] border-none" />
        <header className="col-content lg:col-container lg:col-start-2 lg:col-end-9 xl:col-start-3 xl:col-end-11 lg:row-start-1 lg:row-span-1 flex flex-col max-lg:pt-12 gap-y-4 mb-12">
          {isOldCodePost && (
            <div className="shadow-placed col-prose flex gap-3 leading-tight bg-cornflour-0 rounded-md p-4">
              <Icon
                icon="square-info"
                className="text-cornflour-900 flex-[0_0_auto]"
              />
              <div className="flex flex-col">
                <p className="p-0 m-0 font-body text-sm text-cornflour-900">
                  <strong>
                    This post was published {yearsAgo}{' '}
                    {yearsAgo === 1 ? 'year' : 'years'} ago
                  </strong>
                </p>
                <p className="p-0 m-0 font-body text-sm text-cornflour-900">
                  There’s a chance things are out of date or no longer reflect
                  my views today
                </p>
              </div>
            </div>
          )}
          <Badge size={16} theme={`cornflour`} iconStart={`calendar`}>
            <time dateTime={post.date} className={`date`}>
              {format(date, 'do LLL yyyy')}
            </time>
          </Badge>
          <PageTitle
            className="mt-4"
            key={`title-${post.id}`}
            id={`title-${post.id}`}
          >
            {post.title}
          </PageTitle>
          {post.summary && (
            <p className="text-lg text-pretty lg:text-2xl text-fern-1100 mb-2">
              {post.summary}
            </p>
          )}
          <div className="flex flex-row flex-wrap justify-between gap-6">
            <div className="flex flex-row gap-4 items-center">
              {post.categories.length > 0 &&
                post.categories.map((category, index) => {
                  return (
                    <Category size={16} key={index}>
                      {category}
                    </Category>
                  )
                })}
            </div>
            <Badge size={16} theme={`lavender`} iconStart={`views`}>
              <ViewCounter
                allViews={allViews}
                slug={post.slugAsParams}
                trackView
              />
            </Badge>
          </div>
        </header>
        <div
          className={`${styles.prose} prose grid grid-cols-subgrid col-container lg:col-span-8 xl:col-span-10 gap-x-8 gap-y-0`}
          id="article"
        >
          <PostImage post={post} />
          <PostMdx code={post.body.code} />
          <Badge
            href={editUrl(post._raw.sourceFileName)}
            size={16}
            theme={`text`}
            iconStart={`github`}
          >
            View on Github
          </Badge>
        </div>
      </article>
      <Support />
      <NextPosts post={post} />
      {post.codepen === true && (
        <Script
          src="https://cpwebassets.codepen.io/assets/embed/ei.js"
          strategy="afterInteractive"
        />
      )}
      {post.twitter === true && (
        <Script
          async
          src="https://platform.twitter.com/widgets.js"
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

export function NextPosts({ post }) {
  return (
    <aside
      className={`xl:row-span-1 col-content lg:col-start-3 lg:col-span-8 flex flex-col gap-4 lg:-mx-8`}
    >
      <h2 className="text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0 lg:px-8">
        Next to read
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
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
  )
}

export function PostImage({ post }) {
  const imageColor = post.theme ? post.theme : `#fcf9f8`

  return (
    <>
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
              className={`col-content lg:col-container grid-cols-subgrid overflow-hidden *:w-full ${styles.featured}`}
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
              className={`col-content lg:col-container grid-cols-subgrid overflow-hidden *:w-full ${styles.featured}`}
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
    </>
  )
}

export function Support() {
  return (
    <aside className="xl:row-span-1 bg-neutral-01-50 border border-1 border-neutral-01-200 rounded-lg flex flex-row flex-wrap content-center items-center gap-4 justify-between p-8 lg:-mx-8 col-content xl:col-start-3 xl:col-span-8">
      <p className="p-0 m-0 text-base text-ui-body flex flex-col">
        <strong className="text-fern-1100 font-bold">
          Enjoying the reading experience?
        </strong>{' '}
        There’s no ads, tracking or cookie banners, so your support is valued
      </p>
      <Link
        href={siteMetadata.bmc}
        className="flex shrink-0 grow-0 self-start flex-row rounded-sm items-center gap-2 text-base font-ui lowercase hover:opacity-70 transition duration-200 mt-1 pl-6 pr-5 py-2 bg-white shadow-[0_0_0_1px_theme('colors.neutral-01.200')]"
      >
        Buy me a coffee
        <span className="flex shrink-0 grow-0 items-center justify-center">
          <Icon icon="bmc" />
        </span>
      </Link>
    </aside>
  )
}

// [mask-image:linear-gradient(0deg,_transparent_0%,_transparent_1%,_rgba(0,0,0,0.56)_3%,_#000_6%,_#000_18%,_#000_82%,_#000_90%,_rgba(0,0,0,0.56)_95%,_transparent_99%,_transparent_100%)]
// max-xl:bg-[url(/images/texture.png)] max-xl:bg-[172px_auto] max-xl:bg-blend-multiply max-xl:bg-neutral-01-150 max-xl:px-6

export function Sidebar({ allViews, post }) {
  return (
    <aside
      aria-label="Table of contents and newsletter subscription form"
      className="max-lg:col-container lg:col-start-10 lg:col-span-2 xl:col-start-12 lg:row-span-5 xl:col-span-3 lg:h-screen lg:overflow-y-scroll sticky z-10 top-0 bottom-0 lg:right-0 lg:py-12 lg:-mt-12 flex flex-col lg:gap-12 lg:pb-16 lg:px-6 lg:-mx-6 lg:[mask-image:linear-gradient(180deg,transparent,_#000_64px,#000_calc(100%_-_10vh),_transparent)]"
    >
      <section
        className="flex flex-col gap-2 relative"
        aria-labelledby="aside-contents"
      >
        {/* mobile contents */}
        <div className="lg:hidden" aria-hidden="true">
          <TableOfContents headings={post.headings} />
        </div>

        {/* desktop contents */}
        <div className="hidden lg:block">
          <TableOfContents headings={post.headings} open />
        </div>
      </section>
      <section
        className="flex flex-col gap-2 pb-12 max-lg:fixed max-lg:hidden max-lg:top-0 max-lg:left-0 max-lg:right-0"
        aria-labelledby="aside-subscribe"
      >
        <h2 className="font-bold" id="aside-subscribe">
          Subscribe
        </h2>
        <p className="mb-4">
          Get notified you when the latest posts go out. Unsubscribe anytime.
        </p>
        <NewsletterForm />
      </section>
    </aside>
  )
}
