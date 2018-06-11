import React from 'react'
import { Route } from 'react-router-dom'
import PrivateComponentContainer from './PrivateComponentContainer'

export default ({ component, roles, ...rest }) => {
  return <Route {...rest} render={(props) => {
    return <PrivateComponentContainer component={component} roles={roles} {...props} />
  }} />
}
