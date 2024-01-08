export default function PageTitle({
  className = 'col-start-content-start col-end-content-end',
  children,
  ...props
}) {
  return (
    <h1
      className={`text-fern-1100 font-display text-3xl xs:text-5xl lg:text-7xl font-variation-bold lg:font-variation-extrabold lowercase ${className}`}
      {...props}
    >
      {children}
    </h1>
  )
}
