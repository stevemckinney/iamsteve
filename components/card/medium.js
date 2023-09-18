import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/icon'
import Chip from '@/components/chip'
import Placeholder from '@/components/placeholder'
import Date from '@/components/date'

// https://gist.github.com/aradnom/06ef051c1c96f10c144d
function autoParagraph(text) {
  return `<p>` + text.split(/\n+/).join(`</p>\n<p>`) + `</p>`
}

const MediumImage = ({ ...props }) => {
  const { image, title, medium, imageColor, categories } = props

  // New 384x316
  // Legacy 378x252
  return (
    <>
      <div
        className="flex self-stretch"
        style={{ backgroundColor: `${imageColor}` }}
      >
        <Image
          src={image}
          className="object-contain"
          role="presentation"
          width={384}
          height={316}
          alt={title}
        />
      </div>
    </>
  )
}

const Medium = ({ frontmatter, image, className }) => {
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

  const imageColor = theme ? theme.toString() : '#ccc'

  return (
    <article className="flex flex-col rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced bg-white active:bg-neutral-01-50 bg-clip-padding transition duration-200 overflow-hidden">
      {image && medium && (
        <>
          <Link
            href={slug}
            title=""
            className={`flex items-center justify-center aspect-[1.2131147541/1] ${className}`}
            style={{ backgroundColor: `${imageColor}` }}
            aria-labelledby={`title-${id}`}
          >
            <>
              <MediumImage
                image={medium}
                imageColor={imageColor}
                categories={categories}
                title={title}
              />
            </>
          </Link>
        </>
      )}
      {image && !medium && (
        <>
          {categories && categories.includes('Design') ? (
            <Placeholder
              category="Design"
              kind="post"
              href={slug}
              title=""
              className={`flex items-center justify-center aspect-[1.2131147541/1] ${className}`}
              style={{ backgroundColor: `${imageColor}` }}
              aria-labelledby={`title-${id}`}
            />
          ) : (
            <Placeholder
              category="Code"
              kind="post"
              href={slug}
              title=""
              className={`flex items-center justify-center aspect-[1.2131147541/1] ${className}`}
              style={{ backgroundColor: `${imageColor}` }}
              aria-labelledby={`title-${id}`}
            />
          )}
        </>
      )}
      <div className="flex flex-col gap-4 flex-auto p-8">
        {categories && (
          <div className={`flex flex-row gap-4 mb-1`}>
            {categories &&
              categories.map((category) => (
                <Chip
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                >
                  {category}
                </Chip>
              ))}
          </div>
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
          className="text-ui-body line-clamp-3 break-[none] text-lg hyphens-auto font-body"
          dangerouslySetInnerHTML={{
            __html: autoParagraph(summary),
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

export default Medium
