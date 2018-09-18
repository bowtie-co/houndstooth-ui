import React from 'react'
import { Col, Row, Container } from 'atoms'

const Body = ({ children }) => {
  return (
    <Container fluid>
      <Col className='body-template'>
        <Row>
          {children}
        </Row>
      </Col>
    </Container>
  )
}

export default Body
