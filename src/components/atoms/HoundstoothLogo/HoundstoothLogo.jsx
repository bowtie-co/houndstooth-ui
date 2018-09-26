import React from 'react'
import logoBlack from './houndstooth_logo.png'
import logoWhite from './houndstooth_logo_white.png'

const HoundstoothLogo = ({ color = 'black' }) => {

  return (
    <img src={color === 'black' ? logoBlack : logoWhite} className='logo' alt='logo' />
  )
}

export default HoundstoothLogo
