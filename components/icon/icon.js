import PropTypes from 'prop-types'

const Icon = ({ icon = 'folder', className = 'text-fern-1100', size = 24 }) => {
  return (
    <>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
        <use className={icon.toLowerCase()} xlinkHref={`#${icon.toLowerCase()}`} />
      </svg>
    </>
  )
}

Icon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Icon
