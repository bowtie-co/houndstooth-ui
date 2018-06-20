import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = ({ path, title }) => {
  return (
    <Link className='nav-link' to={path}>
      { title }
    </Link>
  )
}

export default NavLink
