import React from 'react'
import PropTypes from 'prop-types'

const Summary = ({ content }) => {
  return (
    <p className='summary'>{ content }...</p>
  )
}

Summary.propTypes = {
  content: PropTypes.string.isRequired
}

export default Summary
