import React from 'react'
import { Link as LinkRR } from 'react-router-dom'
import { withTracking } from 'helpers'

const Link = ({ to, children, onClickButtonWithTracking, onClick, className, gaTrack = true, ...rest }) => {
  return (
    <LinkRR className={`link ${className || ''}`} to={to || ''} onClick={gaTrack ? onClickButtonWithTracking : onClick} {...rest}>
      {children}
    </LinkRR>
  )
}

export default withTracking(Link)
