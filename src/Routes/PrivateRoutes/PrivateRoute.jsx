import React from 'react'
import { Route } from 'react-router-dom'
import PrivateComponentContainer from './PrivateComponentContainer'

export default ({ component, roles, ...props }) => {
  return <Route {...props} render={(props) => {
    return <PrivateComponentContainer component={component} roles={roles} {...props} />
  }} />
}
