
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
  const { queryParams } = props
  return (
    <section className='flex-row'>
      {
        queryParams['path'] &&
          <div className='file-tree'>
            <FileTreeMap {...props} />
          </div>
      }
      <Switch>
        <PrivateRoute
          props={props}
          path={`/:username/:repo/dir`}
          component={DirList}
        />
        <PrivateRoute
          props={props}
          path={`/:username/:repo/file`}
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
