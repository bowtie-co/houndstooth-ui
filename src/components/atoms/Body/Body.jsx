import React from 'react'
import { Col } from 'atoms'

const Body = ({ children }) => {
  return (
    <Col className='body-template' sm='10' xs='auto'>
      {children}
    </Col>
  )
}

export default Body
