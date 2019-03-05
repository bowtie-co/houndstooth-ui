import React from 'react'
import { NavLink as NavLinkRS, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { withTracking } from 'helpers'

const NavLink = ({ path, title, children, onClickButtonWithTracking, onClick, gaTrack = true, ...rest }) => {
  return (
    <NavItem>
      <NavLinkRS tag={Link} to={path} onClick={gaTrack ? onClickButtonWithTracking : onClick} {...rest}>
        {title || children}
      </NavLinkRS>
    </NavItem>
  )
}

export default withTracking(NavLink)
