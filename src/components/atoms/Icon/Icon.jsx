import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ className, size = 'xs', fill = true, iconName, color }) => {
  const sizes = {
    xs: '',
    sm: 'lg',
    md: '2x',
    lg: '3x',
    xl: '4x',
    xxl: '5x'
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
