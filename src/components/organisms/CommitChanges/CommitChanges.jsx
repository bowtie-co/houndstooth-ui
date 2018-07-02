
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Col,
  Button,
  Title
} from '../../atoms'

const CommitChanges = (props) => {
  const { stagedFiles, repo, message, setMessage, pushToGithub } = props
  console.log('Message', message)
  return (
    <Col className='commit-changes-section'>
      <Title>Files to commit for {repo}:</Title>
      {
        stagedFiles.map(file => <Link to={`file?path=${file.path}`}>{file.name}</Link>)
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

export default CommitChanges
