import React from 'react'
import { Icon } from 'atoms'

const Darkmode = ({ isActive, toggle, cssStyles, isSupported }) => {
  if(!isSupported) {
    return null
  }

  return (
    <React.Fragment>
      <Icon className='nav-darkmode fas fa-adjust' color='white' size='md' onClick={() => toggle(!isActive)} />
      <style media={isActive ? 'screen' : 'none'}>
        {isActive ? cssStyles.trim() : cssStyles}
      </style>
    </React.Fragment>
  )
}

export default Darkmode