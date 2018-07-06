import React from 'react'
import { Brand } from '../../molecules'
import { NavLink, Login, Logout } from '../../atoms'

const Header = () => {
  return (
    <section className='top-nav-section' >
      <Brand title={'Houndstooth'} />
      <div className='nav-bar'>
        <NavLink to={'/home'}>Home</NavLink>
        <NavLink to={'/repos/'}>Repos</NavLink>
        <Login />
        <Logout />
      </div>
    </section>
  )
}

export default Header
