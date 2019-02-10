/* global FileReader encodeURI */
import FileUpload from './FileUpload'
import { compose, withHandlers, withPropsOnChange, withState } from 'recompose'

export default compose(
  withState('previewId', 'setPreviewId', ({ name }) => `upload_${name}_${Date.now()}`),
  withState('isLoadingFileUrl', 'setIsLoadingFileUrl', false),
  withPropsOnChange(['items', 'value'], ({ value, buildUploadUrl }) => {
    if (value) {
      // TODO: Ask Tim why this was here...
      // const sanitizedVal = encodeURI(value)

      return {
        fileUrl: buildUploadUrl(value)
      }
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
      // const filePath = `upload/${file['type']}/${Date.now()}_${fieldKey}_${file['name']}`
      const filePath = `upload/${file['type']}/${fieldKey}_${file['name']}`
      const updatedFile = Object.assign(file, { fieldKey, name: filePath })

      const newState = shouldUpdateStaged
        ? stagedFileUploads.map(upload => upload['fieldKey'] === updatedFile['fieldKey'] ? updatedFile : upload)
        : [...stagedFileUploads, updatedFile]

      // Add "/" prefix for filePath in form state, but not for path to upload file to github!
      onChange({ target: { value: `/${filePath}` } })
      // onChange({ target: { value: filePath } })
      setStagedFileUploads(newState)
    }
  })
  // withPropsOnChange([ 'fileUrl' ], ({ fileUrl, setIsLoadingFileUrl }) => {
  //   setIsLoadingFileUrl(true)

  //   const loadFileUrl = (attempt = 1) => {
  //     console.log('load image from fileUrl:', fileUrl)

  //     if (attempt >= 10) {
  //       console.error('BAIL! Reached max attempts to reload image!')
  //       return
  //     }

  //     fetch(fileUrl, { method: 'GET', mode: 'cors', cache: 'reload', headers: { 'Cache-Control': 'no-cahe' } }).then(resp => {
  //       console.log('fetched image url', fileUrl)
  //       console.log(resp)

  //       if (resp.status < 400) {
  //         setIsLoadingFileUrl(false)
  //       } else {
  //         console.warn('Received ', resp.status, 'for upload, keep trying ...')
  //         setTimeout(() => loadFileUrl(attempt + 1), 5000)
  //       }
  //     }).catch(err => {
  //       console.error('fetch error loading image', err)
  //     })
  //   }

  //   loadFileUrl()
  // })
)(FileUpload)
