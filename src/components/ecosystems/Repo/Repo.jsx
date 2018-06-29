import React from 'react'
import {
  PrivateRoute,
  Switch
} from '../../atoms'
import { RepoList } from '../../organisms'
import { FileTree } from '..'

const Repo = (props) => {
  return (
    <div className='demo-template'>
      <Switch>
        <PrivateRoute
          exact
          props={props}
          path={'/:action(view)/repos'}
          component={RepoList}
        />
        <PrivateRoute
          props={props}
          path={'/:action(view)/repos/:username/:repo/'}
          component={FileTree}
        />
      </Switch>
    </div>
  )
}

export default Repo
