import React from 'react'
import {
  PublicRoute,
  Switch,
  Col
} from '../../atoms'
import { RepoNav } from '../../molecules'
import { DirList, FileSingle } from '../../organisms'

const Repo = ({ dirList, match, file, branch, branchList, changeBranch }) => {
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
            path={`${match.url}/dir`}
            component={DirList}
          />
          <PublicRoute
            props={{ file }}
            path={`${match.url}/file`}
            component={FileSingle}
          />
        </Switch>
      </Col>
    </div>
  )
}

export default Repo
