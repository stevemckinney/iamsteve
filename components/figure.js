import { FigureModal } from '@/components/figure-modal'

const Figcaption = (props) => (
  <figcaption
    className="text-body/60 font-mono text-base tracking-[-0.03em] leading-tight pt-2"
    {...props}
  />
)

const figureComponents = {
  figure: (props) => <figure {...props} />,
  figcaption: Figcaption,
  Figure: ({
    imageShadow,
    enlargeable,
    src,
    alt,
    className = '',
    ...props
  }) => {
    const figureClass =
      `${
        imageShadow ? '[&_img]:drop-shadow-image [&_img]:rounded-sm' : ''
      } ${className}`.trim() || undefined
    if (enlargeable) {
      return (
        <FigureModal src={src} alt={alt} className="group/modal">
          <figure className={figureClass} {...props} />
        </FigureModal>
      )
    }
    return <figure className={figureClass} {...props} />
  },
  Figcaption,
  Fig: (props) => (
    <span className="text-heading/40 uppercase">Fig. {props.children}</span>
  ),
}

export { figureComponents }
