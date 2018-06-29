import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = ({ to, children, ...rest }) => {
  return (
    <Link className='nav-link' to={to} {...rest}>
      { children }
    </Link>
  )
}

export default NavLink
