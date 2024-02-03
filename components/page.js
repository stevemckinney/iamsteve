function Header({
  className = 'col-start-content-start col-end-content-end grid-cols-subgrid flex flex-col gap-4',
  children,
}) {
  return <div className={`${className}`}>{children}</div>
}

function Title({
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

function Description({
  className = 'lg:text-2xl text-ui-body max-w-[34ch]',
  children,
}) {
  return <p className={className}>{children}</p>
}

export { Header, Title, Description }
