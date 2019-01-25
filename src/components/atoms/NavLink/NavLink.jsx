import React from 'react'
import { NavLink as NavLinkRS, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const NavLink = ({ path, title, children, ...rest }) => {
  return (
    <NavItem>
      <NavLinkRS tag={Link} to={path} {...rest}>
        { title || children }
      </NavLinkRS>
    </NavItem>
  )
}

export default NavLink
