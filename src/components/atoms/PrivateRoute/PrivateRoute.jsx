import React from 'react'
import { Route } from 'react-router'
import PrivateComponentContainer from './PrivateComponentContainer'

const PrivateRoute = ({ props: passedProps, path, component, ...rest }) => {
  console.log('PrivateRoute props: ', passedProps)
  return (
    <Route
      {...rest}
      path={path}
      render={(routerProps) => <PrivateComponentContainer component={component} {...routerProps} {...passedProps} />}
    />
  )
}

export default PrivateRoute
