import React from 'react'
import {
  PublicRoute,
  Switch,
} from '../../atoms'
import { RepoList } from '../../organisms'
import { FileTree } from '..'

const Repo = ({ repoList, branch, setBranch }) => {
  return (
    <div className='demo-template'>
      <Switch>
        <PublicRoute
          exact
          props={{ repoList, branch }}
          path={'/:action(view)/repos'}
          component={RepoList}
        />
        <PublicRoute
          props={{ repoList }}
          path={'/:action(view)/repos/:username/:repo/'}
          component={FileTree}
        />
      </Switch>
    </div>
  )
}

export default Repo
