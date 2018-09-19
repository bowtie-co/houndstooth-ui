import React from 'react'
import Dropzone from 'react-dropzone'
import { FormGroup } from 'atoms'

const EmptyState = (props) => {
  const { handleFileDrop, name, value, defaultImage, preview, handleCancelPreview, ...rest } = props
  return (
    <FormGroup {...rest}>
      <Dropzone
        className='react-dropzone'
        name={name}
        onDrop={handleFileDrop}
        multiple={false}
        accept='image/*'
      >
        <div>Upload Image</div>
      </Dropzone>
    </FormGroup>
  )
}

export default EmptyState
