import React from 'react'
import { Input as InputRS } from 'reactstrap'
import {
  FormGroup
} from 'atoms'

const Input = ({ id, value, ...rest }) => {
  const { setFormData, setStagedFileUploads, stagedFileUploads, fileUploads, ...sanitizedProps } = rest
  return (
    <FormGroup floatLabel {...sanitizedProps}>
      <InputRS value={value || ''} id={id} {...sanitizedProps} />
    </FormGroup>
  )
}

export default Input
