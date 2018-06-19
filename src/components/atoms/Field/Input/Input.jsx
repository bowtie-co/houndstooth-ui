import React from 'react'
import { 
  FormGroup, 
  Label, 
  Input as InputRS, 
  FormText 
} from 'reactstrap'

const Input = ({ id, label, validate, errorMessage, helper, ...props }) => {
  return (
    <FormGroup>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label for={id} className={`form-group has-float-label ${props.required ? 'required' : 'optional'}`}>
        <InputRS className='form-control' id={id} {...props} />
        <span>{label}</span>
      </Label>
      <FormText>
        { errorMessage }
      </FormText>
    </FormGroup>
  )
}

export default Input
