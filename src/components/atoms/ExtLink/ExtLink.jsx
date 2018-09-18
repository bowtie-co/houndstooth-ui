import React from 'react'

const ExtLink = ({ children, ...props }) => {
  return (
    <a {...props} target='_blank'>
      {children}
    </a>
  )
}

export default ExtLink
