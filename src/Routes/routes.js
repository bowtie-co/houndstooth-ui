import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer, AuthContainer } from 'environments'
import { Switch, PublicRoute } from 'atoms'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          path='/(callback|redirect|login|logout)'
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
