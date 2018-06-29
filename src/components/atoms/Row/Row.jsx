import React from 'react'
import { Row as RowRS } from 'reactstrap'

const Row = ({ children, ...rest }) => {
  return (
    <RowRS {...rest} >
      { children }
    </RowRS>
  )
}

export default Row
