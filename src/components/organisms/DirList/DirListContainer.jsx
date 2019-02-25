
import DirList from './DirList'
import { notifier } from 'lib'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'

const nullConditionFn = ({ dirList }) => dirList.length === 0

export default compose(
  withStateHandlers({
    inFileDropZone: false
  }, {
    setEnterFileZone: () => (payload) => ({ inFileDropZone: payload })
  }),
  withMaybe(nullConditionFn),
  withHandlers({
    handleClick: ({ queryParams, setStagedFiles, stagedFiles, getDirList }) => (file) => {
      const fileToStage = {
        content: file['base64'],
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
