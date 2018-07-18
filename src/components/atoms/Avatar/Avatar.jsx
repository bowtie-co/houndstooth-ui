import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ img }) => {
  return (
    <img className='avatar' src={img} alt='' />
  )
}

Avatar.propTypes = {
  img: PropTypes.string.isRequired
}

export default Avatar
