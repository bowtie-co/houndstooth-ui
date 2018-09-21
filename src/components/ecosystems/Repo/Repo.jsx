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
  const { match, stagedFiles, branch, asyncLoadModel, baseRoute, changeBranch, pushToGithub, collections, queryParams } = props
  const { username } = match.params
  return (
    <Row>
      <Col>
        <RepoControls
          baseRoute={baseRoute}
          branch={branch}
          asyncLoadModel={asyncLoadModel}
          changeBranch={changeBranch}
          isCommitable={stagedFiles.length > 0}
          isCollectionable={collections.length > 0}
        />
        <Switch>
          <PrivateRoute
            props={{ stagedFiles, pushToGithub, repo: match.params['repo'] }}
            path={`${match['url']}/commit`}
            component={CommitChanges}
          />
          <PrivateRoute
            props={{ collections, queryParams, branch, baseRoute }}
            path={`/repos/:username/:repo/:type(collections)/:collection?/:item?`}
            component={Collections}
          />
          <PrivateRoute
            props={props}
            path={`${match['url']}`}
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
