/* global FileReader */
import DirCard from './DirCard'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { notifier } from 'lib/index'

export default compose(
  withStateHandlers({
    inDropZone: false
  }, {
    setEnterZone: () => (payload) => ({ inDropZone: payload })
  }),
  withHandlers({
    handleDrop: ({ dir, setEnterZone, setStagedFiles, stagedFiles, getDirList }) => (files) => {
      console.log('FILE:', files[0])
      const file = files[0]

      const pathArray = dir['path'].split('/')
      const lastIndex = pathArray.length - 1

      const reader = new FileReader()
      reader.onload = (event) => {
        const fileToStage = {
          content: event.target['result'],
          path: `${dir['path']}/${file['name']}`,
          name: file['name'],
          size: file['size'],
          type: 'file',
          encoding: 'base64'
        }

        if (dir['type'] !== 'dir') {
          pathArray.splice(lastIndex, 1, file['name'])
          fileToStage['path'] = pathArray.join('/')
        }

        setStagedFiles([...stagedFiles, fileToStage])
        getDirList()
        setEnterZone(false)
        notifier.success(`You have added a file to ${fileToStage['path']}`)
      }

      reader.readAsDataURL(file)
    }
  })
)(DirCard)
