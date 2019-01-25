import React from 'react'
import { ExtLink, Icon } from '..'

const SocialLink = ({ socialMedia, href }) => {
  return (
    <ExtLink className='social-link' href={href}>
      <Icon className={`fab fa-${socialMedia}`} />
    </ExtLink>
  )
}

export default SocialLink
