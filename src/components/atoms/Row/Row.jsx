import React from 'react'
import { Row as RowRS } from 'reactstrap'

const Row = ({ children, flex = true, className, ...rest }) => {
  return (
    <RowRS className={`${flex ? 'dflex' : ''} ${className}`} {...rest} >
      { children }
    </RowRS>
  )
}

export default Row
