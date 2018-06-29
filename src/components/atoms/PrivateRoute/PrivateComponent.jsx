import React from 'react'

const PrivateComponent = ({ component: Component, ...props }) => (
  <Component {...props} />
)

export default PrivateComponent
