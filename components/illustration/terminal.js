export default function Terminal({
  width = 96,
  height = 96,
  className = '',
  ...props
}) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 96 96"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect
        width="90"
        height="82"
        x="3"
        y="7"
        className="fill-surface"
        rx="8"
      />
      <path
        className="stroke-surface"
        strokeMiterlimit="10"
        strokeWidth="4"
        d="M5 80v1a6 6 0 0 0 6 6h74a6 6 0 0 0 6-6v-1"
      />
      <path
        className="stroke-foreground"
        strokeMiterlimit="10"
        strokeWidth="4"
        d="M91 18v-3a6 6 0 0 0-6-6H11a6 6 0 0 0-6 6v3"
      />
      <rect
        width="80"
        height="72"
        x="8"
        y="12"
        className="fill-foreground"
        rx="3"
      />
      <rect
        width="80"
        height="72"
        x="8"
        y="12"
        className="stroke-border"
        strokeWidth="2"
        rx="3"
      />
      <rect
        width="90"
        height="82"
        x="3"
        y="7"
        className="stroke-border"
        strokeWidth="2"
        rx="8"
      />
      <path
        className="stroke-border"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="m18 66 4 4-4 4m9 0h8"
      />
      <rect
        width="16"
        height="2"
        x="26"
        y="24"
        className="fill-lowlight"
        rx="1"
      />
      <rect width="4" height="2" x="18" y="24" className="fill-muted" rx="1" />
      <rect width="8" height="2" x="18" y="30" className="fill-border" rx="1" />
      <rect width="16" height="2" x="30" y="30" className="fill-muted" rx="1" />
      <rect
        width="2"
        height="2"
        x="46"
        y="24"
        className="fill-lowlight"
        rx="1"
      />
      <rect
        width="4"
        height="2"
        x="18"
        y="36"
        className="fill-lowlight"
        rx="1"
      />
      <rect width="2" height="2" x="50" y="30" className="fill-border" rx="1" />
    </svg>
  )
}
