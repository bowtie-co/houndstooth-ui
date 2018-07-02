import React from 'react'
import { Redirect } from 'react-router-dom'
import { Switch, PublicRoute, PrivateRoute, Body } from '../../atoms'
import { Description, Main } from '../../ecosystems'
import { Header, Footer } from '../../organisms'

const App = (props) => {
  console.log('app props', props)
  return (
    <section className='app'>
      <Header />
      <Body>
        <Switch>
          <PublicRoute
            props={props}
            path='/home'
            component={Description}
          />
          <PrivateRoute
            props={props}
            path='/:action(view|edit|create)/:model(repos)/:username?/:repo?/:type?'
            component={Main}
          />
          <PublicRoute
            props={{ to: '/home' }}
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
