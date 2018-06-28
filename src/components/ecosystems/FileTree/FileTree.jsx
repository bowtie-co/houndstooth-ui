import React from 'react'
import { PublicRoute, Switch } from '../../atoms'
import { DirList, FileSingle } from '../../organisms'

const FileTree = ({ dirList, match, file, branch }) => {
  console.log('FileTree branch', branch)
  return (
    <div className='demo-template'>
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
