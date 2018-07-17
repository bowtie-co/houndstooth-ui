import React from 'react'
import PropTypes from 'prop-types'
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

RepoList.propTypes = {
  branch: PropTypes.string,
  repoList: PropTypes.array
}

export default RepoList
