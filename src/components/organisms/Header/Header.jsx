import React from 'react'
import { Brand } from '../../molecules'
import { NavLink, Login } from '../../atoms'

const Header = () => {
  return (
    <section className='top-nav-section' >
      <Brand title={'Houndstooth'} />
      <div className='nav-bar'>
        <NavLink path={'/home'} title={'Description'} />
        <NavLink path={'/view/repos/'} title={'Repo - todo app'} />
        <Login />
      </div>
    </section>
  )
}

export default Header
