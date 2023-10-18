import Image from 'next/image'
import Link from 'next/link'
import Date from '@/components/date'

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

  return (
    <article className="flex gap-4">
      <div className="card-body">
        <h3 className="font-display">
          <Link href={url} className="text-fern-1100 hover:text-dandelion-600 transition duration-200">
            {title}
          </Link>
        </h3>
        <time className="font-ui text-ui-body" dateTime={date} itemProp="datePublished">
          <Date dateString={date} />
        </time>

        <div className="visuallyhidden" aria-hidden="true" tabIndex="-1">
          <Link
            href="/about"
            className="author vcard url fn"
            rel="author"
            tabIndex="-1"
          >
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
