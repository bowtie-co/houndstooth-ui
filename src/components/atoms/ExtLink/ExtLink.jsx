import React from 'react'

const ExtLink = ({ children, href = '', ...rest }) => {
  const hrefHasProtocol = /((http||https):\/\/)/g.test(href)
  const sanitizedHref = hrefHasProtocol ? href : `//${href}`

  return (
    <a {...rest} href={sanitizedHref} target='_blank' className='link'>
      {children}
    </a>
  )
}

export default ExtLink
