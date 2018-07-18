import React from 'react'
import { Route } from 'react-router'
import PrivateComponentContainer from './PrivateComponentContainer'
import PropTypes from 'prop-types'

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

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  props: PropTypes.object
}

export default PrivateRoute
