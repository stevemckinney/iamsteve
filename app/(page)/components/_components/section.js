import { cn } from '@/lib/utils'

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
      className={cn('flex flex-col gap-6 scroll-mt-24 group', className)}
      open={defaultOpen || undefined}
    >
      <summary className="flex items-center gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        <span className="flex items-center justify-center w-6 h-6 rounded-sm bg-neutral-01-100 dark:bg-neutral-01-800 transition-transform group-open:rotate-90">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-body-60"
          >
            <path
              d="M4.5 2.5L8 6L4.5 9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
      <div className="flex flex-col gap-6">{children}</div>
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
