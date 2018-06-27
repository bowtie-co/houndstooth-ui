import React from 'react'
import { Card } from '../../atoms'
import { RepoCard } from '../../molecules'

const RepoList = ({ repoList }) => {
  return (
    <Card>
      {
        repoList.map((repo, i) => <RepoCard repo={repo} key={i} />)
      }
    </Card>
  )
}

export default RepoList
