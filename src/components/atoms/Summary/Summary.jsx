import React from 'react'
import PropTypes from 'prop-types'

const Summary = ({ content, children }) => {
  return (
    <p className='summary'>{ content || children }...</p>
  )
}

Summary.propTypes = {
  content: PropTypes.string
}

export default Summary
