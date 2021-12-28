import formatDate from '@/lib/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'

import Tag from '@/components/Tag'
import Placeholder from '@/components/placeholder/index.js'

const Small = ({ frontmatter }) => {
  const {
    slug,
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
  } = frontmatter

  const url = `/blog/${slug}`
  const imageColor = theme ? theme.toString() : '#ccc'

  return (
    <article className="card card-small">
      <Link href={url}>
        <a className="card-image mb2 flex radius">
          <>
            {medium ? (
              <>
                <div className="radius flex" style={{ backgroundColor: `${imageColor}` }}>
                  <Image
                    src={medium}
                    className="radius"
                    alt=""
                    role="presentation"
                    width={244}
                    height={162}
                  />
                </div>
              </>
            ) : (
              <>
                {categories && categories.includes('Design') ? (
                  <Placeholder category="Design" kind="post" />
                ) : (
                  <Placeholder category="Code" kind="post" />
                )}
              </>
            )}
          </>
        </a>
      </Link>
      <div className="card-body">
        <div className="meta f8-d dashes mb1 mb2-b">
          <time className="warm-l1" dateTime={date} itemProp="datePublished">
            {formatDate(date)}
          </time>
        </div>

        <h3 className="f6 f5-b f4-d mb0 warm">
          <Link href={url}>
            <a className="secondary-hover">{title}</a>
          </Link>
        </h3>

        <div className="visuallyhidden" aria-hidden="true" tabIndex="-1">
          <a href="/about" className="author vcard url fn" rel="author">
            Steve McKinney
          </a>
          <time dateTime={lastmod} className="updated">
            {formatDate(lastmod)}
          </time>
        </div>
      </div>
    </article>
  )
}

export default Small
