import React from 'react'
import { FormGroup, Label, Input, FormText } from 'reactstrap'

const Select = ({ id, label, col, validate, helper, errorMessage, options, ...props }) => {
  const optionElements = options && options.map((option, index) => {
    const value = typeof option === 'object' ? (option.value || option.id) : option
    const text = typeof option === 'object' ? (option.text || option.name) : option

    return <option key={`opt-${index}-${value}`} value={value}>{text}</option>
  })

  return (
    <FormGroup>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label for={id} className={`form-group has-float-label ${props.required ? 'required' : 'optional'}`}>
        <Input
          id={id}
          className='form-control'
          {...props}
        >
          <option value=''>- Select -</option>
          {optionElements}
        </Input>
        <span>{label}</span>
      </Label>
      <FormText className='error selectError'>
        { errorMessage }
      </FormText>
    </FormGroup>
  )
}

export default Select
