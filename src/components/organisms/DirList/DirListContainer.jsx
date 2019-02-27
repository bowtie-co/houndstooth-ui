
import DirList from './DirList'
import { notifier } from 'lib'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import { withFormatting } from 'helpers'

const nullConditionFn = ({ dirList }) => dirList.length === 0

export default compose(
  withFormatting,
  withStateHandlers({
    inFileDropZone: false
  }, {
    setEnterFileZone: () => (payload) => ({ inFileDropZone: payload })
  }),
  withMaybe(nullConditionFn),
  withHandlers({
    handleClick: ({ queryParams, setStagedFiles, stagedFiles, getDirList, sanitizeFileName }) => (file) => {
      file['name'] = sanitizeFileName(file['name'])
      const fileToStage = {
        content: file.base64.split('base64,')[1],
        path: queryParams['path'] ? `${queryParams['path']}/${file['name']}` : file['name'],
        name: file['name'],
        size: file['size'],
        type: 'file',
        encoding: 'base64'
      }

      setStagedFiles([...stagedFiles, fileToStage])
      getDirList()
      notifier.success(`You have added a file to ${fileToStage['path']}`)
    }
  })
)(DirList)
