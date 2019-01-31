import React from 'react'
import { Logo } from 'atoms'
import logoWhite from './bowtie_logo_white.png'
import logoBlack from './bowtie_logo.png'

const BowtieLogo = ({ color = 'white', ...rest }) => {
  return (
    <Logo src={color === 'white' ? logoWhite : logoBlack} {...rest} />
  )
}

export default BowtieLogo
