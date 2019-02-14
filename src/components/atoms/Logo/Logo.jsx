import React from 'react'

const Logo = ({ size = 'md', src, className }) => {
  const logoSize = {
    sm: 'logo-sm',
    md: 'logo-md',
    lg: 'logo-lg'
  }

  return (
    <img src={src} className={`${logoSize[size]} ${className || ''}`} alt='logo' />
  )
}

export default Logo
