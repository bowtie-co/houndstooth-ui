import React from 'react'
import {
  PrivateRoute,
  Switch
} from '../../atoms'
import { RepoList } from '../../organisms'
import { Repo, Collections } from '..'

const Main = (props) => {
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
          path={'/:action(view)/:model(repos)/:username/:repo'}
          component={Repo}
        />
        <PrivateRoute
          props={props}
          path={`/:action(view|edit|create)/:model(collections)/:username/:repo`}
          component={Collections}
        />
      </Switch>
    </div>
  )
}

export default Main
