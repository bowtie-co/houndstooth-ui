import React from 'react'
import {
  BowtieLogo,
  HoundstoothLogo,
  Subtitle,
  Row,
  Col,
  Button
} from 'atoms'

const Welcome = () => {
  return (
    <section className='welcome-screen'>
      <Row className='flex-center'>
        <Col className='flex flex-center' sm='12'>
          <HoundstoothLogo />
        </Col>
        <Col className='flex flex-center' sm='12'>
          by <BowtieLogo color='black' />
        </Col>
        <Col className='flex flex-center' sm='12'>
          <Subtitle title={'Please log in.'} />
        </Col>
        <Col className='flex flex-center' sm='12'>
          <Button href={'/login'}>Log In</Button>
        </Col>
      </Row>
    </section>

  )
}

export default Welcome
