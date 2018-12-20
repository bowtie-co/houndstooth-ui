import React from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
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
  Collections
} from '..'

const Repo = (props) => {
  const { match, stagedFiles, branch, baseRoute, pushToGithub, collections, queryParams } = props
  const { username } = match.params
  return (
    <Row>
      <Col style={{ 'padding': '24px' }}>
        <RepoControls
          isCommitable={stagedFiles.length > 0}
          isCollectionable={collections && collections.length > 0}
          {...props}
        />
        <Switch>
          <PrivateRoute
            props={{ stagedFiles, pushToGithub, repo: match.params['repo'] }}
            path={`/repos/:username/:repo/commit`}
            component={CommitChanges}
          />
          <PrivateRoute
            props={{ collections, queryParams, branch, baseRoute }}
            path={`/repos/:username/:repo/:type(collections)/:collection?/:item?`}
            component={Collections}
          />
          <PrivateRoute
            props={props}
            path={`/repos/:username/:repo/:type(file|dir)`}
            component={FileTree}
          />
        </Switch>
        <Prompt
          when={stagedFiles.length > 0}
          message={location => location.pathname.startsWith(`/repos/${username}`) ? true : `You will lose uncommitted changes if you leave.`}
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
