import React from 'react'
import { Brand } from 'molecules'
import { NavLink, Login, Logout } from 'atoms'
import { auth } from 'lib'

const Header = () => {
  return (
    <section className='top-nav-section' >
      <Brand title={'Houndstooth'} />
      <div className='nav-bar'>
        <NavLink to={'/repos/'}>Repos</NavLink>
        {
          auth.isAuthenticated()
            ? <Logout />
            : <Login />
        }
      </div>
    </section>
  )
}

export default Header
