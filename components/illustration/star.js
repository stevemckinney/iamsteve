export default function Star({
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
      <path
        className="fill-surface-100"
        d="m48 6 12.237 29.53L92 38.084 67.8 58.891 75.194 90 48 73.33 20.806 90 28.2 58.891 4 38.085l31.763-2.556L48 6Z"
      />
      <path
        className="fill-lowlight"
        d="M92 38.085 67.8 58.891 75.194 90 48 73.33 20.806 90 28.2 58.89 4 38.085 48 56.5l44-18.415Z"
      />
      <path className="stroke-foreground" strokeWidth="2" d="M48 6v50" />
      <path
        className="stroke-surface"
        strokeWidth="2"
        d="M48 56 22 88m26-32 26 32"
      />
      <path
        className="stroke-foreground"
        strokeWidth="2"
        d="M92 38.085 67.8 58.891l7.394 31.11L48 73.328 20.806 90 28.2 58.891 4 38.085 48 56.5l44-18.415Z"
      />
      <path
        className="stroke-border"
        strokeWidth="2"
        d="m48 6 12.237 29.53L92 38.084 67.8 58.891 75.194 90 48 73.33 20.806 90 28.2 58.891 4 38.085l31.763-2.556L48 6Z"
      />
    </svg>
  )
}
