import React from 'react'
import PropTypes from 'prop-types'

const Subtitle = ({ title, children }) => {
  return (
    <h3 className='subtitle'>{ title || children }</h3>
  )
}

Subtitle.propTypes = {
  title: PropTypes.string
}

export default Subtitle
