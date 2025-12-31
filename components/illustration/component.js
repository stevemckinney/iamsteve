export default function Component({
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
      <path className="fill-surface-150 stroke-border" strokeLinejoin="round" strokeWidth="2" d="m16 1.858 5.657 5.657L16 13.172l-5.657-5.657zm-8.485 8.485L13.172 16l-5.657 5.657L1.858 16zm16.97 0L30.142 16l-5.657 5.657L18.828 16zM16 18.828l5.657 5.657L16 30.142l-5.657-5.657z"/>
  <path className="fill-foreground" d="M7.5 10.5 13 16H2l5.5-5.5Zm9-8.5L22 7.5H11L16.5 2Zm8 8.5L30 16H19l5.5-5.5Zm-9 8.5 5.5 5.5H10l5.5-5.5Z"/>
  <path className="stroke-border" strokeLinejoin="round" strokeWidth="2" d="m16 1.858 5.657 5.657L16 13.172l-5.657-5.657zm-8.485 8.485L13.172 16l-5.657 5.657L1.858 16zm16.97 0L30.142 16l-5.657 5.657L18.828 16zM16 18.828l5.657 5.657L16 30.142l-5.657-5.657z"/>
    </svg>
  )
}
