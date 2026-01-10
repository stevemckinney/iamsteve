export default function Sticky({
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
        width="84"
        height="84"
        x="6"
        y="6"
        className="fill-surface stroke-surface"
        strokeWidth="2"
        rx="16"
      />
      <rect
        width="84"
        height="84"
        x="6"
        y="6"
        className="fill-lowlight stroke-surface"
        strokeWidth="2"
        rx="16"
      />
      <rect
        width="84"
        height="78"
        x="6"
        y="6"
        className="fill-lowlight stroke-border"
        strokeWidth="2"
        rx="16"
      />
      <rect
        width="84"
        height="72"
        x="6"
        y="6"
        className="fill-lowlight stroke-border"
        strokeWidth="2"
        rx="16"
      />
      <g opacity=".4">
        <path
          className="fill-border"
          fillRule="evenodd"
          d="M63 78h11c8.837 0 16-7.163 16-16V51a9 9 0 0 1-9 9 9 9 0 0 0-9 9 9 9 0 0 1-9 9Z"
          clipRule="evenodd"
        />
        <path
          className="fill-border"
          d="M74 78v.5-.5Zm0-.5H63v1h11v-1ZM89.5 62c0 8.56-6.94 15.5-15.5 15.5v1c9.113 0 16.5-7.387 16.5-16.5h-1Zm0-11v11h1V51h-1Zm0 0a8.5 8.5 0 0 1-8.5 8.5v1a9.5 9.5 0 0 0 9.5-9.5h-1ZM81 59.5a9.5 9.5 0 0 0-9.5 9.5h1a8.5 8.5 0 0 1 8.5-8.5v-1ZM71.5 69a8.5 8.5 0 0 1-8.5 8.5v1a9.5 9.5 0 0 0 9.5-9.5h-1Z"
        />
      </g>
      <path
        className="fill-lowlight"
        d="M6 22c0-8.837 7.163-16 16-16h52c8.837 0 16 7.163 16 16v24c0 17.673-14.327 32-32 32H22c-8.837 0-16-7.163-16-16V22Z"
      />
      <path
        className="fill-foreground stroke-border"
        strokeWidth="2"
        d="M6 22c0-8.837 7.163-16 16-16h52.571C83.092 6 90 12.908 90 21.429V51a9 9 0 0 1-9 9 9 9 0 0 0-9 9 9 9 0 0 1-9 9H22c-8.837 0-16-7.163-16-16V22Z"
      />
      <rect
        width="84"
        height="84"
        x="6"
        y="6"
        className="stroke-border"
        strokeWidth="2"
        rx="16"
      />
    </svg>
  )
}
