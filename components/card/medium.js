import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/icon'
import Category from '@/components/category'
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
      <Image
        src={image}
        className="aspect-[1.6/1] object-fit rounded-lg"
        role="presentation"
        width={384}
        height={240}
        alt={title}
      />
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
    <div
      className={`relative flex flex-col rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced active:scale-[.99375] bg-white active:bg-neutral-01-50 bg-clip-padding transition ease-linear duration-200 overflow-hidden ${className}`}
    >
      {image && medium && (
        <>
          <Link
            href={slug}
            title=""
            className={`flex items-center justify-center aspect-[1.6/1] ${className}`}
            style={{ backgroundColor: `${imageColor}` }}
            aria-labelledby={`title-${id}`}
            tabIndex="0"
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
          <div
            className="flex items-center self-stretch"
            style={{ backgroundColor: `${imageColor}` }}
          >
            {categories && categories.includes('Design') ? (
              <Placeholder
                category="Design"
                kind="post"
                href={slug}
                title=""
                className={`flex items-center justify-center aspect-[1.6/1] ${className}`}
                style={{ backgroundColor: `${imageColor}` }}
                aria-labelledby={`title-${id}`}
                tabIndex="0"
              />
            ) : (
              <Placeholder
                category="Code"
                kind="post"
                href={slug}
                title=""
                className={`flex items-center justify-center aspect-[1.6/1] ${className}`}
                style={{ backgroundColor: `${imageColor}` }}
                aria-labelledby={`title-${id}`}
                tabIndex="0"
              />
            )}
          </div>
        </>
      )}
      <div className="flex flex-col flex-auto relative before:content-[''] before:w-16 before:h-6 before:absolute before:top-8 before:right-0 before:bg-gradient-to-r before:from-white/0 before:to-white active:before:from-neutral-01-50/0 active:before:to-neutral-01-50 before:z-[3] pb-[1.625rem]">
        {categories && (
          <div
            className={`flex flex-row gap-4 relative z-[2] overflow-x-auto pt-8 pb-3 px-8`}
          >
            {categories.map((category) => (
              <Category size={24} key={category} tabIndex="1">
                {category}
              </Category>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2 px-8 pt-[.8125rem]">
          <h2
            className="p-0 m-0 text-3xl leading-none lowercase font-display font-variation-bold"
            id={`title-${id}`}
          >
            <Link
              href={slug}
              tabIndex="0"
              className="text-fern-1100 before:content-[''] before:absolute before:inset-0 before:cursor-pointer before:rounded-lg before:z-[1]"
            >
              {title}
            </Link>
          </h2>
          {summary &&
            <div
              className="text-ui-body line-clamp-3 break-[none] text-lg hyphens-auto font-body"
              dangerouslySetInnerHTML={{
                __html: autoParagraph(summary),
              }}
            />
          }
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
      </div>
    </div>
  )
}

export default Medium
