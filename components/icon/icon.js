import PropTypes from 'prop-types'

const Icon = ({ icon = 'folder', color = 'text-fern-1100', size = '24' }) => {
  return (
    <>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={color}>
        <use className={icon.toLowerCase()} xlinkHref={`#${icon.toLowerCase()}`} />
      </svg>
    </>
  )
}

Icon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
}

export default Icon
