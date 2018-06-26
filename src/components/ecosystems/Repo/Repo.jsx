import React from 'react'
import { PublicRoute } from '../../atoms'
import { RepoItem } from '../../molecules'

const Repo = ({ repoList, setRepoList }) => {
  return (
    <div className='demo-template'>
      <PublicRoute
        props={{ repoList, setRepoList }}
        path={'/:action(view)/repos'}
        component={RepoItem}
      />
      {/* <Switch>
        <PublicRoute
          props={{ todo }}
          path={'/view/repos/:modelId'}
          component={Todo.Single}
        />
        <PublicRoute
          props={{ todo, formSubmit, modelName }}
          path={'/edit/repos/:modelId'}
          component={Todo.Form}
        />
        <PublicRoute
          props={{ todo, formSubmit }}
          path={'/create/repos/'}
          component={Todo.Form}
        />
      </Switch> */}
    </div>
  )
}

export default Repo
