import React from 'react'
import { auth } from 'lib'
import { RepoSelect } from 'organisms'
import {
  NavLink,
  Link,
  Login,
  Logout,
  Nav,
  Icon,
  HoundstoothLogo
} from 'atoms'

const Header = (props) => {
  return (
    <section className='flex-row top-nav-section'>
      <Link to={'/repos'} className='flex'>
        <HoundstoothLogo color='white' />
      </Link>
      <div sm='4' className='flex flex-center'>
        <RepoSelect {...props} />
      </div>
      <div className='flex-grow'>
        <Nav className='nav-bar'>
          <NavLink path={'/notifications/'}><Icon iconName='bell' color='white' size='sm' /></NavLink>
          <NavLink path={'/settings/'}><Icon iconName='cog' color='white' size='sm' /></NavLink>
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
