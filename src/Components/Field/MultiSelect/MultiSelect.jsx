import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { FormGroup, Label, FormText } from 'reactstrap'

const MultiSelect = ({ id, name, label, value, async, validate, helper, errorMessage, onChange, ...props }) => {
  const SelectComponent = async ? Select.Async : Select

  if (props.options && Array.isArray(props.options) && props.options.length > 0 && typeof props.options[0] !== 'object') {
    props.options = props.options.reduce((arr, option, index) => {
      const value = typeof option === 'object' ? (option.value || option.id) : option
      const text = typeof option === 'object' ? (option.text || option.name) : option

      return [ ...arr, { label: text, value } ]
    }, [])
  }

  return (
    <FormGroup>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label for={id} className={`form-group has-float-label ${props.required ? 'required' : 'optional'}`}>
        <SelectComponent
          id={id}
          multi
          backspaceRemoves
          value={value || []}
          onChange={(value) => onChange({ target: { name, value } })}
          {...props}
        />
        <span>{label}</span>
      </Label>
      <FormText className='error selectError'>
        { errorMessage }
      </FormText>
    </FormGroup>
  )
}

export default MultiSelect
