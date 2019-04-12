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
  const { currentUser } = props
  return (
    <section className='flex-row top-nav-section'>
      <Link to={'/'} className='flex align-center'>
        <HoundstoothLogo color='white' />
      </Link>
      <div sm='4' className='flex flex-center'>
        <RepoSelect {...props} />
      </div>
      <div className='flex-grow'>
        <Nav className='nav-bar'>
          <ExtLink href={currentUser['html_url']} className='nav-link'><Icon className='fab fa-github' color='white' size='md' /></ExtLink>
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
