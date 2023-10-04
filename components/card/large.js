import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/icon'
import Category from '@/components/category'
import Placeholder from '@/components/placeholder'
import Date from '@/components/date'

// https://gist.github.com/aradnom/06ef051c1c96f10c144d
function autoParagraph(text, size) {
  return (
    `<p className="${size}">` + text.split(/\n+/).join(`</p>\n<p>`) + `</p>`
  )
}

const LargeImage = ({ ...props }) => {
  const { image, title, imageColor, categories } = props

  return (
    <>
      <Image
        src={image}
        role="presentation"
        width={592}
        height={488}
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        placeholder="blur"
        alt={title}
        className={`radius`}
      />
    </>
  )
}

const Large = ({ frontmatter, image, className }) => {
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

  const imageColor = theme ? theme.toString() : '#e8dcd9'

  return (
    <article className="flex flex-col rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced bg-white active:bg-neutral-01-50 bg-clip-padding transition duration-200 overflow-hidden self-start">
      {image && (
        <Link
          href={slug}
          title=""
          className={`flex items-center justify-center aspect-[1.2131147541/1] ${className}`}
          style={{ backgroundColor: `${imageColor}` }}
          aria-labelledby={`title-${id}`}
        >
          <>
            <LargeImage
              image={images[0]}
              imageColor={imageColor}
              categories={categories}
              title={title}
            />
          </>
        </Link>
      )}
      <div className="flex flex-col gap-4 flex-auto p-12">
        {categories && (
          <div className={`flex flex-row gap-4 mb-5 relative z-[2]`}>
            {categories.map((category) => (
              <Category key={category} size="large">
                {category}
              </Category>
            ))}
          </div>
        )}
        <h2
          className="font-display font-variation-bold text-5xl lowercase m-0 p-0"
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
          <Link
            href="/about"
            className="author vcard url fn"
            rel="author"
            tabIndex="-1"
          >
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

export default Large
