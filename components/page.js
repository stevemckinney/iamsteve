function Header({
  className = `max-md:frame max-md:frame-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 col-container md:col-content max-md:px-8 max-md:py-12`,
  children,
}) {
  return <header className={`${className}`}>{children}</header>
}

function Title({
  className = 'font-variation-bold lg:font-variation-extrabold text-3xl xs:text-5xl lg:text-7xl',
  children,
  ...props
}) {
  return (
    <h1
      className={`w-full text-heading font-display lowercase self-start min-w-0 min-h-0 ${className}`}
      {...props}
    >
      {children}
    </h1>
  )
}

function Description({ className = 'desc', children }) {
  return (
    <p
      className={`md:text-lg lg:text-xl text-ui-body sm:max-w-[34ch] ${className}`}
    >
      {children}
    </p>
  )
}

function Column({ className, children }) {
  return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>
}

export { Header, Title, Column, Description }
