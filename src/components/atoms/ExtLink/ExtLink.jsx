import React from 'react'
import { withTracking } from 'helpers'

const ExtLink = ({ children, href = '', onClickExtLinkWithTracking, onClick, gaTrack = true, ...rest }) => {
  const hrefHasProtocol = /((http||https):\/\/)/g.test(href)
  const sanitizedHref = hrefHasProtocol ? href : `//${href}`

  return (
    <a
      target='_blank'
      className='link'
      rel='noopener noreferrer'
      href={sanitizedHref}
      onClick={gaTrack ? onClickExtLinkWithTracking : onClick}
      {...rest}
    >
      {children}
    </a>
  )
}

export default withTracking(ExtLink)
