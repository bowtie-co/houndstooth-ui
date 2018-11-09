import React from 'react'
import Dropzone from 'react-dropzone'
import { Button, FormGroup, Row, Col } from 'atoms'

const ImageUpload = (props) => {
  const { handleFileDrop, name, value, defaultImage, preview, handleCancelPreview, deleteImage, ...rest } = props
  return (
    <FormGroup {...rest}>
      <img alt='preview' className={'img-preview'} src={value} />
      <Dropzone
        className='react-dropzone-preview'
        name={name}
        onDrop={handleFileDrop}
        multiple={false}
        accept='image/*'
      >
        <Row>
          <Col>
            <Button onClick={(e) => e.preventDefault()}>Change Image</Button>
          </Col>

        </Row>
      </Dropzone>
      <Col>
        {
          preview
            ? <Button onClick={handleCancelPreview}>Cancel</Button>
            : <Button onClick={deleteImage}>Delete</Button>
        }
      </Col>
    </FormGroup>
  )
}

export default ImageUpload
