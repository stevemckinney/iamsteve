const figureComponents = {
  figure: (props) => <figure {...props} />,
  figcaption: (props) => (
    <figcaption
      className="text-body/60 font-mono text-base tracking-[-0.03em] leading-tight pt-2"
      {...props}
    />
  ),
  Figure: ({ imageShadow, className = '', ...props }) => (
    <figure
      className={
        `${
          imageShadow ? '[&_img]:drop-shadow-image' : ''
        } ${className}`.trim() || undefined
      }
      {...props}
    />
  ),
  Figcaption: (props) => (
    <figcaption
      className="text-body/60 font-mono text-base tracking-[-0.03em] leading-tight pt-2"
      {...props}
    />
  ),
  Fig: (props) => (
    <span className="text-heading/40 uppercase">Fig. {props.children}</span>
  ),
}

const noteFigureComponents = {
  ...figureComponents,
  figure: (props) => <figure className="my-4" {...props} />,
  Figure: ({ imageShadow, className = '', ...props }) => (
    <figure
      className={`my-4${
        imageShadow ? ' [&_img]:drop-shadow-image' : ''
      } ${className}`.trim()}
      {...props}
    />
  ),
}

export { figureComponents, noteFigureComponents }
