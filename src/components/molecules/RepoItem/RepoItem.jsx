import React from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Subtitle,
  TimeFromNow,
  Summary
} from '../../atoms'

const RepoItem = ({ repo }) => {
  return (
    <Link to={`/repos/${repo.owner.login}/${repo.name}/dir`} className='list-item' >
      <div className='repoNameWrapper'>
        <Subtitle title={repo.name} />
        <Subtitle title={repo.private ? 'private' : 'public'} />
      </div>
      <div className='ownerWrapper'>
        <Avatar img={repo.owner.avatar_url} />
        <Subtitle title={repo.owner.login} />
      </div>
      <p>last updated: <TimeFromNow time={repo.updated_at} /> </p>
      <p>Description: <Summary content={repo.description || 'N/A'} /></p>
    </Link >
  )
}

export default RepoItem
