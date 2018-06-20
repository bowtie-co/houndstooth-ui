import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from '../../atoms'
import { Home, Demo } from '../../templates'
import { TopNav, Footer } from '../../organisms'

const App = (props) => {
  const { mapFeatures, ...rest } = props
  return (
    <section className='app'>
      <TopNav />

      <div className='body-template'>
        <Switch>
          <PublicRoute
            props={props}
            path='/home'
            component={Home}
          />
          <PublicRoute
            props={{ mapFeatures, ...rest }}
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
