import React from 'react'
import PropTypes from 'prop-types'
import {
  Tooltip
} from 'atoms'

const Icon = ({ className, size = 'xsmall', fill = true, iconName, color, id, tooltip, ...rest }) => {
  const sizes = {
    xsmall: '',
    small: 'lg',
    medium: '2x',
    large: '3x',
    xlarge: '4x',
    xxlarge: '5x'
  }

  const tooltipId = tooltip ? `Tooltip-${id || Date.now()}-${tooltip.split(' ').join('_')}` : id

  const faClass = className || `fa${fill ? 's' : 'r'} fa-${iconName}`
  return (
    <div className='fa-icon-sm pointer' {...rest}>
      <i className={`${faClass} fa-${sizes[size]}`} style={{ 'color': color }} id={tooltipId} />
      {
        tooltip &&
        <Tooltip target={tooltipId} {...rest}>
          {tooltip}
        </Tooltip>
      }
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
