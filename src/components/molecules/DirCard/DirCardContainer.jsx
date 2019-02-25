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
    handleActiveDrop: ({ setEnterZone, setEnterFileZone }) => (bool, type) => {
      setEnterZone(bool)
      type === 'file' && setEnterFileZone(bool)
    },
    handleDrop: ({ dir, setEnterZone, setStagedFiles, setEnterFileZone, stagedFiles, getDirList, branch }) => (files) => {
      console.log('FILE:', files[0])
      const file = files[0]
      console.log('dir', dir)

      const pathArray = dir['path'].split('/')
      const lastIndex = pathArray.length - 1

      const reader = new FileReader()
      reader.onload = (event) => {
        console.log('FILE IN READER', event.target)

        const params = {
          ref: branch,
          content: event.target['result'].split('base64,')[1],
          path: `${dir['path']}/${file['name']}`,
          name: file['name'],
          size: file['size'],
          type: 'file',
          encoding: 'base64'
        }
        console.log('content', params['content'])

        const fileToStage = Object.assign({}, file, params)
        // debugger
        if (dir['type'] !== 'dir') {
          pathArray.splice(lastIndex, 1, file['name'])
          fileToStage['path'] = pathArray.join('/')
        }

        setStagedFiles([...stagedFiles, fileToStage])
        getDirList()
        setEnterZone(false)
        setEnterFileZone(false)
        notifier.success(`You have added a file to ${fileToStage['path']}`)
      }

      reader.readAsDataURL(file)
    }
  })
)(DirCard)
