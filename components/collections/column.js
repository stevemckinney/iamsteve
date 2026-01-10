import { ColumnSubheading } from './column-subheading'

export function Column({ title, children, count, subdivisions }) {
  return (
    <div className="flex h-full w-64 min-w-64 flex-col border-r border-neutral-01-500/10">
      <div className="border-b border-neutral-01-500/10 px-4 py-3 flex items-baseline justify-between gap-2">
        <h2 className="text-xs font-medium uppercase tracking-wider text-fern-1100/60 lowercase">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-xs text-cornflour-600">{count}</span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {subdivisions
          ? // Render subdivided content
            Object.entries(subdivisions).map(([label, items]) =>
              items.length > 0 ? (
                <div key={label}>
                  <ColumnSubheading label={label} count={items.length} />
                  {items}
                </div>
              ) : null
            )
          : // Render flat list
            children}
      </div>
    </div>
  )
}
