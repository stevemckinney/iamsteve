import { useEffect } from 'react'

import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

import { BlogSEO } from '@/components/SEO'
import { PageViews } from '@/components/PageViews'

import Link from '@/components/Link'
import Icon from '@/components/icon'
import Placeholder from '@/components/placeholder'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Category from '@/components/Category'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontmatter, authorDetails, next, prev, children }) {
  const {
    slug,
    fileName,
    date,
    title,
    summary,
    tags,
    id,
    theme,
    categories,
    images,
    medium,
    lastmod,
    readingTime,
  } = frontmatter

  useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: 'POST',
    })
  }, [slug])

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontmatter}
      />
      <ScrollTopAndComment />

      <div
        className="pt4 pb4 pt6-b pb6-b pt7-d pb8-d featured-image entry-image"
        role="presentation"
        style={{ backgroundColor: theme.toString() }}
      >
        <>
          {images ? (
            <>
              {images.map((image) => (
                <Image
                  src={image}
                  className="radius"
                  alt=""
                  role="presentation"
                  width={378}
                  height={252}
                  key={image}
                />
              ))}
            </>
          ) : (
            <>
              {categories.includes('Design') ? (
                <Placeholder kind="Design" />
              ) : (
                <Placeholder kind="Code" />
              )}
            </>
          )}
        </>
      </div>

      <article className="entry-content pt6 pb6">
        <p className="">
          Page views: <PageViews slug={slug} />
        </p>
        <header className="entry-header relative pb4 p0-d">
          <PageTitle>{title}</PageTitle>

          <div className="meta single-meta flex warm-l3">
            <span className="meta-item flex items-center">
              <Icon kind="date" />
              <time dateTime={date}>
                {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
            </span>
            {categories.map((category) => (
              <Category
                key={category}
                text={category}
                styling="meta-item flex items-center"
                icon={true}
              />
            ))}
            <span className="meta-item flex items-center">
              <Icon kind="time" />
              {frontmatter.readingTime.text}
            </span>

            <span className="meta-item meta-item-last flex items-center">
              <button className="button button-t button-offline p0 flex">
                <Icon kind="save" />
                <span className="button-text">Save for offline</span>
              </button>
            </span>

            <div className="visuallyhidden" aria-hidden="true" tabIndex="-1">
              <a href="{site_url}" className="author vcard url fn" rel="author">
                Steve McKinney
              </a>
              <time dateTime={lastmod} className="updated">
                {formatDate(lastmod)}
              </time>
            </div>
          </div>
        </header>

        {children}
      </article>

      <span className="meta-item meta-item-last flex items-center">
        <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
      </span>

      <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
        <div
          className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
            <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
              <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
            </div>
            <Comments frontmatter={frontmatter} />
          </div>
          <footer className="sticky">
            <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
              {(next || prev) && (
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  {prev && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Previous Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Next Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="pt-4 xl:pt-8">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                &larr; Back to the blog
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </SectionContainer>
  )
}
