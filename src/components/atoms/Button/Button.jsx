import React from 'react'
import { Link } from 'react-router-dom'
import { Button as ButtonRS } from 'reactstrap'

const Button = ({ id, value, children, href, ...rest }) => {
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

export default Button
