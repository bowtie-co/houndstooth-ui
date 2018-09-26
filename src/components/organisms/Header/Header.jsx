import React from 'react'
import { auth } from 'lib'
import { RepoSelect } from 'organisms'
import {
  NavLink,
  Login,
  Logout,
  Nav,
  Icon,
  HoundstoothLogo
} from 'atoms'

const Header = (props) => {
  return (
    <section className='flex-row top-nav-section'>
      <div className='flex' >
        <HoundstoothLogo color='white' />
      </div>
      <div sm='4' className='flex flex-center'>
        <RepoSelect {...props} />
      </div>
      <div className='flex-grow'>
        <Nav className='nav-bar'>
          <NavLink path={'/notifications/'}><Icon iconName='bell' color='white' size='md' /></NavLink>
          <NavLink path={'/settings/'}><Icon iconName='cog' color='white' size='md' /></NavLink>
          {
            auth.isAuthenticated()
              ? <Logout />
              : <Login />
          }
        </Nav>
      </div>
    </section>
  )
}

export default Header
