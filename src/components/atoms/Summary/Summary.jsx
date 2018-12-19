import React from 'react'
import PropTypes from 'prop-types'

const Summary = ({ content, children }) => {
  return (
    <div className='summary'>{ content || children }</div>
  )
}

Summary.propTypes = {
  content: PropTypes.string
}

export default Summary
