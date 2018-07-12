import React from 'react'
import {
  BowtieLogo,
  Title,
  Subtitle,
  Col,
  Button
} from '../../atoms'

const Welcome = () => {
  return (
    <Col>
      <div className='logo-container'>
        <BowtieLogo />
      </div>
      <Title title={'Welcome to Houndstooth!'} />
      <Subtitle title={'Please log in.'} />
      <Button href={'/login'}>Log In</Button>
    </Col>
  )
}

export default Welcome
