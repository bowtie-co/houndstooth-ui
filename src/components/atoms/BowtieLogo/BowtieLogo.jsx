import React from 'react'
import logoWhite from './bowtie_logo_white.png'
import logoBlack from './bowtie_logo.png'

const BowtieLogo = ({ color = 'white' }) => {
  return (
    <img src={color === 'white' ? logoWhite : logoBlack} className='logo' alt='logo' />
  )
}

export default BowtieLogo
