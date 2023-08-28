import Medium from './medium'
import Small from './small'

const Card = ({ size, image, frontmatter }) => {
  return (
    <>
      {size === 'medium' && <Medium image={image} frontmatter={frontmatter} />}
      {size === 'small' && <Small image={image} frontmatter={frontmatter} />}
    </>
  )
}

export default Card
