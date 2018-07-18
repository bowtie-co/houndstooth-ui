import React from 'react'
import { Link } from 'react-router-dom'
import { Button as ButtonRS } from 'reactstrap'
import PropTypes from 'prop-types'

const Button = ({ id, value, children, href, staticContext, ...rest }) => {
  const withLink = <Link to={href || ''}>
    <ButtonRS
      id={id}
      value={value}
      {...rest}
    >
      {children}
    </ButtonRS>
  </Link>

  const button = <ButtonRS
    id={id}
    value={value}
    {...rest}
  >
    {children}
  </ButtonRS>

  return href ? withLink : button
}

Button.propTypes = {
  id: PropTypes.string,
  href: PropTypes.string
}

export default Button
