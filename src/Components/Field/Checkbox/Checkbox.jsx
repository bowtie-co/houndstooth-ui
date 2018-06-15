import React from 'react'
import { FormGroup, Label, Input, FormText } from 'reactstrap'

const CheckboxField = ({ id, label, validate, helper, errorMessage, ...props }) => {
  return (
    <FormGroup className='marLeft'>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label check>
        <Input
          id={id}
          type='checkbox'
          {...props}
        />
        {label}
      </Label>
      <FormText>
        {errorMessage}
      </FormText>
    </FormGroup>
  )
}

export default CheckboxField
