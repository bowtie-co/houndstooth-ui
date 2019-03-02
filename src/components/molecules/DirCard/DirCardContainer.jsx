/* global FileReader */
import DirCard from './DirCard'
import { compose, withHandlers, withStateHandlers, withProps } from 'recompose'
import { notifier } from 'lib/index'
import { lists, withFormatting } from 'helpers'

export default compose(
  withFormatting,
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
    handleDrop: ({ dir, setEnterZone, setStagedFiles, setEnterFileZone, stagedFiles, getDirList, branch, sanitizeFileName }) => (files) => {
      const file = files[0]
      const sanitizedName = sanitizeFileName(file['name'])

      const pathArray = dir['path'].split('/')
      const lastIndex = pathArray.length - 1

      const reader = new FileReader()
      reader.onload = (event) => {
        const params = {
          ref: branch,
          content: event.target['result'].split('base64,')[1],
          path: `${dir['path']}/${sanitizedName}`,
          name: sanitizedName,
          size: file['size'],
          type: 'file',
          encoding: 'base64'
        }

        const fileToStage = Object.assign({}, file, params)
        if (dir['type'] !== 'dir') {
          pathArray.splice(lastIndex, 1, sanitizedName)
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
  }),
  withProps(({ dir }) => {
    const { fileIcons } = lists
    const { type, name } = dir
    const nameArray = name.split('.')
    const ext = nameArray.length > 1 ? nameArray[nameArray.length - 1] : null
    return {
      fileIcon: fileIcons[ext] ? fileIcons[ext] : fileIcons[type]
    }
  })
)(DirCard)
