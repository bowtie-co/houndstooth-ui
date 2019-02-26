import React from 'react'
import { withQueryParams } from 'helpers'
import { compose, withProps, onlyUpdateForKeys, withHandlers } from 'recompose'
import { withMaybe, withEither } from '@bowtie/react-utils'
import FileTreeMap from './FileTreeMap'

const nullConditionalFn = ({ tree = {} }) => Object.keys(tree).length === 0
const loadingConditionalFn = ({ isTreeLoading }) => isTreeLoading

const Loading = () => <div>Loading...</div>

export default compose(
  withQueryParams,
  withProps({
    fileIcons: {
      css: 'fab fa-css3',
      scss: 'fab fa-sass',
      html: 'fas fa-code',
      js: 'fab fa-js',
      json: 'far fa-file-alt',
      file: 'far fa-file-alt',
      dir: 'fas fa-folder'
    }
  }),
  onlyUpdateForKeys(['tree', 'match']),
  withHandlers({
    buildDirList: ({ stagedFiles }) => (tree, dirPath) => {
      const dirList = Object.keys(tree)

      // add new staged file if it does not exist in fileTree yet.
      const dirStagedFiles = stagedFiles.filter(file => {
        const filePathArr = file['path'].split('/')
        filePathArr.pop()
        return dirPath === filePathArr.join('/')
      })

      dirStagedFiles.forEach((file, i) => {
        const isInTreeMap = dirList.includes(file['path'])
        !isInTreeMap && dirList.push(file['path'])
      })

      return dirList.sort(a => a.split('.').length > 1 ? 1 : -1)
    }
  }),
  withEither(loadingConditionalFn, Loading),
  withMaybe(nullConditionalFn)
)(FileTreeMap)
