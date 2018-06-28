import React from 'react'
import { PublicRoute, Switch } from '../../atoms'
import { FieldContainer } from '../../molecules'
import { DirList, FileSingle } from '../../organisms'

const FileTree = ({ dirList, match, file, branch, branchList, changeBranch }) => {
  console.log('FileTree branch', branch)
  return (
    <div className='demo-template'>
      <FieldContainer
        type={'select'}
        label={'Select a Branch'}
        value={branch}
        options={branchList.map(branch => branch.name)}
        onChange={changeBranch}
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
    </div>
  )
}

export default FileTree
