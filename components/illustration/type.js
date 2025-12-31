export default function Type({
  width = 96,
  height = 96,
  className = '',
  ...props
}) {
  return (
    <svg
      width={width} height={height} fill="none" viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path className="fill-surface-100" d="M28 12s-.3-6-8-6v20l4 1v4H8v-5l4-1V6c-7.7 0-8 6-8 6H1V1h30v11h-3Z"/>
  <path className="fill-foreground" d="M8.4 25.9 12 25c.8-.2 1.6.3 1.8 1.1.2.8-.3 1.6-1.1 1.8l-3.6.9c-.8.2-1.6-.3-1.8-1.1-.2-.8.3-1.6 1.1-1.8ZM20 25l3.7.9c.8.2 1.3 1 1.1 1.8-.2.8-1 1.3-1.8 1.1l-3.7-.9c-.8-.2-1.3-1-1.1-1.8.2-.8 1-1.3 1.8-1.1ZM31 1H1v3h30V1Z"/>
  <path className="stroke-border" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M28 13s-.3-6-8-6v18l4 1v5H8v-5l4-1V7c-7.7 0-8 6-8 6H1V1h30v12h-3Z"/>
    </svg>
  )
}
