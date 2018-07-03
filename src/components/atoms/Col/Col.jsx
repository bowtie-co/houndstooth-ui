import React from 'react'
import { Col as ColRS } from 'reactstrap'

const Col = ({ children, ...rest }) => {
  return (
    <ColRS className={'column'} {...rest}>
      { children }
    </ColRS>
  )
}

export default Col
