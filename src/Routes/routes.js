import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer, AuthContainer } from '../components/environments'
import { Switch, PublicRoute } from '../components/atoms'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          path='/(callback|login|logout)'
          component={AuthContainer}
        />
        <PublicRoute
          path='/'
          component={AppContainer}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
