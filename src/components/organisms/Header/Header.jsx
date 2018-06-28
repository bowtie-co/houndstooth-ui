import React from 'react'
import { Brand } from '../../molecules'
import { NavLink, Login } from '../../atoms'

const Header = () => {
  return (
    <section className='top-nav-section' >
      <Brand title={'Houndstooth'} />
      <div className='nav-bar'>
        <NavLink to={'/home'}>Description</NavLink>
        <NavLink to={'/view/repos/'}>Repo - todo app</NavLink>
        <Login />
      </div>
    </section>
  )
}

export default Header
