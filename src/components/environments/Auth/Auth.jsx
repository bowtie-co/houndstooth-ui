import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from 'atoms'

const Auth = (props) => {
  const { authCallback, authLogin, authLogout, authRedirect } = props
  return (
    <Switch>
      <PublicRoute
        path='/redirect'
        action={authRedirect}
      />
      <PublicRoute
        path='/callback'
        action={authCallback}
      />
      <PublicRoute
        path='/login'
        action={authLogin}
      />
      <PublicRoute
        path='/logout'
        action={authLogout}
      />
    </Switch>
  )
}

export default Auth
