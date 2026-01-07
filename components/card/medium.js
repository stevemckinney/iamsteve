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
      className={`absolute z-1 transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 border-0`}
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
    _id,
    theme,
    categories,
    images,
    medium,
    lastmod,
  } = frontmatter

  const imageColor = theme ? theme.toString() : '#f1e8e4'
  const bgFadeTop = `${hexToRgb(imageColor).r},${hexToRgb(imageColor).g},${
    hexToRgb(imageColor).b
  }`

  const categoryStyle = `flex flex-row gap-4 relative z-2 overflow-x-auto pb-3 px-8`
  const categoryClass = image
    ? `${categoryStyle} pt-px -mt-px`
    : `${categoryStyle} pt-8`

  return (
    <div
      className={`group/medium isolate relative flex flex-col rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced active:scale-[.99375] bg-surface active:bg-neutral-01-50 bg-clip-padding transition ease-linear duration-200 overflow-hidden ${className}`}
    >
      {image && medium && (
        <>
          <Link
            href={slug}
            title=""
            className={`flex w-full items-center justify-center aspect-video w-full relative overflow-hidden [mask:radial-gradient(150%_150%_at_50%_25%,#fff_24.1%,rgba(255,255,255,0.56)_41.94%,transparent_48.59%,transparent_100%)]`}
            style={{ backgroundColor: `${imageColor}` }}
            aria-labelledby={`title-${_id}`}
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
            className={`flex items-center justify-center aspect-video w-full relative overflow-hidden [mask:radial-gradient(150%_150%_at_50%_25%,#fff_24.1%,rgba(255,255,255,0.56)_41.94%,transparent_48.59%,transparent_100%)]`}
          >
            {categories && (
              <Placeholder
                category={categories.includes('Design') ? 'Design' : 'Code'}
                slug={slug}
                href={slug}
                alt={title}
                className={`flex items-center justify-center aspect-[1.6/1]`}
              />
            )}
          </div>
        </>
      )}
      <div className="flex flex-col flex-auto relative z-1 pb-6.5 [mask:linear-gradient(to_right,#fff_0%,#fff_calc(100%_-_64px),rgba(255,255,255,0.8)_calc(100%_-_48px),rgba(255,255,255,0.3)_calc(100%_-_24px),transparent_100%)]">
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
            id={`title-${_id}`}
          >
            <Link
              href={slug}
              tabIndex="0"
              className="text-heading before:content-[''] before:absolute before:inset-0 before:cursor-pointer before:rounded-lg before:z-1"
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
