import React from 'react'
import { auth } from 'lib'
import {
  NavLink,
  Login,
  Logout,
  Row,
  Col,
  Nav,
  Icon,
  BowtieLogo
} from 'atoms'

const Header = () => {
  return (
    <section className='top-nav-section' >
      <Row>
        <Col sm='1'>
          <BowtieLogo />
        </Col>
        <Col>
          [ Project Control here ]
        </Col>
        <Col sm='6'>
          <Nav className='nav-bar'>
            <NavLink path={'/notifications/'}><Icon iconName='bell' color='white' size='md' /></NavLink>
            <NavLink path={'/settings/'}><Icon iconName='cog' color='white' size='md' /></NavLink>
            {
              auth.isAuthenticated()
                ? <Logout />
                : <Login />
            }
          </Nav>
        </Col>
      </Row>

    </section>
  )
}

export default Header
