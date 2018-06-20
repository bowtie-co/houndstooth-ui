import React from 'react'
import { Route } from 'react-router'

const PublicRoute = ({ props: passedProps, path, component: Component }) => {
  console.log('Route props: ', passedProps)
  return (
    <Route
      path={path}
      render={(routerProps) => <Component {...routerProps} {...passedProps} />}
    />
  )
}

export default PublicRoute
