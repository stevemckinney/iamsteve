import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/icon'
import Badge from '@/components/badge'
import Category from '@/components/category'
import Placeholder from '@/components/placeholder'
import Date from '@/components/date'

// https://gist.github.com/aradnom/06ef051c1c96f10c144d
function autoParagraph(text, size) {
  return (
    `<p className="${size}">` + text.split(/\n+/).join(`</p>\n<p>`) + `</p>`
  )
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

const LargeImage = ({ ...props }) => {
  const { image, title, imageColor, categories } = props

  return (
    <>
      <Image
        src={image}
        width={592}
        height={368}
        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        placeholder="blur"
        alt={title}
        className={`radius`}
      />
    </>
  )
}

const Container = ({ frontmatter, image, className }) => {
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
    large,
    lastmod,
  } = frontmatter

  const imageColor = theme ? theme.toString() : '#e8dcd9'
  const bgFadeTop = `${hexToRgb(imageColor).r},${hexToRgb(imageColor).g},${
    hexToRgb(imageColor).b
  }`

  return (
    <article
      className={`@container group flex flex-col self-start rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced bg-white active:bg-neutral-01-50 active:scale-[.99375] bg-clip-padding transition duration-200 ease-in overflow-hidden relative ${className}`}
    >
      {image && large && (
        <Link
          href={slug}
          title=""
          className={`relative flex items-center justify-center aspect-[1.6086956522/1]`}
          style={{ backgroundColor: `${imageColor}` }}
          aria-labelledby={`title-${id}`}
        >
          <>
            <div
              className={`absolute before:transition before:duration-200 before:ease-in z-[1] inset-0 before:z-[-1] before:absolute bg-fade before:bg-fade-neutral before:inset-0 before:opacity-0 group-active:before:opacity-100`}
              style={{ '--bg-fade-top': bgFadeTop }}
            />
            <LargeImage
              image={large}
              imageColor={imageColor}
              categories={categories}
              title={title}
            />
          </>
        </Link>
      )}
      {image && !large && (
        <>
          <div
            className="flex items-center self-stretch relative"
            style={{ backgroundColor: `${imageColor}` }}
          >
            <div className="absolute before:transition before:duration-200 before:ease-in z-[1] inset-0 bg-fade before:z-[-1] before:absolute before:bg-fade-neutral before:inset-0 before:opacity-0 group-active:before:opacity-100" />
            {categories && categories.includes('Design') ? (
              <Placeholder
                category="Design"
                kind="post"
                width={592}
                height={368}
                href={slug}
                title=""
                className={`flex items-center justify-center`}
                aria-labelledby={`title-${id}`}
                tabIndex="0"
              />
            ) : (
              <Placeholder
                category="Code"
                kind="post"
                width={592}
                height={368}
                href={slug}
                title=""
                className={`flex items-center justify-center`}
                aria-labelledby={`title-${id}`}
                tabIndex="0"
              />
            )}
          </div>
        </>
      )}
      <div className="flex flex-col flex-auto relative before:transition before:duration-200 before:ease-in before:w-16 before:h-9 before:absolute before:top-7 @md:before:top-0 before:right-0 before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:via-white/30 before:via-white/80 before:to-white active:before:from-neutral-01-50/0 active:before:via-neutral-01-50/10 active:before:via-neutral-01-50/30 active:before:via-neutral-01-50/80 active:before:to-neutral-01-50 before:z-[3] pb-8 @md:pb-[2.625rem]">
        <div
          className={`flex flex-row gap-4 relative z-[2] overflow-x-auto pb-4 @md:pb-5 px-8 @md:px-12 ${
            image ? 'pt-px -mt-px' : 'pt-8'
          }`}
        >
          {categories &&
            categories.map((category) => (
              <Category key={category} size={24} tabIndex="1">
                {category}
              </Category>
            ))}
          <Badge size={24} theme={`cornflour`} iconStart={`calendar`}>
            <Date dateString={date} />
          </Badge>
        </div>
        <div className="flex flex-col gap-2.5 px-8 pt-[.8125rem] @md:pt-5 @md:gap-3 @md:px-12">
          <h2
            className="p-0 m-0 text-3xl leading-none lowercase font-display font-variation-bold hyphens-auto @md:text-5xl"
            id={`title-${id}`}
          >
            <Link
              href={slug}
              className="text-fern-1100 before:content-[''] before:absolute before:inset-0 before:cursor-pointer before:rounded-md @md:before:rounded-lg before:z-[1]"
            >
              {title}
            </Link>
          </h2>
          {summary && (
            <div
              className="flex-auto text-lg text-ui-body line-clamp-4 md:line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: autoParagraph(summary, 'font-body'),
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
    </article>
  )
}

export default Container
