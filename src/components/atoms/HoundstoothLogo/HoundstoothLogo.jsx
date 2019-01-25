import React from 'react'
import logoBlack from './houndstooth_logo.png'
import logoWhite from './houndstooth_logo_white.png'

const HoundstoothLogo = ({ color = 'black', size = 'md', className }) => {
  const logoSize = {
    sm: 'logo-sm',
    md: 'logo-md',
    lg: 'logo-lg'
  }

  return (
    <img src={color === 'black' ? logoBlack : logoWhite} className={`${logoSize[size]} ${className || ''}`} alt='logo' />
  )
}

export default HoundstoothLogo
