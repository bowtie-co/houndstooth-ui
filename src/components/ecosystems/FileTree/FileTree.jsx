
import React from 'react'
import PropTypes from 'prop-types'
import {
  PrivateRoute,
  Switch
} from 'atoms'
import {
  DirList,
  FileSingle
} from 'organisms'

const FileTree = (props) => {
  const { match, dirList, file, setFile, saveFile, branch } = props
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

FileTree.propTypes = {
  dirList: PropTypes.arrayOf(PropTypes.object),
  branch: PropTypes.string,
  file: PropTypes.object,
  setFile: PropTypes.func,
  saveFile: PropTypes.func
}

export default FileTree
