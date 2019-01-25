import React from 'react'
import { Nav as NavRS } from 'reactstrap'

const Nav = ({ children, className, ...rest }) => {
  return (
    <NavRS className={`nav-container ${className || ''}`} {...rest}>
      { children }
    </NavRS>
  )
}

export default Nav
