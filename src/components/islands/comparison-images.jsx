// components/comparison-images.js: a segmented control over stacked
// images. The tabs pick one, and Enter or Space on the images moves to the
// next. `images` holds each image’s props, which mdx/images.astro reads
// from the rendered post, and each draws as src/components/image.astro
// does. The class strings are Next’s: cn() would merge transition-all away
import { Fragment, useState } from 'react'
import Locale from './locale.jsx'

export default function ComparisonImages({
  images,
  description = 'Compare states',
  options = [
    { label: 'Before', value: 0 },
    { label: 'After', value: 1 },
  ],
  contextLabel,
}) {
  const defaultIndex = options.findIndex((opt) => opt.default) || 0
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const nextIndex = (activeIndex + 1) % options.length
      setActiveIndex(nextIndex)
    }
  }

  const validOptions = options.slice(0, 5)

  return (
    <Locale>
      <div
        className="flex flex-col gap-1 bg-neutral-01-100/80 dark:bg-surface shadow-placed dark:shadow-[inset_0_0_0_1px_var(--color-surface-02)] p-1 -mx-1 sm:-mx-9 rounded-[28px]"
        role="region"
        aria-label={description}
      >
        <div className="flex w-full gap-3 p-1 items-center ml-4 relative">
          {contextLabel && (
            <span className="text-sm text-heading/60 pt-2 pb-1.5 order-last">
              {contextLabel}
            </span>
          )}
          <div
            className="flex gap-px items-center justify-end bg-[url(/images/texture.png)] bg-size-[172px_auto] bg-blend-multiply bg-canvas shadow-[inset_0_0_0_1px_rgb(162_143_140/.24),_inset_0_1px_1px_-0.5px_rgb(162_143_140/.2),_inset_0_1px_3px_-1.5px_rgb(162_143_140/.2),_inset_0_2px_4px_-2px_rgb(162_143_140/.2),_inset_0_3px_6px_-3px_rgb(162_143_140/.2),_0_1px_rgb(252_249_248/1),_0_1px_1px_rgb(252_249_248/1)] dark:shadow-[inset_0_0_0_1px_var(--color-surface-raised)] rounded-[10px] p-1"
            role="tablist"
            aria-label="View options"
          >
            {validOptions.map((option, index) => (
              <Fragment key={index}>
                <button
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-controls={`view-${index}`}
                  className={`
                  transition-all duration-200 rounded-[7px] shadow-[0_0_0_0_rgb(0_0_0/0)] hover:text-heading active:shadow-[0_0_0_0_rgb(0_0_0/0)] active:bg-[light-dark(var(--color-neutral-01-200),var(--color-fern-1300))] active:scale-[.99375] bg-clip-padding transition duration-200 ease-in
                  text-sm pt-2 pb-1.5 px-4 text-ui-body
                  ${
                    activeIndex === index
                      ? 'bg-surface shadow-placed dark:shadow-[inset_0_0_0_1px_var(--color-surface-raised)]'
                      : ''
                  }
                `}
                  onClick={() => setActiveIndex(index)}
                >
                  {option.label}
                </button>
                {index < validOptions.length - 1 && (
                  <div
                    className={`
                    h-4 w-px bg-neutral-01-500/20
                    transition-opacity duration-200
                    ${
                      activeIndex === index || activeIndex === index + 1
                        ? 'opacity-0'
                        : 'opacity-100'
                    }
                  `}
                    aria-hidden="true"
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
        <div
          className="rounded-lg overflow-hidden grid grid-cols-1 grid-rows-1 before:content-[''] before:rounded-lg before:mix-blend-soft-light before:shadow-[inset_0_0_0_1px_black]  before:z-10 before:col-start-1 before:row-start-1 after:content-[''] after:rounded-lg after:mix-blend-soft-light after:shadow-[inset_0_0_0_1px_black] after:z-10 after:col-start-1 after:row-start-1 after:opacity-50"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {images.map((image, index) => (
            <div
              key={index}
              id={`view-${index}`}
              role="tabpanel"
              aria-labelledby={`button-${index}`}
              className={`col-start-1 row-start-1`}
            >
              <img
                alt={
                  image.alt ||
                  `${description} - ${validOptions[index]?.label || ''} state`
                }
                loading="lazy"
                width={image.width}
                height={image.height}
                decoding="async"
                className={`transition-opacity duration-1000 linear data-[active=true]:delay-0
                  data-[active=false]:delay-150 w-full`}
                style={{
                  color: 'transparent',
                  opacity: activeIndex === index ? 1 : 0,
                  objectFit: 'contain',
                }}
                src={image.src}
                data-active={activeIndex === index}
              />
            </div>
          ))}
        </div>

        <span className="sr-only">
          Use the segmented control above to switch between views. Currently
          showing {validOptions[activeIndex]?.label} state.
        </span>
      </div>
    </Locale>
  )
}
