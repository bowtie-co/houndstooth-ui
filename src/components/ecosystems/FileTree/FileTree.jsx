
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
import {
  FileTreeMap
} from 'molecules'

const FileTree = (props) => {
  const { dirList, file, setFile, saveFile, branch } = props
  console.log('dirList', dirList)

  return (
    <section className='flex-row'>
      <FileTreeMap {...props} />
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
    </section>
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
