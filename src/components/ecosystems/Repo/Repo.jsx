import React from 'react'
import { PublicRoute } from '../../atoms'
import { RepoList } from '../../organisms'

const Repo = ({ repoList }) => {
  return (
    <div className='demo-template'>
      <PublicRoute
        props={{ repoList }}
        path={'/:action(view)/repos'}
        component={RepoList}
      />
    </div>
  )
}

export default Repo
