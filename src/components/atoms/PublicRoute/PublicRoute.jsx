import React from 'react'
import { Route } from 'react-router'

const PublicRoute = ({ props: passedProps, path, component: Component, ...rest }) => {
  console.log('PublicRoute props: ', passedProps)
  return (
    <Route
      {...rest}
      path={path}
      render={(routerProps) => <Component {...routerProps} {...passedProps} />}
    />
  )
}

export default PublicRoute
