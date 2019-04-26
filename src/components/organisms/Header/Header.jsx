import React from 'react'
import { auth } from 'lib'
import { RepoSelect } from 'organisms'
import {
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
          <Icon className='nav-darkmode fas fa-adjust' color='white' size='md' 
           onClick={ () => {
            localStorage.setItem('viewMode', (localStorage.getItem('viewMode') || 'dark') === 'dark' ?
           'light' : 'dark'); 
            localStorage.getItem('viewMode') === 'dark' ?
            document.querySelector('.content-wrapper').classList.add('dark') :
            document.querySelector('.content-wrapper').classList.remove('dark');
          }
          } />
          <ExtLink href={currentUser['html_url']} className='nav-link'><Icon className='fab fa-github' color='white' size='md' /></ExtLink>
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
