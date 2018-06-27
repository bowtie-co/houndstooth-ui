import React from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Subtitle,
  Summary
} from '../../atoms'
import { LastUpdated } from '../../molecules'

const RepoCard = ({ repo }) => {
  return (
    <Link to={`${repo.owner.login}/${repo.name}/dir`} className='list-item' >
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

export default RepoCard
