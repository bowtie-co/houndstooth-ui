import React from 'react'
import { BowtieLogo, Icon } from 'atoms'

const Footer = (props) => {
  return (
    <section className='footer-section' >
      <BowtieLogo />
      <div className='copyright'>Copyright Bowtie <Icon iconName='copyright' fill={false} /> 2018</div>
    </section>
  )
}

export default Footer
