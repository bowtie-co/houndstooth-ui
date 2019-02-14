import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
  Tooltip
} from 'atoms'

const Icon = ({ className, size = 'xs', fill = true, iconName, color, id, tooltip, ...rest }) => {
  const sizes = {
    xs: '',
    sm: 'lg',
    md: '2x',
    l: '3x',
    xl: '4x',
    xxl: '5x'
  }

  const tooltipId = tooltip ? `Tooltip-${id || Date.now()}-${tooltip.split(' ').join('_')}` : id

  const faClass = className || `fa${fill ? 's' : 'r'} fa-${iconName}`
  return (
    <div className={classnames({ 'cursor-pointer': rest['onClick'] }, 'fa-icon-sm')} {...rest}>
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
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'l', 'xl', 'xxl']),
  iconName: PropTypes.string,
  className: PropTypes.string
}
