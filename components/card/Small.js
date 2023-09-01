import Image from 'next/image'
import Link from 'next/link'
import Date from '@/components/date'

const Small = ({ frontmatter }) => {
  const { slug, date, title, summary, tags, id, theme, categories, images, medium, lastmod } =
    frontmatter

  const url = `/blog/${slug}`

  return (
    <article className="card card-small">
      <div className="card-body">
        <div className="meta f8-d dashes mb1 mb2-b">
          <time className="warm-l1" dateTime={date} itemProp="datePublished">
            <Date dateString={date} />
          </time>
        </div>

        <h3 className="f6 f5-b f4-d mb0 warm">
          <Link href={url} className="secondary-hover">
            {title}
          </Link>
        </h3>

        <div className="visuallyhidden" aria-hidden="true" tabIndex="-1">
          <Link href="/about" className="author vcard url fn" rel="author" tabIndex="-1">
            Steve McKinney
          </Link>
          <time dateTime={lastmod} className="updated" tabIndex="-1">
            <Date dateString={lastmod} />
          </time>
        </div>
      </div>
    </article>
  )
}

export default Small
