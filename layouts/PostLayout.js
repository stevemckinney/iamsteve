import { useEffect } from 'react'
import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'

import { BlogSEO } from '@/components/SEO'
import { PageViews } from '@/components/PageViews'

import Link from '@/components/Link'
import Icon from '@/components/icon/index.js'
import Placeholder from '@/components/placeholder/index.js'
import PageTitle from '@/components/PageTitle'
import Image from '@/components/Image'
import Category from '@/components/Category'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`

const postDateTemplate = { year: 'numeric', month: 'short', day: 'numeric' }
const isDevelopment = process.env.NODE_ENV === 'development'

const PostLayout = ({ frontmatter, authorDetails, next, prev, children }) => {
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
    codepen,
    twitter,
  } = frontmatter

  if ( !isDevelopment ) {
    useEffect(() => {
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })
    }, [slug])
  }

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontmatter}
      />

      <>
        {images ? (
          <>
            <div
              className="pt4 pb4 pt6-b pb6-b pt7-d pb8-d flex center featured-image entry-image"
              style={{ backgroundColor: theme.toString() }}
            >
              {images &&
                images.map((image) => (
                  <Image
                    src={image}
                    className="radius"
                    alt=""
                    width={744}
                    height={492}
                    key={image}
                    blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    placeholder="blur"
                  />
                ))}
            </div>
          </>
        ) : (
          <>
            {categories && categories.includes('Design') ? (
              <Placeholder category="Design" kind="hero" />
            ) : (
              <Placeholder category="Code" kind="hero" />
            )}
          </>
        )}
      </>

      <article className="entry-content pt6 pb6">
        <header className="entry-header relative pb4 p0-d">
          <PageTitle>{title}</PageTitle>

          <div className="meta single-meta flex warm-l3">
            <span className="meta-item flex items-center">
              <Icon kind="date" />
              <time dateTime={date}>
                {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
            </span>
            {categories &&
              categories.map((category) => (
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
              <Icon kind="save" />
              <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
            </span>

            <div className="visuallyhidden" aria-hidden="true" tabIndex="-1">
              <a href="https://iamsteve.me" className="author vcard url fn" rel="author">
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

      <hr className="mb4 mt4 divider" />

      <div className="support m-center measure-padding pb6 flex flex-wrap align-center items-center between">
        <div className="column column-5-d mb4 mb0-d">
          <p>I’m a tea drinker, but it’s equally appreciated if you found the article useful.</p>
        </div>
        <div className="column column-3-d">
          <a
            href="https://www.buymeacoffee.com/BQoVfY7gc"
            className="button button-bmc flex align-center items-center justify-center self-end"
          >
            <Icon kind="coffee" width="24" height="24" /> Buy me a coffee
          </a>
        </div>
      </div>

      {next ? (
        <article className="m-center measure-padding pb6">
          <h3 className="f1-l mb2 dashes">
            <span>Next to read</span>
          </h3>
          <h2 className="headline-l primary entry-next">
            <Link href={`/blog/${next.slug}`} data-event="Related entry [v6-specific]">
              {next.title}
            </Link>
            <span className="icon icon-small icon-right tertiary">
              <Icon kind="right" />
            </span>
          </h2>
        </article>
      ) : null}

      {codepen && <Script async src="https://production-assets.codepen.io/assets/embed/ei.js" strategy="lazyOnload" />}
      {twitter && <Script async src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />}
    </>
  )
}

export default PostLayout
