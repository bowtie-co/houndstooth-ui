// import React from 'react';
import FileUpload from './FileUpload'
import { compose, withHandlers, withPropsOnChange } from 'recompose'

export default compose(
  withPropsOnChange(['fileUploads'], ({ fileUploads, name }) => {
    const fileUrl = fileUploads[name] ? fileUploads[name].download_url : ''
    return { fileUrl }
  }
  ),
  withHandlers({
    handleFileUpload: ({ handleChange, fieldKey, field, stageFileUpload, stagedFileUploads, updateStagedFileUpload }) => (file) => {
      const shouldUpdateStaged = stagedFileUploads.some(stagedFile => stagedFile.fieldKey === fieldKey)
      const name = `upload/${file.type}/${Date.now()}_${fieldKey}_${file.name}`
      const updatedFile = Object.assign(file, { fieldKey, name })

      shouldUpdateStaged
        ? updateStagedFileUpload(updatedFile)
        : stageFileUpload(updatedFile)

      handleChange(fieldKey, name)
    }

  })

)(FileUpload)
