import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Subtitle,
  Summary
} from 'atoms'
import { LastUpdated } from 'molecules'

const RepoCard = ({ repo }) => {
  return (
    <Link to={{ pathname: `/repos/${repo.full_name}/collections`, search: `?ref=${repo.default_branch}` }} className='list-item' >
      <div className='repoNameWrapper'>
        <Subtitle title={repo.name} />
        <Subtitle title={repo.private ? 'private' : 'public'} />
      </div>
      <div className='ownerWrapper'>
        <Avatar img={repo.owner.avatar_url} />
        <Subtitle title={repo.owner.login} />
      </div>
      <LastUpdated time={repo.updated_at} />
      <Summary content={`Description: ${repo.description || 'N/A'}`} />
    </Link >
  )
}

RepoCard.propTypes = {
  repo: PropTypes.object
}

export default RepoCard
