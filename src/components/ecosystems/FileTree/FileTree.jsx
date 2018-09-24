
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
  const { dirList, file, setFile, saveFile, branch } = props
  return (
    <Switch>
      <PrivateRoute
        props={{ dirList, branch }}
        path={`/repos/:username/:repo/dir`}
        component={DirList}
      />
      <PrivateRoute
        props={{ file, setFile, saveFile }}
        path={`/repos/:username/:repo/file`}
        component={FileSingle}
      />
    </Switch>
  )
}

FileTree.propTypes = {
  dirList: PropTypes.arrayOf(PropTypes.object),
  branch: PropTypes.string.isRequired,
  file: PropTypes.object,
  setFile: PropTypes.func,
  saveFile: PropTypes.func
}

export default FileTree
