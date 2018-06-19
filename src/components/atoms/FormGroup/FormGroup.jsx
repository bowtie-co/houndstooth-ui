import React from 'react'
import { FormGroup as FormGroupRS, Label, FormText } from 'reactstrap'

const FormGroup = ({ id, label, errorMessage, helper, children, floatLabel = false, check = false, required }) => {
  return (
    <FormGroupRS>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label for={id} check={check} className={`${floatLabel ? 'has-float-label' : ''} ${required ? 'required' : 'optional'}`}>
        { children }
        <span>{label}</span>
      </Label>
      <FormText>
        {errorMessage}
      </FormText>
    </FormGroupRS>
  )
}

export default FormGroup
