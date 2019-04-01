/* global FileReader encodeURI */
import FileUpload from './FileUpload'
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose'
import { lists } from 'helpers'

export default compose(
  withState('previewId', 'setPreviewId', ({ name }) => `upload_${name}_${Date.now()}`),
  withState('previewUrl', 'setPreviewUrl', '/loading.svg'),
  withState('fileUrl', 'setFileUrl'),
  withState('isLoadingFileUrl', 'setIsLoadingFileUrl', false),
  withPropsOnChange(['value'], ({ value, getFileDownloadUrl, setIsLoadingFileUrl, setPreviewUrl, setFileUrl }) => {
    if (value) {
      setIsLoadingFileUrl(true)

      const fileParts = value.split('.')
      const fileExt = fileParts[fileParts.length - 1]

      getFileDownloadUrl(value).then(fileUrl => {
        console.log('got file download url', fileUrl)
        setFileUrl(fileUrl)
        setIsLoadingFileUrl(false)

        if (Object.keys(lists['previewIcons']).includes(fileExt)) {
          setPreviewUrl(fileExt)
        } else if (/gif|png|jpe?g|svg/i.test(fileExt)) {
          setPreviewUrl(fileUrl)
        } else {
          setPreviewUrl('file')
        }
      }).catch(err => {
        console.error('failed getting file download url!', err)

        if (err['status'] === 404 && Object.keys(lists['previewIcons']).includes(fileExt)) {
          setPreviewUrl(fileExt)
        } else if (err['status'] === 403) {
          setPreviewUrl('largeFile')
        }

        setIsLoadingFileUrl(false)
      })
    }
  }),
  withHandlers({
    imagePreview: ({ previewId, setPreviewUrl }) => (file) => {
      if (typeof file === 'object') {
        const reader = new FileReader()
        reader.onload = () => {
          setPreviewUrl(file['type'] === 'application/pdf' ? 'pdf' : reader.result)
        }
        reader.readAsDataURL(file['file'])
      }
    },
    deleteImage: ({ onChange, name }) => () => {
      onChange({ target: { name, value: null } })
    }
  }),
  withHandlers({
    handleFileUpload: ({ onChange, name: fieldKey, setStagedFileUploads, stagedFileUploads, imagePreview, sanitizeFileName }) => (file) => {
      file['name'] = sanitizeFileName(file['name'])
      imagePreview(file)
      const shouldUpdateStaged = stagedFileUploads.some(stagedFile => stagedFile['fieldKey'] === fieldKey)
      const filePath = `upload/${file['type']}/${Date.now()}_${fieldKey}_${file['name']}`
      const updatedFile = Object.assign(file, { fieldKey, name: filePath })

      const newState = shouldUpdateStaged
        ? stagedFileUploads.map(upload => upload['fieldKey'] === updatedFile['fieldKey'] ? updatedFile : upload)
        : [...stagedFileUploads, updatedFile]

      // Add "/" prefix for filePath in form state, but not for path to upload file to github!
      onChange({ target: { value: `/${filePath}` } })
      setStagedFileUploads(newState)
    }
  })
)(FileUpload)
