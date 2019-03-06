import React from 'react'
import { Link } from 'react-router-dom'
import { withTracking } from 'helpers'
import { Button as ButtonRS } from 'reactstrap'
import PropTypes from 'prop-types'

const Button = ({ id, value, children, href, staticContext, onClickButtonWithTracking, onClick, gaTrack = true, ...rest }) => {
  const withLink = <Link to={href || ''}>
    <ButtonRS
      id={id}
      value={value}
      onClick={gaTrack ? onClickButtonWithTracking : onClick}
      {...rest}
    >
      {children}
    </ButtonRS>
  </Link>

  const button = <ButtonRS
    id={id}
    value={value}
    onClick={gaTrack ? onClickButtonWithTracking : onClick}
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

export default withTracking(Button)
