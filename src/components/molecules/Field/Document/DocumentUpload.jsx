import React from 'react'
import Dropzone from 'react-dropzone'
import { Button, FormGroup } from '../../../atoms'

const DocumentUpload = (props) => {
  const { handleButtonClick, handleFileDrop, value, name, togglePreview } = props
  let dropzoneRef // eslint-disable-line no-unused-vars

  return (
    <FormGroup>
      <Dropzone
        className='react-dropzone'
        name={name}
        ref={(node) => { dropzoneRef = node }}
        onDrop={handleFileDrop}
        multiple={false}
        disablePreview
        accept='application/pdf'
        maxSize={5 * 1024 * 1024}
      >
        <Button
          color='info'
          label={'Upload Document'}
          onClick={(e) => handleButtonClick(e, dropzoneRef)}
        />
        <p>Drag and drop PDF file here.</p>

        {value && <Button className='btn-sm' color='primary' label={'Cancel'} onClick={togglePreview} />}
      </Dropzone>
    </FormGroup>
  )
}

export default DocumentUpload
