export default function PencilMono({
  width = 962,
  height = 46,
  className = '',
  ...props
}) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 962 46"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        className="fill-lowlight"
        d="M5 45h34V1H5C2.79 1 1 2.79 1 5v36c0 2.21 1.79 4 4 4Z"
      />
      <path
        className="fill-border"
        d="M1 5v8h38V1H5C2.79 1 1 2.79 1 5Z"
        opacity={0.4}
      />
      <path
        className="fill-border"
        d="M1 33v8c0 2.21 1.79 4 4 4h34V33H1Z"
        opacity={0.5}
      />
      <path
        className="stroke-accent"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M851 45V33l6-10-6-10V1l72.188 14.438L961 23l-37.812 7.563L851 45Z"
      />
      <path
        className="fill-foreground"
        d="M851 45V33l6-10-6-10V1l110 22-110 22Z"
      />
      <path
        className="fill-surface-100"
        d="M851 1v12l49 10-49 10v12l110-22L851 1Z"
      />
      <path
        className="fill-subtle stroke-surface"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m961 23-36-7.2v14.4l36-7.2Z"
      />
      <path
        className="stroke-border"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth="2"
        d="M851 45V33l6-10-6-10V1l110 22-110 22Z"
      />
      <path
        className="fill-muted"
        d="M925 26.19v4.08L960.98 23l-10.1-2.04L925 26.19Z"
      />
      <path
        className="stroke-border"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m961 23-36-7.2v14.4l36-7.2Z"
      />
      <path
        className="fill-surface"
        d="M135 1v43.91L851 45l5-7-5-5 6-10-6-10 5-5-5-6.91L135 1Z"
      />
      <path className="fill-surface-150" d="M851 1H135v12h716l5-5-5-7Z" />
      <path className="fill-lowlight" d="M135 33v12h716l5-7-5-5H135Z" />
      <path
        className="fill-foreground"
        d="M851 33H135v-2h717.2l-1.2 2Zm1.2-18H135v-2h716l1.2 2Z"
      />
      <path className="fill-surface" d="M39 1v44h96V1H39Z" />
      <path
        className="fill-surface-150"
        d="M39 33v12h96V33H39Zm0-32v12h96V1H39Z"
      />
      <path
        className="fill-foreground"
        d="M39 31v2h96v-2H39Zm0-18v2h96v-2H39Z"
      />
      <path
        className="fill-surface-150"
        d="M118 1v44h4V1h-4Zm-8 0v44h4V1h-4ZM59 1v44h4V1h-4Zm-8 0v44h4V1h-4Z"
      />
      <path
        className="stroke-border"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M39 1v44h96V1H39Zm96 0v44h716l5-7-4.5-5 6-10-6.5-10 5-5-5-7H135Z"
      />
      <path
        className="stroke-border"
        strokeWidth="2"
        d="M5 45h34V1H5C2.79 1 1 2.79 1 5v36c0 2.21 1.79 4 4 4Z"
      />
    </svg>
  )
}
