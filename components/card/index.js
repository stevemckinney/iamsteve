import Large from './large'
import Medium from './medium'
import Small from './small'

const Card = ({ size = 'medium', image, frontmatter, className }) => {
  return (
    <>
      {size === 'large' && (
        <Large image={image} frontmatter={frontmatter} className={className} />
      )}
      {size === 'medium' && (
        <Medium image={image} frontmatter={frontmatter} className={className} />
      )}
      {size === 'small' && (
        <Small image={image} frontmatter={frontmatter} className={className} />
      )}
    </>
  )
}

export default Card
