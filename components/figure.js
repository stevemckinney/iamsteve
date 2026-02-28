import { FigureModal } from '@/components/figure-modal'

const figureComponents = {
  figure: (props) => <figure {...props} />,
  figcaption: (props) => (
    <figcaption
      className="text-body/60 font-mono text-base tracking-[-0.03em] leading-tight pt-2"
      {...props}
    />
  ),
  Figure: ({
    imageShadow,
    enlargeable,
    src,
    alt,
    className = '',
    ...props
  }) => {
    const figureClass =
      `${imageShadow ? '[&_img]:drop-shadow-image' : ''} ${className}`.trim() ||
      undefined
    if (enlargeable) {
      return (
        <FigureModal src={src} alt={alt} className="group/modal">
          <figure className={figureClass} {...props} />
        </FigureModal>
      )
    }
    return <figure className={figureClass} {...props} />
  },
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
  Figure: ({
    imageShadow,
    enlargeable,
    src,
    alt,
    className = '',
    ...props
  }) => {
    const figureClass = `my-4${
      imageShadow ? ' [&_img]:drop-shadow-image' : ''
    } ${className}`.trim()
    if (enlargeable) {
      return (
        <FigureModal src={src} alt={alt}>
          <figure className={figureClass} {...props} />
        </FigureModal>
      )
    }
    return <figure className={figureClass} {...props} />
  },
}

export { figureComponents, noteFigureComponents }
