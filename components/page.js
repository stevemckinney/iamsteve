function Header({ className, children }) {
  return (
    <div
      className={`grid grid-flow-dense grid-cols-2 gap-y-4 gap-x-8 col-start-content-start col-end-content-end ${className}`}
    >
      {children}
    </div>
  )
}

function Title({ className = 't', children, ...props }) {
  return (
    <h1
      className={`text-fern-1100 font-display text-3xl xs:text-5xl lg:text-7xl font-variation-bold lg:font-variation-extrabold lowercase self-start min-w-[0] min-h-[0] ${className}`}
      {...props}
    >
      {children}
    </h1>
  )
}

function Description({ className = 'd', children }) {
  return (
    <p className={`lg:text-2xl text-ui-body max-w-[34ch] ${className}`}>
      {children}
    </p>
  )
}

function Column({ className, children }) {
  return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>
}

export { Header, Title, Column, Description }
