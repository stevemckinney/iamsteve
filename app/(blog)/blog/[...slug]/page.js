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
import Newsletter from '@/components/newsletter'
import { PostLayoutFrame } from '@/components/post'

import { Suspense } from 'react'
import { getPageView } from '../views'
import ViewCounter from '../counter'

const editUrl = (fileName) =>
  `${siteMetadata.siteRepo}/blob/main/content/blog/${fileName}`

// static generation with ISR revalidation every day
export const revalidate = 86400

// styling
import styles from './post.module.css'

export async function generateStaticParams() {
  return allPosts
    .filter((post) => post.status === 'open')
    .map((post) => ({
      slug: post.slugAsParams.split('/'),
    }))
}

// Update getPostFromParams to include draft posts when needed
async function getPostFromParams(params, showDrafts = false) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => {
    const slugMatch = post.slugAsParams === slug
    const statusMatch = showDrafts ? true : post.status === 'open'
    return slugMatch && statusMatch
  })

  return post
}

export async function generateMetadata(props, parent) {
  const searchParams = await props.searchParams
  const params = await props.params
  const showDrafts = searchParams?.draft === 'true'
  const post = await getPostFromParams(params, showDrafts)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.metadesc,
    alternates: {
      canonical: post.slug,
    },
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

export default async function PostPage(props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const showDrafts = searchParams?.draft === 'true'
  const post = await getPostFromParams(params, showDrafts)

  if (!post) {
    console.log('Post not found, redirecting to 404')
    notFound()
  }

  // Check if post is a draft and draft parameter isn't present
  if (post.status === 'draft' && !showDrafts) {
    notFound()
  }

  // View counting feature flag
  const enableViewCounting =
    process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING === 'true'

  // Remove the '/blog/' prefix if it exists
  const cleanSlug = post.slug.replace(/^\/blog\//, '')

  // Fetch only the view count for this specific page
  const initialViews = enableViewCounting ? await getPageView(cleanSlug) : 0

  const currentYear = new Date().getFullYear()
  const postYear = new Date(post.date).getFullYear()
  const yearsAgo = currentYear - postYear

  const isOldCodePost = post.categories.includes('Code') && yearsAgo > 2

  const date = parseISO(post.date)

  const jsonLD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${siteMetadata.siteUrl}${post.slug}#article`,
        isPartOf: {
          '@id': `${siteMetadata.siteUrl}/#website`,
        },
        author: {
          '@type': 'Person',
          name: siteMetadata.author,
          '@id': `${siteMetadata.siteUrl}/#person`,
        },
        headline: post.title,
        datePublished: post.date,
        dateModified: post.lastmod,
        description: post.summary,
        wordCount: post.body.raw.split(/\s+/).length,
        keywords: post.tags?.join(', '),
        articleSection: post.categories[0],
        image: {
          '@type': 'ImageObject',
          url: post.ogImage,
          width: 1200,
          height: 630,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}${post.slug}`,
        },
        publisher: {
          '@id': `${siteMetadata.siteUrl}/#organization`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteMetadata.siteUrl}${post.slug}#breadcrumb`,
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
            name: post.title,
            item: `${siteMetadata.siteUrl}${post.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <PostLayoutFrame
        styles={styles}
        toolbar={
          <div className="flex flex-row gap-3 items-center">
            {post.categories.length > 0 &&
              post.categories.map((category, index) => (
                <Category size={16} key={index}>
                  {category}
                </Category>
              ))}
          </div>
        }
        asideContent={
          <>
            <section
              className="flex flex-col gap-2 relative"
              aria-labelledby="aside-contents"
            >
              <div className="lg:hidden" aria-hidden="true">
                <TableOfContents headings={post.headings} />
              </div>
              <div className="hidden lg:block">
                <TableOfContents headings={post.headings} open />
              </div>
            </section>
            <section
              className="flex flex-col gap-2 pb-12 max-lg:fixed max-lg:hidden max-lg:top-0 max-lg:left-0 max-lg:right-0"
              aria-labelledby="aside-subscribe"
            >
              <h2 className="font-bold text-heading" id="aside-subscribe">
                Subscribe
              </h2>
              <p className="mb-4">
                Get notified you when the latest posts go out. Unsubscribe
                anytime.
              </p>
              <Newsletter />
            </section>
          </>
        }
        headerContent={
          <>
            {showDrafts && (
              <div className="col-content mb-8">
                <div className="shadow-placed flex gap-3 leading-tight bg-cornflour-0 rounded-md p-4">
                  <Icon
                    icon="square-info"
                    className="text-cornflour-900 flex-[0_0_auto]"
                    variant="default"
                  />
                  <div className="flex flex-col">
                    <p className="p-0 m-0 font-body text-sm text-cornflour-900">
                      <strong>Viewing draft post</strong>
                    </p>
                    <p className="p-0 m-0 font-body text-sm text-cornflour-900">
                      This post is not publicly visible
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isOldCodePost && (
              <div className="shadow-placed dark:shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-cornflour-900),transparent_50%)] col-content lg:col-prose flex gap-3 leading-tight bg-cornflour-0 dark:bg-cornflour-900/30 rounded-md p-4">
                <Icon
                  icon="square-info"
                  className="text-cornflour-900 dark:text-cornflour-400 flex-[0_0_auto]"
                  variant="header"
                />
                <div className="flex flex-col">
                  <p className="p-0 m-0 font-body text-sm text-cornflour-900 dark:text-cornflour-300">
                    <strong>
                      This post was published {yearsAgo}{' '}
                      {yearsAgo === 1 ? 'year' : 'years'} ago
                    </strong>
                  </p>
                  <p className="p-0 m-0 font-body text-sm text-cornflour-900 dark:text-cornflour-300/80">
                    There's a chance things are out of date or no longer reflect
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
              <p className="text-lg text-pretty lg:text-2xl text-emphasis mb-2">
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
              {enableViewCounting && (
                <Badge size={16} theme={`text`} iconStart={`views`}>
                  <Suspense
                    fallback={
                      <span className="text-emphasis">
                        {initialViews.toLocaleString()} views
                      </span>
                    }
                  >
                    <ViewCounter
                      slug={cleanSlug}
                      initialViews={initialViews}
                      trackView={true}
                    />
                  </Suspense>
                </Badge>
              )}
            </div>
          </>
        }
        proseContent={
          <>
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
          </>
        }
      >
        <Support />
        <NextPosts post={post} />
        {post.twitter === true && (
          <Script
            async
            src="https://platform.twitter.com/widgets.js"
            strategy="afterInteractive"
          />
        )}
      </PostLayoutFrame>
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
      <h2 className="text-3xl font-display font-variation-bold leading-none lowercase text-heading m-0 lg:px-8">
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
              slug={post.slug}
              alt={`${post.title} (featured image)`}
              width={864}
              height={540}
              className={`col-content lg:col-container grid-cols-subgrid overflow-hidden *:w-full ${styles.featured}`}
            />
          ) : (
            <Placeholder
              category="Code"
              slug={post.slug}
              alt={`${post.title} (featured image)`}
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
    <aside className="xl:row-span-1 bg-surface-02 dark:bg-surface shadow-[0_0_0_1px_var(--color-white)] dark:shadow-[0_0_0_1px_var(--color-surface-02)] rounded-lg flex flex-row flex-wrap content-center items-center gap-4 justify-between p-8 lg:-mx-8 col-content xl:col-start-3 xl:col-span-8">
      <p className="p-0 m-0 text-base text-ui-body flex flex-col">
        <strong className="text-heading font-bold">
          Enjoying the reading experience?
        </strong>{' '}
        There's no ads, tracking or cookie banners, so your support is valued
      </p>
      <Link
        href={siteMetadata.bmc}
        className="flex shrink-0 grow-0 self-start flex-row rounded-sm items-center gap-2 text-base font-ui lowercase transition duration-200 mt-1 pl-6 pr-5 py-2 bg-surface shadow-reduced hover:opacity-70"
      >
        Buy me a coffee
        <span className="flex shrink-0 grow-0 items-center justify-center">
          <Icon icon="bmc" />
        </span>
      </Link>
    </aside>
  )
}
