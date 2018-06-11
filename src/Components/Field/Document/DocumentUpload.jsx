import React from 'react'
import Dropzone from 'react-dropzone'
import { Button, FormGroup, FormText, Label } from 'reactstrap'

const DocumentUpload = (props) => {
  const { handleButtonClick, handleFileDrop, errorMessage, value, name, helper, label, togglePreview } = props
  let dropzoneRef // eslint-disable-line no-unused-vars

  return (
    <FormGroup>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label className={`form-group has-float-label ${props.required ? 'required' : 'optional'}`}>
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
          <Button color='info' onClick={(e) => handleButtonClick(e, dropzoneRef)}>
            Upload Document
          </Button>

          <p>Drag and drop PDF file here.</p>

          {value && <Button className='btn-sm' color='primary' onClick={togglePreview}>Cancel</Button>}
        </Dropzone>
        <span>{label}</span>
      </Label>
      <FormText>
        { errorMessage }
      </FormText>
    </FormGroup>
  )
}

export default DocumentUpload
