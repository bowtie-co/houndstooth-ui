import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from '../../atoms'
import { Description, Demo } from '../../ecosystems'
import { Header, Footer } from '../../organisms'

const App = (props) => {
  const { mapFeatures, ...rest } = props
  return (
    <section className='app'>
      <Header />
      <div className='body-template'>
        <Switch>
          <PublicRoute
            props={props}
            path='/home'
            component={Description}
          />
          <PublicRoute
            path='/demo'
            component={Demo}
          />
        </Switch>
      </div>
      <Footer />
    </section>
  )
}

export default App
