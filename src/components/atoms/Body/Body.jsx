import React from 'react'
import { Container } from 'atoms'

const Body = ({ children }) => {
  return (
    <Container fluid>
      <div className='body-template'>
        {children}
      </div>
    </Container>
  )
}

export default Body
