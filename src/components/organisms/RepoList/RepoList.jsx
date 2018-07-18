import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'atoms'
import { RepoCard } from 'molecules'

const RepoList = ({ repoList }) => {
  return (
    <Card>
      {
        repoList.map((repo, i) => <RepoCard repo={repo} key={i} />)
      }
    </Card>
  )
}

RepoList.propTypes = {
  repoList: PropTypes.array
}

export default RepoList
