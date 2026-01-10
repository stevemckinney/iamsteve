export default function Colour({
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
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        className="fill-foreground stroke-border"
        d="M27 27.5h.5v-15h-15v15H27Zm-15-18h16c1.424 0 2.5 1.076 2.5 2.5v16c0 1.424-1.076 2.5-2.5 2.5H12c-1.424 0-2.5-1.076-2.5-2.5V12c0-1.424 1.076-2.5 2.5-2.5Z"
      />
      <path
        className="fill-foreground stroke-border"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M28 9H12c-1.7 0-3 1.3-3 3v16c0 1.7 1.3 3 3 3h16c1.7 0 3-1.3 3-3V12c0-1.7-1.3-3-3-3Zm-1 18H13V13h14v14Z"
      />
      <path
        className="fill-surface-100"
        d="M20 23H4c-1.7 0-3-1.3-3-3V4c0-1.7 1.3-3 3-3h16c1.7 0 3 1.3 3 3v16c0 1.7-1.3 3-3 3Z"
      />
      <path
        className="fill-foreground"
        d="M20 1H4C2.3 1 1 2.3 1 4v3c0-1.7 1.3-3 3-3h16c1.7 0 3 1.3 3 3V4c0-1.7-1.3-3-3-3Z"
      />
      <path
        className="fill-lowlight"
        d="M20 20H4c-1.7 0-3-1.3-3-3v3c0 1.7 1.3 3 3 3h16c1.7 0 3-1.3 3-3v-3c0 1.7-1.3 3-3 3Z"
      />
      <path
        className="stroke-border"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M20 23H4c-1.7 0-3-1.3-3-3V4c0-1.7 1.3-3 3-3h16c1.7 0 3 1.3 3 3v16c0 1.7-1.3 3-3 3Z"
      />
    </svg>
  )
}
