import React from 'react'
import { Redirect } from 'react-router-dom'
import { Main } from 'ecosystems'
import { Welcome } from 'molecules'
import {
  Switch,
  PublicRoute,
  PrivateRoute
} from 'atoms'

const App = (props) => {
  return (
    <section className='app'>
      <Switch>
        <PublicRoute
          props={props}
          path='/welcome'
          component={Welcome}
        />
        <PrivateRoute
          props={props}
          path='/:model(repos)/:username?/:repo?'
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
