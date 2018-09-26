import React from 'react'
// import PropTypes from 'prop-types'
import { Tooltip as TooltipRS } from 'reactstrap'

const Tooltip = ({ tooltipOpen, placement = 'bottom', toggleToolTip, target, children, ...rest }) => {
  return (
    <TooltipRS
      delay={{ show: 250, hide: 0 }}
      isOpen={tooltipOpen}
      placement={placement}
      target={target}
      autohide
      toggle={toggleToolTip}>
      { children }
    </TooltipRS>
  )
}

export default Tooltip

Tooltip.propTypes = {
  // fill: PropTypes.bool,
  // size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  // iconName: PropTypes.string,
  // className: PropTypes.string
}
