import React from 'react'
import { Card } from 'atoms'
import { RepoCard } from 'molecules'

const RepoList = ({ repoList, branch }) => {
  return (
    <Card>
      {
        repoList.map((repo, i) => <RepoCard repo={repo} key={i} branch={branch} />)
      }
    </Card>
  )
}

export default RepoList
