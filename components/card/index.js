import Container from './container'
import Large from './large'
import Medium from './medium'
import Small from './small'

const Card = ({
  size = 'medium',
  image,
  frontmatter,
  className,
  priority = false,
}) => {
  return (
    <>
      {size === 'container' && (
        <Container
          image={image}
          frontmatter={frontmatter}
          className={className}
          priority={priority}
        />
      )}
      {size === 'large' && (
        <Large
          image={image}
          frontmatter={frontmatter}
          className={className}
          priority={priority}
        />
      )}
      {size === 'medium' && (
        <Medium
          image={image}
          frontmatter={frontmatter}
          className={className}
          priority={priority}
        />
      )}
      {size === 'small' && (
        <Small image={image} frontmatter={frontmatter} className={className} />
      )}
    </>
  )
}

export default Card
