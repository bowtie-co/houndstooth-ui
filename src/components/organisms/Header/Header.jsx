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
  ExtLink
} from 'atoms'
import {
  HoundstoothLogo
} from 'molecules'

const Header = (props) => {
  return (
    <section className='flex-row top-nav-section'>
      <Link to={'/'} className='flex'>
        <HoundstoothLogo color='white' />
      </Link>
      <div sm='4' className='flex flex-center'>
        <RepoSelect {...props} />
      </div>
      <div className='flex-grow'>
        <Nav className='nav-bar'>
          <NavLink to=''>
            <ExtLink href='www.github.com' className='nav-link'><Icon className='fab fa-github' color='white' size='md' /></ExtLink>
          </NavLink>
          {/* <NavLink path={'/settings/'}><Icon iconName='cog' color='white' size='sm' /></NavLink> */}
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
