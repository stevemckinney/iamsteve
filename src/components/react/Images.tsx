import React, { useState, Children, type ReactNode } from 'react'

interface ComparisonOption {
  label: string
  value?: number
  default?: boolean
}

interface ComparisonImagesProps {
  children: ReactNode
  description?: string
  options?: ComparisonOption[]
  contextLabel?: string
}

function ComparisonImages({
  children,
  description = 'Compare states',
  options = [
    { label: 'Before', value: 0 },
    { label: 'After', value: 1 },
  ],
  contextLabel,
}: ComparisonImagesProps) {
  const defaultIndex = options.findIndex((opt) => opt.default) || 0
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const nextIndex = (activeIndex + 1) % options.length
      setActiveIndex(nextIndex)
    }
  }

  const validOptions = options.slice(0, 5)
  const images = Children.toArray(children)

  return (
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
            <React.Fragment key={index}>
              <button
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`view-${index}`}
                className={`transition-all duration-200 rounded-[7px] shadow-[0_0_0_0_rgb(0_0_0/0)] hover:text-heading active:shadow-[0_0_0_0_rgb(0_0_0/0)] active:bg-[light-dark(var(--color-neutral-01-200),var(--color-fern-1300))] active:scale-[.99375] bg-clip-padding transition duration-200 ease-in text-sm pt-2 pb-1.5 px-4 text-ui-body ${
                  activeIndex === index
                    ? 'bg-surface shadow-placed dark:shadow-[inset_0_0_0_1px_var(--color-surface-raised)]'
                    : ''
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {option.label}
              </button>
              {index < validOptions.length - 1 && (
                <div
                  className={`h-4 w-px bg-neutral-01-500/20 transition-opacity duration-200 ${
                    activeIndex === index || activeIndex === index + 1
                      ? 'opacity-0'
                      : 'opacity-100'
                  }`}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        className="rounded-lg overflow-hidden grid grid-cols-1 grid-rows-1 before:content-[''] before:rounded-lg before:mix-blend-soft-light before:shadow-[inset_0_0_0_1px_black] before:z-10 before:col-start-1 before:row-start-1 after:content-[''] after:rounded-lg after:mix-blend-soft-light after:shadow-[inset_0_0_0_1px_black] after:z-10 after:col-start-1 after:row-start-1 after:opacity-50"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {images.map((image, index) => (
          <div
            key={index}
            id={`view-${index}`}
            role="tabpanel"
            aria-labelledby={`button-${index}`}
            className="col-start-1 row-start-1"
          >
            <div
              className="transition-opacity duration-1000 linear w-full"
              style={{ opacity: activeIndex === index ? 1 : 0 }}
            >
              {image}
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">
        Use the segmented control above to switch between views. Currently
        showing {validOptions[activeIndex]?.label} state.
      </span>
    </div>
  )
}

interface ImagesProps {
  children: ReactNode
  align?: string
  compare?: boolean
  options?: ComparisonOption[]
  description?: string
  contextLabel?: string
}

export default function Images({
  children,
  compare = false,
  options,
  ...props
}: ImagesProps) {
  if (compare) {
    return (
      <ComparisonImages options={options} {...props}>
        {children}
      </ComparisonImages>
    )
  }

  return (
    <div className="flex col-container grid-cols-subgrid gap-4 overscroll-contain-x overflow-x-auto py-4 -my-4 prose-exclude images px-6 sm:px-12 -mx-6 sm:[mask:linear-gradient(90deg,transparent_0%,#000_32px,#000_calc(100%-32px),transparent_100%)]">
      <div className="shrink-0 max-sm:hidden sm:basis-1/5" aria-hidden="true" />
      {children}
    </div>
  )
}
