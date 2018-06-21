import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute, Body } from '../../atoms'
import { Description, Demo } from '../../ecosystems'
import { Header, Footer } from '../../organisms'

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
          <PublicRoute
            path='/todos/'
            component={Demo}
          />
        </Switch>
      </Body>
      <Footer />
    </section>
  )
}

export default App
