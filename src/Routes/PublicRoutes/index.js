import React from 'react'
import auth from '../../lib/auth'
import { AppContainer, AuthContainer } from '../../components/environments'
import { PublicRoute } from '../../components/atoms'
import { Switch } from 'react-router-dom'

const PublicRoutes = () => {
  return (
    <Switch>
      <PublicRoute
        props={{ auth }}
        path='/callback'
        component={AuthContainer}
      />
      <PublicRoute
        props={{ auth }}
        path='/'
        component={AppContainer}
      />
    </Switch>
  )
}

export default PublicRoutes
