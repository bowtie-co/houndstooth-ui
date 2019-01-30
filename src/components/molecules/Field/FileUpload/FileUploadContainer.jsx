/* global FileReader encodeURI */
import FileUpload from './FileUpload'
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose'

export default compose(
  withState('previewId', 'setPreviewId', ({ name }) => `upload_${name}_${Date.now()}`),
  withPropsOnChange(['items', 'value'], ({ name, value, branch, baseRoute }) => {
    if (value) {
      const sanitizedVal = encodeURI(value)
      const fileUrl = `https://raw.githubusercontent.com/${baseRoute}/master/${sanitizedVal}`
      return { fileUrl }
    }
  }),
  withHandlers({
    imagePreview: ({ previewId }) => (file) => {
      const reader = new FileReader()
      reader.onload = () => {
        var output = document.getElementById(previewId)
        output.src = reader.result
      }
      reader.readAsDataURL(file['file'])
    }
  }),
  withHandlers({
    handleFileUpload: ({ onChange, name: fieldKey, setStagedFileUploads, stagedFileUploads, imagePreview }) => (file) => {
      imagePreview(file)
      const shouldUpdateStaged = stagedFileUploads.some(stagedFile => stagedFile['fieldKey'] === fieldKey)
      const filePath = `upload/${file['type']}/${Date.now()}_${fieldKey}_${file['name']}`
      const updatedFile = Object.assign(file, { fieldKey, name: filePath })

      const newState = shouldUpdateStaged
        ? stagedFileUploads.map(upload => upload['fieldKey'] === updatedFile['fieldKey'] ? updatedFile : upload)
        : [...stagedFileUploads, updatedFile]

      onChange({ target: { value: filePath } })
      setStagedFileUploads(newState)
    }
  })
)(FileUpload)
