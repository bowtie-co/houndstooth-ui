import React from 'react'
import PropTypes from 'prop-types'

const PrivateComponent = ({ component: Component, ...props }) => (
  <Component {...props} />
)

PrivateComponent.propTypes = {
  component: PropTypes.func.isRequired
}

export default PrivateComponent
