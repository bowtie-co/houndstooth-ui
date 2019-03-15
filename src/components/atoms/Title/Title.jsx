import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ title, children, className = '' }) => {
  return (
    <h1 className={`title break-word ${className}`}>{ title || children }</h1>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title
