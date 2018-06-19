import React from 'react'
import { Link } from 'react-router-dom'
import { Button as ButtonRS } from 'reactstrap'

// import styles from './Button.scss'

const Button = ({ id, value, label, href, ...props }) => {
  const withLink = <Link to={href || ''}>
    <ButtonRS
      id={id}
      value={value}
      {...props}
    >
      {label}
    </ButtonRS>
  </Link>

  const button = <ButtonRS
    id={id}
    value={value}
    {...props}
  >
    {label}
  </ButtonRS>

  return href ? withLink : button
}

export default Button
