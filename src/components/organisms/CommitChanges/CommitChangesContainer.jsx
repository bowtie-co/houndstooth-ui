
import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { Title } from 'atoms'
import CommitChanges from './CommitChanges'

const emptyStateConditionFn = ({ stagedFiles }) => stagedFiles.length === 0
const noStagedFiles = ({ repo }) => <Title>You have no staged files for {repo}.</Title>

export default compose(
  withEither(emptyStateConditionFn, noStagedFiles),
  withStateHandlers({
    message: ''
  }, {
    setMessage: ({ message }) => (payload) => ({ message: payload })
  })
)(CommitChanges)
