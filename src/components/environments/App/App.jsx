import React from 'react'
import { Redirect } from 'react-router-dom'
import { Main, Notifications } from 'ecosystems'
import { Welcome } from 'molecules'
import {
  Switch,
  PublicRoute,
  PrivateRoute
} from 'atoms'

const App = (props) => {
  return (
    <section className='app'>
      <Notifications />

      <Switch>
        <PublicRoute
          props={props}
          path='/welcome'
          component={Welcome}
        />
        <PrivateRoute
          props={props}
          path='/:model(repos)/:username?/:repo?/:type?/:collection?'
          component={Main}
        />
        <PublicRoute
          props={{ to: '/welcome' }}
          path='/'
          component={Redirect}
        />
      </Switch>
    </section>
  )
}

export default App
