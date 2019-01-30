import React from 'react'
import { Icon } from 'atoms'
import { BowtieLogo } from 'molecules'

const Footer = (props) => {
  return (
    <section className='footer-section' >
      <BowtieLogo />
      <div className='copyright'>Copyright Bowtie <Icon iconName='copyright' fill={false} /> 2018</div>
    </section>
  )
}

export default Footer
