import { Suspense } from 'react'
import Script from 'next/script'
import { format, parseISO } from 'date-fns'
import { allPosts } from 'content-collections'
import { PostMdx } from '@/components/mdx-post'
import siteMetadata from '@/content/metadata'

import TableOfContents from '@/components/table-of-contents'
import Image from '@/components/image'
import Placeholder from '@/components/placeholder'
import Card from '@/components/card'
import Category from '@/components/category'
import Badge from '@/components/badge'
import PageTitle from '@/components/page-title'
import Icon from '@/components/icon'
import Link from '@/components/link'
import Newsletter from '@/components/newsletter'
import { PostLayoutFrame } from '@/components/post'
import FragmentLinks from '@/components/fragment-links'

import PostViews from './post-views'
import styles from './post.module.css'

const editUrl = (fileName) =>
  `${siteMetadata.siteRepo}/blob/main/content/blog/${fileName}`

export default function PostBody({ post, showViews = true, banner = null }) {
  const cleanSlug = post.slug.replace(/^\/blog\//, '')
  const currentYear = new Date().getFullYear()
  const postYear = new Date(post.date).getFullYear()
  const yearsAgo = currentYear - postYear
  const isOldCodePost = post.categories.includes('Code') && yearsAgo > 2
  const date = parseISO(post.date)

  return (
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
          {banner}
          {isOldCodePost && (
            <div className="shadow-(--shadow-notice) col-content lg:col-prose flex gap-3 leading-tight bg-(--color-notice-bg) rounded-md p-4">
              <Icon
                icon="square-info"
                className="text-(--color-notice-icon) flex-[0_0_auto]"
                variant="header"
              />
              <div className="flex flex-col">
                <p className="p-0 m-0 font-body text-sm text-(--color-notice-text)">
                  <strong>
                    This post was published {yearsAgo}{' '}
                    {yearsAgo === 1 ? 'year' : 'years'} ago
                  </strong>
                </p>
                <p className="p-0 m-0 font-body text-sm text-(--color-notice-muted)">
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
            <p className="text-lg text-pretty lg:text-2xl text-emphasis mb-2">
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
            {showViews && (
              <Badge size={16} theme={`text`} iconStart={`views`}>
                <Suspense
                  fallback={<span className="text-emphasis">— views</span>}
                >
                  <PostViews slug={cleanSlug} />
                </Suspense>
              </Badge>
            )}
          </div>
        </>
      }
      proseContent={
        <>
          <PostImage post={post} />
          <PostMdx code={post.mdx} />
          <FragmentLinks />
          <Badge
            href={editUrl(post._meta.fileName)}
            size={16}
            theme={`text`}
            iconStart={`github`}
          >
            View on Github
          </Badge>
        </>
      }
      afterContent={
        <>
          <Support />
          <NextPosts post={post} />
        </>
      }
    >
      {post.twitter === true && (
        <Script
          async
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
        />
      )}
    </PostLayoutFrame>
  )
}

function getRandomItem(set, category) {
  const allItems = allPosts.filter(
    (post) => post.status === 'open' && post.categories.includes(category)
  )
  const items = Array.from(allItems)
  return items[Math.floor(Math.random() * items.length)]
}

export function NextPosts({ post }) {
  return (
    <aside
      className={`xl:row-span-1 col-content lg:col-start-6 xl:col-start-7 lg:col-span-8 flex flex-col gap-4 lg:-mx-8 pb-18 mt-8`}
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
    <aside className="xl:row-span-1 bg-surface-02 dark:bg-surface shadow-[0_0_0_1px_var(--color-white)] dark:shadow-[0_0_0_1px_var(--color-surface-02)] rounded-lg flex flex-row flex-wrap content-center items-center gap-4 justify-between p-8 lg:-mx-8 col-content lg:col-start-6 xl:col-start-7 xl:col-span-8">
      <p className="p-0 m-0 text-base text-ui-body flex flex-col">
        <strong className="text-heading font-bold">
          Enjoying the reading experience?
        </strong>{' '}
        There’s no ads, tracking or cookie banners, so your support is valued
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
