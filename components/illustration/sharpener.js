export default function Sharpener({
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
        className="stroke-border"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 8a4 4 0 0 1 4-4h56a4 4 0 0 1 4 4v15.432c0 .377-.051.744-.15 1.107C79.11 27.23 75.917 39.494 76 50c.082 10.403 3.453 22.467 4.306 25.355.126.429.187.873.173 1.32l-.358 11.45A4 4 0 0 1 76.123 92H20a4 4 0 0 1-4-4V76.553c0-.367.048-.724.143-1.078C16.858 72.806 20 60.475 20 50c0-10.476-3.142-22.806-3.857-25.474a4.142 4.142 0 0 1-.143-1.08V8Z"
      />
      <path
        className="fill-foreground stroke-border"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 8a4 4 0 0 1 4-4h56a4 4 0 0 1 4 4v15.432c0 .377-.051.744-.15 1.107C79.11 27.23 75.917 39.494 76 50c.082 10.403 3.453 22.467 4.306 25.355.126.429.187.873.173 1.32l-.358 11.45A4 4 0 0 1 76.123 92H20a4 4 0 0 1-4-4V76.553c0-.367.048-.724.143-1.078C16.858 72.806 20 60.475 20 50c0-10.476-3.142-22.806-3.857-25.474a4.142 4.142 0 0 1-.143-1.08V8Z"
      />
      <path
        className="fill-surface-100"
        d="M32 4h32v60c0 8.837-7.163 16-16 16s-16-7.163-16-16V4Z"
      />
      <path className="fill-foreground" d="M46 4h-6v74l6 2V4Z" />
      <path
        className="fill-subtle"
        d="M32 61h32v2c0 8.837-7.163 16-16 16s-16-7.163-16-16v-2Z"
        opacity=".1"
      />
      <path
        className="fill-foreground"
        d="M54 44a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
      />
      <path
        className="stroke-lowlight"
        strokeWidth="2"
        d="M49 39h10m-5-5v10m0 0a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
      />
      <path className="fill-foreground" d="M64 9.571 40 17V4h24v5.571Z" />
      <path
        className="stroke-border"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M32 4h32v60c0 8.837-7.163 16-16 16s-16-7.163-16-16V4Z"
      />
      <path
        className="fill-border"
        fillRule="evenodd"
        d="M40 4h-8v60c0 5.922 3.218 11.093 8 13.86V4Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
