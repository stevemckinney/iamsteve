export default function Cursor({
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
      <path className="fill-surface-100" d="m1 1 11 30 5-14 14-6.4L1 1Z"/>
  <path className="stroke-foreground" strokeLinecap="square" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M27.25 11.5 2.875 3.7"/>
  <path className="fill-lowlight" d="m10.2 27.2 4-11.2c.4-1.2 1.6-2 2.8-2h1c.8 0 1.5.7 1.5 1.5S18.8 17 18 17h-1l-4 11.2c-.3.8-1.1 1.2-1.9.9-.8-.2-1.2-1.1-.9-1.9Z"/>
  <path className="stroke-border" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="m1 1 11 30 5-14 14-6.4L1 1Z"/>
    </svg>
  )
}
