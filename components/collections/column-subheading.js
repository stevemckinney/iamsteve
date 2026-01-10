export function ColumnSubheading({ label, count }) {
  return (
    <div className="px-3 pt-4 pb-1 flex items-baseline justify-between">
      <h3 className="text-xs font-medium text-fern-1100/60 lowercase">
        {label}
      </h3>
      {count !== undefined && (
        <span className="text-xs text-cornflour-600">{count}</span>
      )}
    </div>
  )
}
