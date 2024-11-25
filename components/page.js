function Header({
  className = `max-sm:frame max-sm:frame-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 col-start-content-start col-end-content-end max-sm:px-8 max-sm:py-12`,
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
      className={`w-full max-sm:text-center text-fern-1100 font-display lowercase self-start min-w-0 min-h-0 ${className}`}
      {...props}
    >
      {children}
    </h1>
  )
}

function Description({ className = 'd', children }) {
  return (
    <p
      className={`max-sm:text-center md:text-lg lg:text-xl text-ui-body sm:max-w-[34ch] ${className}`}
    >
      {children}
    </p>
  )
}

function Column({ className, children }) {
  return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>
}

export { Header, Title, Column, Description }
