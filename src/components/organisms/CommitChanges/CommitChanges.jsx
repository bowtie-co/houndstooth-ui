import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Col,
  Button,
  Title,
  Icon
} from 'atoms'

const CommitChanges = (props) => {
  const { stagedFiles, repo, message, setMessage, pushToGithub, removeStagedFile } = props
  return (
    <Col className='commit-changes-section staged'>
      <Title>Files to commit for {repo}:</Title>
      {
        stagedFiles.map(file => (
          <div>
            <Icon iconName={'window-close'} onClick={() => removeStagedFile(file['path'])} />
            <Link to={`file?path=${file.path}`}>{file.path}</Link>
          </div>
        ))
      }
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        className={'commit-message'}
        placeholder='Write your commit message here'
        value={message} />
      <Button onClick={() => pushToGithub(message)}>Commit Staged Files to GitHub</Button>
    </Col>
  )
}

CommitChanges.propTypes = {
  stagedFiles: PropTypes.array,
  repo: PropTypes.object,
  message: PropTypes.string,
  setMessage: PropTypes.func,
  pushToGithub: PropTypes.func
}

export default CommitChanges
