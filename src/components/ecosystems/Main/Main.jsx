import React from 'react'
import {
  PrivateRoute,
  Switch
} from '../../atoms'
import { RepoList } from '../../organisms'
import { Repo } from '..'

const Main = (props) => {
  return (
    <div className='demo-template'>
      <Switch>
        <PrivateRoute
          exact
          props={props}
          path={'/repos'}
          component={RepoList}
        />
        <PrivateRoute
          props={props}
          path={'/repos/:username/:repo'}
          component={Repo}
        />

      </Switch>
    </div>
  )
}

export default Main
