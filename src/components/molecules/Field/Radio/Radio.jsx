import React from 'react'
import PropTypes from 'prop-types'
import { Label, Input } from 'reactstrap'
import { FormGroup } from 'atoms'

const RadioField = ({ id, options, name, onChange, checked, label, ...rest }) => {
  return (
    <FormGroup className='customRadio' title={label} {...rest}>
      {options.map(option =>
        <Label check key={option.label}>
          <Input
            id={id}
            value={option.value}
            type='radio'
            name={name}
            onChange={onChange}
            checked={checked === option.value}
          />
          <i className='fa fa-circle-o fa-2x' /><i className='fa fa-dot-circle-o fa-2x' />
          <span>{option.label}</span>
        </Label>
      )}
    </FormGroup>
  )
}

RadioField.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string
}

export default RadioField
