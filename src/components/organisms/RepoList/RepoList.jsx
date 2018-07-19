import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'atoms'
import { RepoCard } from 'molecules'

const RepoList = ({ repoList, nextPage }) => {
  return (
    <Card>
      <Button onClick={nextPage} >Next</Button>
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
