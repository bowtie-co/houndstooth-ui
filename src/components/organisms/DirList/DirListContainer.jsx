
import DirList from './DirList'
import { notifier } from 'lib'
import { compose, withHandlers } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'

const nullConditionFn = ({ dirList }) => dirList.length === 0

export default compose(
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
