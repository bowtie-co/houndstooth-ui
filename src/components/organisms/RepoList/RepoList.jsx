import React from 'react'
import { Card } from '../../atoms'
import { RepoItem } from '../../molecules'

const RepoList = ({ repoList }) => {
  return (
    <Card>
      {
        repoList.map((repo, i) => <RepoItem repo={repo} key={i} />)
      }
    </Card>
  )
}

export default RepoList
