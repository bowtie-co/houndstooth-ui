/* global FileReader */
import FileUpload from './FileUpload'
import { compose, withHandlers, withPropsOnChange } from 'recompose'

export default compose(
  withPropsOnChange(['items'], ({ fileUploads, name, value, branch, match }) => {
    const { username, repo } = match.params
    if (value) {
      console.log('file from fileUploads: ', fileUploads[value])
      const sanitizedVal = value.replace(/ /g, '%20')
      const fileUrl = `https://raw.githubusercontent.com/${username}/${repo}/master/${sanitizedVal}`
      return { fileUrl }
    }
  }),
  withHandlers({
    imagePreview: () => (file) => {
      const reader = new FileReader()
      reader.onload = () => {
        var output = document.getElementById('output')
        output.src = reader.result
      }
      reader.readAsDataURL(file)
    }
  }),
  withHandlers({
    handleFileUpload: ({ onChange, name: fieldKey, setStagedFileUploads, stagedFileUploads, imagePreview }) => (file) => {
      imagePreview(file['file'])

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
