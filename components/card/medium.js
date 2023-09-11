import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/icon'
import Chip from '@/components/chip'
import Placeholder from '@/components/placeholder'
import Date from '@/components/date'

// https://gist.github.com/aradnom/06ef051c1c96f10c144d
function autoParagraph(text, size) {
  return `<p className="${size}">` + text.split(/\n+/).join(`</p>\n<p>`) + `</p>`
}

const MediumImage = ({ ...props }) => {
  const { images, title, medium, imageColor, categories } = props
  {
    medium ? (
      <>
        <div className="flex" style={{ backgroundColor: `${imageColor}` }}>
          <Image
            src={medium}
            className="radius"
            role="presentation"
            width={378}
            height={252}
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            placeholder="blur"
            alt={title}
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
    )
  }
}

const Medium = ({ frontmatter, image, className }) => {
  const { slug, date, title, summary, tags, id, theme, categories, images, medium, lastmod } =
    frontmatter

  const imageColor = theme ? theme.toString() : '#ccc'

  return (
    <article className="flex flex-col p-8 rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced bg-white active:bg-neutral-01-50 bg-clip-padding transition duration-200">
      {medium && (
        <Link
          href={slug}
          title=""
          className="card-image flex mb2 mb4-b"
          aria-labelledby={`title-${id}`}
        >
          <>
            <MediumImage
              medium={medium}
              imageColor={imageColor}
              categories={categories}
              title={title}
            />
          </>
        </Link>
      )}
      <div className="flex flex-col gap-4 flex-auto">
        {categories && (
          <>{categories && categories.map((category) => <Chip key={category}>{category}</Chip>)}</>
        )}
        <h2
          className="font-display font-variation-bold text-2xl leading-2xl lowercase m-0 p-0"
          id={`title-${id}`}
        >
          <Link href={slug} className="text-fern-1100">
            {title}
          </Link>
        </h2>
        <div
          className="flex-auto text-ui-body line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: autoParagraph(summary, 'text-lg font-body'),
          }}
        />
        <div className="sr-only" aria-hidden="true" tabIndex="-1">
          <Link href="/about" className="author vcard url fn" rel="author" tabIndex="-1">
            Steve McKinney
          </Link>{' '}
          <time dateTime={lastmod} className="updated" tabIndex="-1">
            <Date dateString={lastmod} />
          </time>
        </div>
      </div>
    </article>
  )
}

export default Medium
