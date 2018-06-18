import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

// import styles from './Button.scss'

const Btn = ({ id, value, children, href, ...props }) => {
  const withLink = <Link to={href || ''}>
    <Button
      id={id}
      value={value}
      {...props}
    >
      {children}
    </Button>
  </Link>

  const button = <Button
    id={id}
    value={value}
    {...props}
  >
    {children}
  </Button>

  return href ? withLink : button
}

export default Btn
