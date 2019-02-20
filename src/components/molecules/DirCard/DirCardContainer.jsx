/* global FileReader */
import DirCard from './DirCard'
import { compose, withHandlers } from 'recompose'

export default compose(
  withHandlers({
    handleDrop: ({ dir, setStagedFiles, stagedFiles }) => (files) => {
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
          type: file['type'],
          encoding: 'base64'
        }

        if (dir['type'] !== 'dir') {
          pathArray.splice(lastIndex, 1, file['name'])
          fileToStage['path'] = pathArray.join('/')
        }

        setStagedFiles([...stagedFiles, fileToStage])
      }

      reader.readAsDataURL(file)
    }
  })
)(DirCard)
