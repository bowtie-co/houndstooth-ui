import React from 'react'
import { PublicRoute, Switch } from '../../atoms'
import { DirList, FileSingle } from '../../organisms'

const FileTree = ({ dirList, match, file, branch }) => {
  console.log('FileTree dirList', dirList)
  return (
    <div className='demo-template'>
      <Switch>
        <PublicRoute
          path={`${match.url}/dir`}
          props={{ dirList, branch }}
          component={DirList}
        />
        <PublicRoute
          path={`${match.url}/file`}
          props={{ file }}
          component={FileSingle}
        />
      </Switch>
    </div>
  )
}

export default FileTree
