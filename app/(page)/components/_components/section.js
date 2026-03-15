import { cn } from '@/lib/utils'

function DisclosureChevron({ className }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={cn('text-body-60', className)}
    >
      <path
        d="M4.5 2.5L8 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Section({
  id,
  title,
  description,
  children,
  className,
  defaultOpen = false,
}) {
  return (
    <details
      id={id}
      data-section
      className={cn(
        'flex flex-col gap-4 sm:gap-6 scroll-mt-24 group/section',
        className
      )}
      open={defaultOpen || undefined}
    >
      <summary className="flex items-center gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        <span className="flex items-center justify-center w-6 h-6 transition-transform group-open/section:rotate-90">
          <DisclosureChevron />
        </span>
        <div className="flex flex-col gap-0.5">
          <h2 className="font-display font-variation-bold text-2xl lowercase text-heading">
            {title}
          </h2>
          {description && (
            <p className="text-body-80 text-sm max-w-prose">{description}</p>
          )}
        </div>
      </summary>
      <div className="flex flex-col gap-0 sm:gap-6 divide-y divide-subtle sm:divide-y-0 [&>*]:pt-4 sm:[&>*]:pt-0 [&>*:first-child]:pt-0">
        {children}
      </div>
    </details>
  )
}

export function Disclosure({
  title,
  description,
  children,
  className,
  defaultOpen = false,
}) {
  return (
    <details
      className={cn('flex flex-col gap-3 sm:gap-4 group/disclosure', className)}
      open={defaultOpen || undefined}
    >
      <summary className="flex items-center gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        <span className="flex items-center justify-center w-5 h-5 transition-transform group-open/disclosure:rotate-90">
          <DisclosureChevron />
        </span>
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
            {title}
          </h3>
          {description && (
            <p className="text-body-80 text-sm max-w-prose">{description}</p>
          )}
        </div>
      </summary>
      <div className="flex flex-col gap-4">{children}</div>
    </details>
  )
}

export function Subsection({ title, description, children, className }) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {title && (
        <div className="flex flex-col gap-0.5">
          <h3 className="font-display font-variation-bold text-lg lowercase text-heading">
            {title}
          </h3>
          {description && <p className="text-body-80 text-sm">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export function DemoCard({ children, className }) {
  return (
    <div
      className={cn(
        'bg-surface rounded-lg shadow-placed overflow-hidden divide-y divide-border-light',
        className
      )}
    >
      {children}
    </div>
  )
}

DemoCard.Preview = function DemoCardPreview({ children, className }) {
  return (
    <div className={cn('p-6 flex flex-wrap items-start gap-4', className)}>
      {children}
    </div>
  )
}

DemoCard.Docs = function DemoCardDocs({ children, className }) {
  return (
    <div className={cn('flex flex-col gap-4 p-6', className)}>{children}</div>
  )
}

DemoCard.Usage = function DemoCardUsage({ children, className }) {
  return (
    <div className={cn('flex flex-col gap-4 p-6', className)}>{children}</div>
  )
}

DemoCard.Split = function DemoCardSplit({ children, className }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-light',
        className
      )}
    >
      {children}
    </div>
  )
}

export function Preview({ children, className }) {
  return (
    <div
      className={cn(
        'bg-surface rounded-lg shadow-placed p-6 flex flex-wrap items-start gap-4',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CodeExample({ children }) {
  return (
    <pre className="text-sm bg-fern-1100 text-fern-200 p-4 rounded-lg overflow-x-auto">
      <code>{children}</code>
    </pre>
  )
}
