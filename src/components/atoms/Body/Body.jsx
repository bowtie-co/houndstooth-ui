import React from 'react'
import { Col } from 'atoms'

const Body = ({ children }) => {
  return (
    <Col className='body-template' sm='10'>
      {children}
    </Col>
  )
}

export default Body
