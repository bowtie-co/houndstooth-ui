import React from 'react'
import { Route } from 'react-router'

const PublicRoute = ({ props, path, component: Component }) => {
  console.log('Route props: ', props)
  return (
    <Route
      path={path}
      render={() => <Component {...props} />}
    />
  )
}

export default PublicRoute
