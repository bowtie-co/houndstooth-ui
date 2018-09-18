import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ className, size = 'xsmall', fill = true, iconName, color }) => {
  const sizes = {
    xsmall: '',
    small: 'lg',
    medium: '2x',
    large: '3x',
    xlarge: '4x',
    xxlarge: '5x'
  }

  const faClass = className || `fa${fill ? 's' : 'r'} fa-${iconName}`

  return (
    <div className='fa-icon-sm'>
      <i className={`${faClass} fa-${sizes[size]}`} style={{ 'color': color }} />
    </div>
  )
}

export default Icon

Icon.propTypes = {
  fill: PropTypes.bool,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  iconName: PropTypes.string,
  className: PropTypes.string
}
