import React from 'react'
import PropTypes from 'prop-types'
import {
  PrivateRoute,
  Switch,
  Col
} from 'atoms'
import {
  RepoNav
} from 'molecules'
import {
  CommitChanges
} from 'organisms'
import {
  FileTree,
  Collections
} from '..'

const Repo = (props) => {
  const { match, stagedFiles, branch, branchList, changeBranch, pushToGithub, collections, queryParams } = props
  return (
    <div className='demo-template'>
      <Col>
        <RepoNav
          branch={branch}
          branchList={branchList}
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
            props={{ collections, queryParams, branch }}
            path={`/repos/:username/:repo/collections/:collection?/:item?`}
            component={Collections}
          />
          <PrivateRoute
            props={props}
            path={`${match['url']}`}
            component={FileTree}
          />
        </Switch>
      </Col>
    </div>
  )
}

Repo.propTypes = {
  stagedFiles: PropTypes.array,
  branch: PropTypes.string,
  branchList: PropTypes.array,
  changeBranch: PropTypes.func,
  pushToGithub: PropTypes.func,
  collections: PropTypes.arrayOf(PropTypes.string),
  queryParams: PropTypes.object
}

export default Repo
