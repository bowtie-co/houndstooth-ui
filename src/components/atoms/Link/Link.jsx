import React from 'react'
import { Link as LinkRR } from 'react-router-dom'

const Link = ({ to, children, className }) => {
  return (
    <LinkRR className={`link ${className || ''}`} to={to || ''}>
      { children }
    </LinkRR>
  )
}

export default Link
