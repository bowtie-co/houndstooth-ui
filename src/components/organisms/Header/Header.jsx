import React from 'react'
import { Brand } from 'molecules'
import { auth } from 'lib'
import {
  NavLink,
  Login,
  Logout,
  Row,
  Nav
} from 'atoms'

const Header = () => {
  return (
    <section className='top-nav-section' >
      <Brand title={'Houndstooth'} />
      <Nav className='nav-bar'>
        <Row>
          <NavLink path={'/repos/'}>Repos</NavLink>
          {
            auth.isAuthenticated()
              ? <Logout />
              : <Login />
          }
        </Row>

      </Nav>
    </section>
  )
}

export default Header
