import React from 'react'
import logoWhite from './bowtie_logo_white.png'
import logoBlack from './bowtie_logo.png'

const BowtieLogo = ({ color = 'white', size = 'md', className }) => {
  const logoSize = {
    sm: 'logo-sm',
    md: 'logo-md',
    lg: 'logo-lg'
  }

  return (
    <img src={color === 'white' ? logoWhite : logoBlack} className={`${logoSize[size]} ${className || ''}`} alt='logo' />
  )
}

export default BowtieLogo
