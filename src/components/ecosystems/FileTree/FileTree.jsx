
import React from 'react'
import {
  PrivateRoute,
  Switch
} from 'atoms'
import {
  DirList,
  FileSingle
} from 'organisms'

const FileTree = (props) => {
  const { dirList, match, file, setFile, saveFile, branch } = props
  return (
    <Switch>
      <PrivateRoute
        props={{ dirList, branch }}
        path={`${match['url']}/dir`}
        component={DirList}
      />
      <PrivateRoute
        props={{ file, setFile, saveFile }}
        path={`${match['url']}/file`}
        component={FileSingle}
      />
    </Switch>
  )
}

export default FileTree
