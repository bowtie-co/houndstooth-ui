import React from 'react'
import { FormGroup as FormGroupRS, Label, FormText } from 'reactstrap'
import PropTypes from 'prop-types'

const FormGroup = ({ id, label, title, errorMessage, helper, children, floatLabel = false, check = false, required }) => {
  const radioTitle = title ? <h2>{title}</h2> : null
  return (
    <FormGroupRS>
      { radioTitle }
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label for={id} check={check} className={`${floatLabel ? 'has-float-label' : ''} ${required ? 'required' : 'optional'}`}>
        <span>{label}</span>
        { children }
      </Label>
      <FormText>
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </FormText>
    </FormGroupRS>
  )
}

FormGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  helper: PropTypes.string,
  floatLabel: PropTypes.bool,
  check: PropTypes.bool,
  required: PropTypes.bool
}

export default FormGroup
