import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute, Body } from '../../atoms'
import { Description, Demo } from '../../ecosystems'
import { Header, Footer } from '../../organisms'

const App = (props) => {
  const { auth } = props
  return (
    <section className='app'>
      <Header auth={auth} />
      <Body>
        <Switch>
          <PublicRoute
            props={props}
            path='/home'
            component={Description}
          />
          <PublicRoute
            path='/:action(view|edit|create)/:model(todos)/:modelId?/'
            // path={'/todos/'}
            component={Demo}
          />
        </Switch>
      </Body>
      <Footer />
    </section>
  )
}

export default App
