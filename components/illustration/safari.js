export default function Safari({
  width = 96,
  height = 96,
  className = '',
  ...props
}) {
  return (
    <svg
      width={width} height={height} fill="none" viewBox="0 0 96 96"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="48" cy="48" r="44" className="fill-surface-100"/>
  <circle cx="48" cy="48" r="39" className="stroke-foreground" strokeMiterlimit="10" strokeWidth="3"/>
  <path className="stroke-lowlight" strokeMiterlimit="10" strokeWidth="3" d="M87 48a39 39 0 0 0-78 0h78Z"/>
  <circle cx="48" cy="48" r="37" className="fill-foreground stroke-border" strokeMiterlimit="10" strokeWidth="2"/>
  <path className="stroke-border" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M79 49h-6m-3.787 21.627-4.242-4.242M23 49h-6m12.615-17.971-4.242-4.242M47 79v-6m0-50v-6M25.372 69.213l4.243-4.242m35.356-35.356 4.242-4.243"/>
  <path className="stroke-subtle" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21.153 64.5 1.732-1m50.23-29 1.732-1M18.056 57.023l1.932-.517m56.024-15.012 1.932-.517m-59.888 0 1.932.517m56.024 15.012 1.932.517M21.153 33.5l1.732 1m50.23 29 1.732 1M55.023 77.944l-.517-1.932M39.494 19.988l-.517-1.932M62.5 74.847l-1-1.732m-29-50.23-1-1.732m0 53.694 1-1.732m29-50.23 1-1.732M38.977 77.944l.517-1.932m15.012-56.024.517-1.932"/>
  <path className="stroke-lowlight" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" d="m26 70 22-22"/>
  <path className="stroke-muted" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="m48 48 22-22"/>
  <circle cx="48" cy="48" r="37" className="stroke-border" strokeMiterlimit="10" strokeWidth="2"/>
  <circle cx="48" cy="48" r="44" className="stroke-border" strokeWidth="2"/>
    </svg>
  )
}
