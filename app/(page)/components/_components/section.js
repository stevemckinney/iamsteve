import { cn } from '@/lib/utils'

export function Section({ id, title, description, children, className }) {
  return (
    <section
      id={id}
      data-section
      className={cn('flex flex-col gap-6 scroll-mt-24', className)}
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-display font-variation-bold text-2xl lowercase text-heading">
          {title}
        </h2>
        {description && (
          <p className="text-body-80 text-sm max-w-prose">{description}</p>
        )}
      </div>
      {children}
    </section>
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
