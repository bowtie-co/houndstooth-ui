import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute, PrivateRoute, Body } from '../../atoms'
import { Description, Repo } from '../../ecosystems'
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
            path='/:action(view|edit|create)/:model(repos)/:username?/:repo?'
            component={Repo}
          />
        </Switch>
      </Body>
      <Footer />
    </section>
  )
}

export default App
