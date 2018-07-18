import React from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'

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

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  props: PropTypes.object
}

export default PublicRoute
