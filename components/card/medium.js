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

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const MediumImage = ({ ...props }) => {
  const { image, title, medium, imageColor, categories } = props

  // New 384x316
  // Legacy 378x252
  return (
    <Image
      src={image}
      width={384}
      height={240}
      alt={title}
      className={`absolute z-[1] transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 border-0`}
    />
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

  const imageColor = theme ? theme.toString() : '#e8dcd9'
  const bgFadeTop = `${hexToRgb(imageColor).r},${hexToRgb(imageColor).g},${
    hexToRgb(imageColor).b
  }`

  const categoryStyle = `flex flex-row gap-4 relative z-[2] overflow-x-auto pb-3 px-8`
  const categoryClass = image
    ? `${categoryStyle} pt-px -mt-px`
    : `${categoryStyle} pt-8`

  return (
    <div
      className={`group relative flex flex-col rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced active:scale-[.99375] bg-white active:bg-neutral-01-50 bg-clip-padding transition ease-linear duration-200 overflow-hidden ${className}`}
    >
      {image && medium && (
        <>
          <Link
            href={slug}
            title=""
            className={`flex w-full items-center justify-center aspect-[16/9] w-full relative overflow-hidden [mask:radial-gradient(20rem_14rem_at_50%_15%,rgb(255_255_255_/_1)_60%,transparent)]`}
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
            className={`flex items-center justify-center aspect-[16/9] w-full relative overflow-hidden`}
            style={{ backgroundColor: `${imageColor}` }}
          >
            {categories && (
              <Placeholder
                category={categories.includes('Design') ? 'Design' : 'Code'}
                kind="post"
                href={slug}
                title={title}
                alt={title}
                className={`flex items-center justify-center aspect-[1.6/1]`}
                style={{ backgroundColor: `${imageColor}` }}
                aria-labelledby={`title-${id}`}
                tabIndex="0"
              />
            )}
          </div>
        </>
      )}
      <div className="flex flex-col flex-auto relative z-1 before:transition before:duration-200 before:ease-in before:w-16 before:h-9 before:absolute before:top-7 before:right-0 before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:via-white/30 before:via-white/80 before:to-white active:before:from-neutral-01-50/0 active:before:via-neutral-01-50/10 active:before:via-neutral-01-50/30 active:before:via-neutral-01-50/80 active:before:to-neutral-01-50 active:before:via-50% active:before:via-80% before:z-[3] pb-[1.625rem]">
        {categories.length > 0 && (
          <div className={categoryClass} key="cats">
            {categories.map((category, index) => (
              <Category size={24} key={`${category}${index}`} tabIndex="1">
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
          {summary && (
            <div
              className="text-ui-body line-clamp-3 break-[none] text-lg hyphens-auto font-body"
              dangerouslySetInnerHTML={{
                __html: autoParagraph(summary),
              }}
            />
          )}
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
