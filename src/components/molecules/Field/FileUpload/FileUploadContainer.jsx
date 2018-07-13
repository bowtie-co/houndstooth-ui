// import React from 'react';
import FileUpload from './FileUpload'
import { compose, withHandlers, withPropsOnChange } from 'recompose'

export default compose(
  withPropsOnChange([ 'fileUploads' ], ({ fileUploads, name, value }) => {
    const fileUrl = fileUploads[value] ? fileUploads[value].download_url : ''
    return { fileUrl }
  }),
  withHandlers({
    handleFileUpload: ({ onChange, name: fieldKey, setStagedFileUploads, stagedFileUploads }) => (file) => {
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
