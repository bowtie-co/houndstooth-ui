import React from 'react'
import {
  PublicRoute,
  Switch,
  Col
} from '../../atoms'
import { RepoNav } from '../../molecules'
import { DirList, FileSingle } from '../../organisms'

const Repo = (props) => {
  const { dirList, match, file, setStagedFiles, branch, branchList, changeBranch } = props
  // const { action, repo, username } = match.params
  return (
    <div className='demo-template'>
      <Col>
        <RepoNav
          branch={branch}
          branchList={branchList}
          changeBranch={changeBranch}
        />
        <Switch>
          <PublicRoute
            props={{ dirList, branch }}
            path={`${match['url']}/dir`}
            component={DirList}
          />
          <PublicRoute
            props={{ file, setStagedFiles }}
            path={`${match['url']}/file`}
            component={FileSingle}
          />
        </Switch>
      </Col>
    </div>
  )
}

export default Repo

