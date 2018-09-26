import React from 'react'
import { auth } from 'lib'
import { RepoSelect } from 'organisms'
import {
  NavLink,
  Login,
  Logout,
  Row,
  Col,
  Nav,
  Icon,
  HoundstoothLogo
} from 'atoms'

const Header = (props) => {
  return (
    <Row className='top-nav-section'>
      <Col className='flex' sm='2'>
        <HoundstoothLogo color='white' />
      </Col>
      <Col sm='4' className='align-end'>
        <RepoSelect {...props} />
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
  )
}

export default Header
