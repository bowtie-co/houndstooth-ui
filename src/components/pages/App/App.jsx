import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from '../../atoms'
import { Home, Demo } from '../../templates'
import { TopNav } from '../../organisms'

const App = (props) => {
  const { mapFeatures, ...rest } = props
  return (
    <div className='app'>
      <TopNav />
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
  )
}

export default App
