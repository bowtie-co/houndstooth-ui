import React from 'react'
import { NavLink as NavLinkRS, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const NavLink = ({ path, title, children }) => {
  return (
    <NavItem>
      <NavLinkRS tag={Link} to={path}>
        { title || children}
      </NavLinkRS>
    </NavItem>
  )
}

export default NavLink
