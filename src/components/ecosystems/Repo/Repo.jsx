import React from 'react'
import {
  PublicRoute,
  Switch,
  Col
} from '../../atoms'
import { RepoNav } from '../../molecules'
import { DirList, FileSingle, CommitChanges } from '../../organisms'

const Repo = (props) => {
  const { dirList, match, file, setFile, stagedFiles, saveFile, branch, branchList, changeBranch, pushToGithub, collections } = props
  return (
    <div className='demo-template'>
      <Col>
        <RepoNav
          branch={branch}
          branchList={branchList}
          changeBranch={changeBranch}
          isCollectionable={collections.length > 0}
        />
        <Switch>
          <PublicRoute
            props={{ dirList, branch }}
            path={`${match['url']}/dir`}
            component={DirList}
          />
          <PublicRoute
            props={{ file, setFile, saveFile }}
            path={`${match['url']}/file`}
            component={FileSingle}
          />
          <PublicRoute
            props={{ stagedFiles, pushToGithub, repo: match.params['repo'] }}
            path={`${match['url']}/commit`}
            component={CommitChanges}
          />
        </Switch>
      </Col>
    </div>
  )
}

export default Repo
