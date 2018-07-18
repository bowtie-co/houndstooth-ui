import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from 'atoms'
import AuthRedirect from './AuthRedirect'
import AuthCallback from './AuthCallback'
import AuthLogin from './AuthLogin'
import AuthLogout from './AuthLogout'

const Auth = (props) => {
  console.log('auth props', props)
  return (
    <Switch>
      <PublicRoute
        props={props}
        path='/redirect'
        component={AuthRedirect}
      />
      <PublicRoute
        props={props}
        path='/callback'
        component={AuthCallback}
      />
      <PublicRoute
        props={props}
        path='/login'
        component={AuthLogin}
      />
      <PublicRoute
        props={props}
        path='/logout'
        component={AuthLogout}
      />
    </Switch>
  )
}

export default Auth
