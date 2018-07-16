import React from 'react'
import PropTypes from 'prop-types'

const Subtitle = ({ title }) => {
  return (
    <h3 className='subtitle'>{ title }</h3>
  )
}

Subtitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default Subtitle
