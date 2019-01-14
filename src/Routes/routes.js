import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer, AuthContainer } from 'environments'
import { Switch, PublicRoute } from 'atoms'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          path='/(callback|redirect|login|logout|welcome)'
          component={AuthContainer}
        />
        <PublicRoute
          path='/:username?/:repo?/:type?/:collection?'
          component={AppContainer}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
