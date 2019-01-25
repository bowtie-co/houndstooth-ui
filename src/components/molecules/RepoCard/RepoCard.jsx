import React from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Summary,
  Card,
  Link
} from 'atoms'
import { LastUpdated } from 'molecules'
import {
  CardTitle,
  CardBody
} from 'reactstrap'

const RepoCard = ({ repo }) => {
  return (

    <Link to={{ pathname: `/${repo.full_name}/collections`, search: `?ref=${repo.default_branch}` }} className='list-item'>
      <Card className='repo-card'>
        <CardTitle>{repo.name}</CardTitle>
        <CardBody>
          <div className='flex-row align-center'>
            <Avatar img={repo.owner.avatar_url} />
            <div className='repo-name'>{repo.owner.login}</div>
          </div>
          <Summary>
            <div className='truncate-multi'>{repo.description || 'N/A'}</div>
          </Summary>
          <LastUpdated time={repo.updated_at} />
        </CardBody>
      </Card>
    </Link >
  )
}

RepoCard.propTypes = {
  repo: PropTypes.object
}

export default RepoCard
