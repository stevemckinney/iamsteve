import { FigureModal } from '@/components/figure-modal'
import { Lightbox } from '@/components/lightbox'

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
    dialog,
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
      const Wrap = dialog ? Lightbox : FigureModal
      return (
        <Wrap src={src} alt={alt}>
          <figure className={figureClass} {...props} />
        </Wrap>
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

export { figureComponents }
