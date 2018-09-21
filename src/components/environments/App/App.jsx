import React from 'react'
import { Redirect } from 'react-router-dom'
import { Main } from 'ecosystems'
import { Footer } from 'organisms'
import { Welcome } from 'molecules'
import {
  Switch,
  PublicRoute,
  PrivateRoute,
  Container
} from 'atoms'

const App = (props) => {
  return (
    <section className='app'>
      <Container fluid>
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
      </Container>
    </section>
  )
}

export default App
