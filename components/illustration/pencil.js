export default function Pencil({
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
      <path className="fill-foreground" d="m51.912 74.54 7.07-7.072 7.072-1.414 1.414-7.071 7.071-7.071L91.51 91.51 51.913 74.54Z"/>
  <path className="fill-surface-100" d="m74.54 51.912-4.041 4.04 10.404 24.951-24.95-10.404-4.041 4.04L91.51 91.51 74.54 51.913Z"/>
  <path className="stroke-border" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m51.912 74.54 6.869-6.87 7.096-1.793 1.793-7.096 6.87-6.87L91.51 91.51 51.912 74.54Z"/>
  <path className="fill-subtle stroke-border" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m91.51 91.51-4.243-9.9-5.657 5.657 9.9 4.243Z"/>
  <path className="stroke-border" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m91.51 91.51-4.243-9.9-5.657 5.657 9.9 4.243Z"/>
  <path className="fill-surface" d="M15.142 37.77 37.77 15.142l36.77 36.77-1.415 5.657-4.95.707-2.121 7.778-7.778 2.121v4.243l-6.364 2.121-36.77-36.77Z"/>
  <path className="fill-surface-150" d="m32.113 20.799 5.657-5.657 36.77 36.77-1.415 5.656-3.535.708-37.477-37.477Z"/>
  <path className="fill-foreground" d="m31.406 22.92 1.414-1.414 36.77 36.77-2.023.806L31.406 22.92Z"/>
  <path className="fill-surface-150" d="m15.142 37.77 5.657-5.657 37.477 37.476v2.829l-6.364 2.121-36.77-36.77Z"/>
  <path className="fill-foreground" d="m20.8 32.112 1.413-1.414L59.69 68.175l-1.414 1.414-37.477-37.477Z"/>
  <path className="fill-surface-150" d="M5.243 27.87a6 6 0 0 1 0-8.485L19.385 5.243a6 6 0 0 1 8.485 0l9.9 9.9L15.142 37.77l-9.9-9.9Z"/>
  <path className="fill-lowlight" d="M5.243 27.87a6 6 0 0 1 0-8.485l1.414-1.414 14.142 14.142-5.657 5.657-9.9-9.9ZM17.97 6.657l1.415-1.414a6 6 0 0 1 8.485 0l9.9 9.9-5.657 5.656L17.97 6.657Z"/>
  <path className="fill-surface-100" d="m17.264 8.778 1.414-1.414 12.728 12.728-1.414 1.414zm-9.9 9.9 1.414-1.414 12.728 12.728-1.414 1.414z"/>
  <path className="stroke-border" strokeLinejoin="round" strokeWidth="2" d="M5.243 27.87a6 6 0 0 1 0-8.485L19.385 5.243a6 6 0 0 1 8.485 0l9.9 9.9L15.142 37.77l-9.9-9.9Z"/>
  <path className="stroke-border" strokeLinejoin="round" strokeWidth="2" d="M15.142 37.77 37.77 15.142l36.77 36.77-1.415 5.657-4.95.707-2.121 7.778-7.778 2.121v4.243l-6.364 2.121-36.77-36.77Z"/>
    </svg>
  )
}
