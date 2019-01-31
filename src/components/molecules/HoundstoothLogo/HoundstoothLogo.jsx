import React from 'react'
import logoBlack from './houndstooth_logo.png'
import logoWhite from './houndstooth_logo_white.png'
import { Logo } from 'atoms'

const HoundstoothLogo = ({ color = 'black', ...rest }) => {
  return (
    <Logo src={color === 'white' ? logoWhite : logoBlack} {...rest} />
  )
}

export default HoundstoothLogo
