import React from 'react'
import { Redirect } from 'react-router-dom'
import { Switch, PublicRoute, PrivateRoute, Body } from 'atoms'
import { Main } from 'ecosystems'
import { Header, Footer } from 'organisms'
import { Welcome } from 'molecules'

const App = (props) => {
  return (
    <section className='app'>
      <Header />
      <Body>
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
      </Body>
      <Footer />
    </section>
  )
}

export default App
