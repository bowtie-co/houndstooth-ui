import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from 'atoms'
import { Welcome } from 'molecules'
import {
  Notifications
} from 'ecosystems'
const Auth = (props) => {
  const { authCallback, authLogin, authLogout, authRedirect } = props
  return (
    <section className='app'>
      <Notifications />
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
        <PublicRoute
          path='/welcome'
          component={Welcome}
        />
      </Switch>
    </section>
  )
}

export default Auth
