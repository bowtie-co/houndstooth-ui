import React from 'react'
import {
  PrivateRoute,
  Switch
} from '../../atoms'
import { RepoList } from '../../organisms'
import { Repo } from '..'

const Main = (props) => {
  const { isMainLoading, setMainLoading, ...rest } = props
  return (
    <div className='demo-template'>
      <Switch>
        <PrivateRoute
          exact
          props={rest}
          path={'/repos'}
          component={RepoList}
        />
        <PrivateRoute
          props={rest}
          path={'/repos/:username/:repo'}
          onLeave={() => console.log('***************leaving this route***************')}
          component={Repo}
        />

      </Switch>
    </div>
  )
}

export default Main
