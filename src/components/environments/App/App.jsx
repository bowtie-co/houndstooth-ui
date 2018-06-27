import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute, Body } from '../../atoms'
import { Description, Repo } from '../../ecosystems'
import { Header, Footer } from '../../organisms'
import PrivateRoute from '../../../Routes/PrivateRoutes/PrivateRoute'

const App = (props) => {
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
