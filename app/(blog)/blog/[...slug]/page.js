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
import Date, { postYear } from '@/components/date'
import Icon from '@/components/icon'
import Link from '@/components/link'

import getAllPageViews from '../views'
import ViewCounter from '../counter'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/content/blog/${fileName}`

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

  const imageColor = `#fcf9f8`

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
      <aside aria-label="Meta & table of contents" className="max-lg:col-content lg:col-start-12 lg:row-start-1 lg:row-span-4 lg:col-span-3 lg:h-[calc(100vh_-_104px)] overflow-y-auto lg:sticky top-0 right-0 flex flex-col gap-16">
        <section className="flex flex-col gap-4" aria-labelledby="aside-meta">
          <h2 className="font-semibold" id="aside-meta">Meta</h2>
          <ul className="flex flex-col gap-4">
            <li>
              <Badge size={24} theme={`cornflour`} iconStart={`calendar`}>
                <Date dateString={post.date} />
              </Badge>
            </li>
            <li>
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
            </li>
            <li>
              <Badge size={24} theme={`lavender`} iconStart={`views`}>
                <ViewCounter
                  allViews={allViews}
                  slug={post.slugAsParams}
                  trackView
                />
              </Badge>
            </li>
            <li><Badge href={editUrl(post._raw.sourceFileName)} size={24} theme={`text`} iconStart={`github`}>Edit on Github</Badge></li>
          </ul>
        </section>
        <section className="flex flex-col gap-2 max-lg:fixed max-lg:hidden max-lg:top-0 max-lg:left-0 max-lg:right-0" aria-labelledby="aside-contents">
          <h2 className="font-semibold" id="aside-contents">Contents</h2>
          <TableOfContents headings={post.headings} />
        </section>
      </aside>
      <article className={`grid col-container grid-cols-subgrid lg:row-start-1 lg:row-span-1 relative`}>
        <header className="col-content lg:col-start-3 lg:col-end-11 flex flex-col max-sm:pt-12 gap-y-4">
          {post.categories.includes('Code') && postYear(post.date) < 2022 && (
            <div className="shadow-placed col-prose flex gap-3 leading-tight bg-cornflour-0 rounded-md p-4">
              <Icon
                icon="square-info"
                className="text-cornflour-900 flex-[0_0_auto]"
              />
              <div className="flex flex-col">
                <p className="p-0 m-0 font-body text-sm text-cornflour-900"><strong>This post was published <Date dateString={post.date} relative /></strong></p>
                <p className="p-0 m-0 font-body text-sm text-cornflour-900">
                  There’s a chance things are out of date or no longer reflect my views today
                </p>
              </div>
            </div>
          )}
          <PageTitle
            className="mt-4 mb-8"
            key={`title-${post.id}`}
            id={`title-${post.id}`}
          >
            {post.title}
          </PageTitle>
        </header>
        <div
          className={`${styles.prose} prose grid grid-cols-subgrid col-span-10 gap-x-8 gap-y-0`}
        >
          <PostMdx code={post.body.code} />
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
      className={`row-span-1 col-content lg:col-start-3 lg:col-span-8 flex flex-col gap-4 md:-mx-8`}
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
  )
}

export function PostImage({ post }) {
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
}

export function Support() {
  return (
    <aside className="row-span-1 bg-neutral-01-50 border border-1 border-neutral-01-200 rounded-lg flex flex-row flex-wrap content-center items-center gap-4 justify-between p-8 md:-mx-8 col-content lg:col-start-3 col-span-8">
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
