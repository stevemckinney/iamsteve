function Header({ className, children }) {
  return (
    <div
      className={`max-sm:frame max-sm:frame-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 col-start-content-start col-end-content-end max-sm:px-8 max-sm:py-12 ${className}`}
    >
      {children}
    </div>
  )
}

function Title({ className = 't', children, ...props }) {
  return (
    <h1
      className={`w-full max-sm:text-center text-fern-1100 font-display text-3xl xs:text-5xl lg:text-7xl font-variation-bold lg:font-variation-extrabold lowercase self-start min-w-[0] min-h-[0] ${className}`}
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
