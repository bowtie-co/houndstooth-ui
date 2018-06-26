import React from 'react'
import { AppContainer, AuthContainer } from '../../components/environments'
import { PublicRoute } from '../../components/atoms'
import { Switch } from 'react-router-dom'

const PublicRoutes = () => {
  return (
    <Switch>
      <PublicRoute
        path='/callback'
        component={AuthContainer}
      />
      <PublicRoute
        path='/'
        component={AppContainer}
      />
    </Switch>
  )
}

export default PublicRoutes
