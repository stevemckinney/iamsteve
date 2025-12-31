export default function PageTitle({
  className = 'col-start-content-start col-end-content-end',
  children,
  ...props
}) {
  return (
    <h1
      className={`text-heading text-balance font-display text-3xl xs:text-5xl md:text-6xl lg:text-7xl font-variation-bold lg:font-variation-extrabold lowercase ${className}`}
      {...props}
    >
      {children}
    </h1>
  )
}
