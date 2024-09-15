import { notFound } from 'next/navigation'
import Script from 'next/script'
import { PostMdx } from '@/components/mdx-components'
import siteMetadata from '@/content/metadata'
import Image from '@/components/image'
import Placeholder from '@/components/placeholder'
import Category from '@/components/category'
import Badge from '@/components/badge'
import PageTitle from '@/components/page-title'
import { format, parseISO } from 'date-fns'
import Icon from '@/components/icon'
import Link from '@/components/link'
import { getAllPageViews } from '../../views'
import ViewCounter from '../../counter'
import { getPostFromParams } from '@/lib/utils/content'

import styles from '../post.module.scss'

const editUrl = (fileName) =>
  `${siteMetadata.siteRepo}/blob/main/content/blog/${fileName}`

export default async function PostPage({ params }) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const allViews = await getAllPageViews()
  const cleanSlug = post.slug.replace(/^\/blog\//, '')
  const initialViews = allViews[cleanSlug] || 0

  const currentYear = new Date().getFullYear()
  const postYear = new Date(post.date).getFullYear()
  const yearsAgo = currentYear - postYear

  const isOldCodePost = post.categories.includes('Code') && yearsAgo > 2

  const date = parseISO(post.date)

  const jsonLD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
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
        image: {
          '@type': 'ImageObject',
          url: post.ogImage,
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
                There's a chance things are out of date or no longer reflect my
                views today
              </p>
            </div>
          </div>
        )}
        <Badge size={16} theme="text" iconStart="calendar">
          <time dateTime={post.date} className="date">
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
              post.categories.map((category, index) => (
                <Category size={16} key={index}>
                  {category}
                </Category>
              ))}
          </div>
          <Badge size={16} theme="text" iconStart="views">
            <ViewCounter
              slug={cleanSlug}
              initialViews={initialViews}
              trackView={true}
            />
          </Badge>
        </div>
      </header>
      <div
        className={`${styles.prose} prose grid grid-cols-subgrid col-container lg:col-span-8 xl:col-span-10 gap-x-8 gap-y-0  lg:row-span-1`}
        id="article"
      >
        <PostImage post={post} />
        <PostMdx code={post.body.code} />
        <Badge
          href={editUrl(post._raw.sourceFileName)}
          size={16}
          theme="text"
          iconStart="github"
        >
          View on Github
        </Badge>
      </div>
      {post.codepen && (
        <Script
          src="https://cpwebassets.codepen.io/assets/embed/ei.js"
          strategy="afterInteractive"
        />
      )}
      {post.twitter && (
        <Script
          async
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
        />
      )}
    </>
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
