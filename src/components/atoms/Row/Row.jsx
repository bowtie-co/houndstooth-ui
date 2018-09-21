import React from 'react'
import { Row as RowRS } from 'reactstrap'
import PropTypes from 'prop-types'

const Row = ({ children, flex = true, className, ...rest }) => {
  return (
    <RowRS className={`${flex ? 'dflex' : ''} ${className || ''}`} {...rest} >
      { children }
    </RowRS>
  )
}

Row.propTypes = {
  flex: PropTypes.bool,
  className: PropTypes.string
}

export default Row
