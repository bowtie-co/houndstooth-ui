import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const NavLink = ({ to, children, ...rest }) => {
  return (
    <Link className='nav-link' to={to} {...rest}>
      { children }
    </Link>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired
}

export default NavLink
