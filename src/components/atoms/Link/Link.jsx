import React from 'react'
import { Link as LinkRR } from 'react-router-dom'

const Link = ({ to, children, className }) => {
  console.log('====================================')
  console.log('link className', className)
  console.log('====================================')
  return (
    <LinkRR className={`link ${className || ''}`} to={to || ''}>
      { children }
    </LinkRR>
  )
}

export default Link
