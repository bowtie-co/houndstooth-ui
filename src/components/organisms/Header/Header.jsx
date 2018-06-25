import React from 'react'
import { Brand } from '../../molecules'
import { NavLink, Login } from '../../atoms'

const Header = ({ auth }) => {
  console.log("auth in Header", auth);
  return (
    <section className='top-nav-section' >
      <Brand title={'Houndstooth'} />
      <div className='nav-bar'>
        <NavLink path={'/home'} title={'Description'} />
        <NavLink path={'/view/todos/'} title={'Demo - todo app'} />
        <Login auth={auth}/>
      </div>
    </section>
  )
}

export default Header
