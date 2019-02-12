
import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Title, BackButton } from 'atoms'
import CommitChanges from './CommitChanges'

const emptyStateConditionFn = ({ stagedFiles }) => stagedFiles.length === 0
const noStagedFiles = ({ repo, history }) => (
  <div className='no-staged'>
    <Title>You have no staged files for {repo}.</Title>
    <BackButton size='sm' style={{ 'marginTop': '5px' }}>Go Back</BackButton>
  </div>
)
export default compose(
  withEither(emptyStateConditionFn, noStagedFiles),
  withStateHandlers({
    message: ''
  }, {
    setMessage: ({ message }) => (payload) => ({ message: payload })
  })
)(CommitChanges)
