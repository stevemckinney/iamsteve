export default function Pen({
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
      <path className="fill-foreground" fillRule="evenodd" d="M6.678 13.749 27.184 69.61S46.9 66.7 58.297 78.096l19.799-19.8C66.7 46.902 69.61 27.185 69.61 27.185L13.75 6.678l-2.122 2.121 30.647 30.647a6 6 0 1 1-2.828 2.828L8.799 11.628 6.678 13.75Z" clipRule="evenodd"/>
  <path className="fill-surface-100" d="M27.184 69.61S46.9 66.7 58.297 78.096l19.799-19.8C66.7 46.901 69.61 27.185 69.61 27.185l-8.485-2.829 2.216 21.425c1.045 10.1-7.461 18.606-17.561 17.561l-21.425-2.216 2.829 8.485Z"/>
  <path className="stroke-border" strokeLinejoin="round" strokeWidth="2" d="M6.678 13.749 27.184 69.61S46.9 66.7 58.297 78.096l19.799-19.8C66.7 46.902 69.61 27.185 69.61 27.185L13.75 6.678l-2.122 2.121 30.647 30.647a6 6 0 1 1-2.828 2.828L8.799 11.628 6.678 13.75Z"/>
  <rect width="34" height="16" x="56.175" y="80.217" className="fill-lowlight" rx="2" transform="rotate(-45 56.175 80.217)"/>
  <path className="fill-surface-150" d="m60.418 75.974 1.414-1.414 11.314 11.313-1.414 1.415zM74.56 61.832l1.414-1.414L87.288 71.73l-1.414 1.415z"/>
  <path className="fill-subtle" d="m56.175 80.217 4.243-4.243L71.73 87.288l-4.242 4.243zm19.799-19.799 4.243-4.243L91.53 67.49l-4.242 4.243z"/>
  <rect width="34" height="16" x="56.175" y="80.217" className="stroke-border" strokeLinejoin="round" strokeWidth="2" rx="2" transform="rotate(-45 56.175 80.217)"/>
    </svg>
  )
}
