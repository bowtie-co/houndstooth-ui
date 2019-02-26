import React from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
import { Alert } from 'reactstrap'
import {
  PrivateRoute,
  Switch,
  Col,
  Row
} from 'atoms'
import { RepoControls } from 'molecules'
import { CommitChanges } from 'organisms'

import {
  FileTree,
  Collections,
  Users
} from '..'

const Repo = (props) => {
  const { match, stagedFiles, pushToGithub, collections, removeStagedFile, permissions } = props
  const { username } = match.params
  return (
    <Row style={{ 'width': '100%' }}>
      { !permissions['push'] &&
      <Col sm='12' className='ml-3'>
        <Alert className={`pre-wrap`} color={'warning'}>You do not have permission to edit this repo.</Alert>
      </Col>
      }
      <Col style={{ 'padding': '20px 0 20px 20px' }}>
        <RepoControls
          isCommitable={stagedFiles.length > 0}
          isCollectionable={collections && collections.length > 0}
          {...props}
        />
        <Switch>
          <PrivateRoute
            exact
            props={props}
            path={`/:username/:repo/users`}
            component={Users}
          />
          <PrivateRoute
            exact
            props={{ stagedFiles, pushToGithub, repo: match.params['repo'], removeStagedFile }}
            path={`/:username/:repo/commit`} // Use type or action path param?
            component={CommitChanges}
          />
          <PrivateRoute
            props={props}
            path={`/:username/:repo/:type(collections)/:collection?/:item?`}
            component={Collections}
          />
          <PrivateRoute
            props={props}
            path={`/:username/:repo/:type(file|dir)`} // Use action or type with (browse | commit | edit) ?
            component={FileTree}
          />
        </Switch>
        <Prompt
          when={stagedFiles.length > 0}
          message={location => location.pathname.startsWith(`/${username}`) ? true : `You will lose uncommitted changes if you leave.`}
        />
      </Col>
    </Row>
  )
}

Repo.propTypes = {
  stagedFiles: PropTypes.array,
  branch: PropTypes.string,
  changeBranch: PropTypes.func,
  pushToGithub: PropTypes.func,
  collections: PropTypes.arrayOf(PropTypes.string),
  queryParams: PropTypes.object
}

export default Repo
