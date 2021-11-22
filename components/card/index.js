import Medium from './Medium'
import Small from './Small'

const Card = ({ kind, frontmatter }) => {
  return (
    <>
      {kind === 'medium' && <Medium frontmatter={frontmatter} />}
      {kind === 'small' && <Small frontmatter={frontmatter} />}
    </>
  )
}

export default Card
