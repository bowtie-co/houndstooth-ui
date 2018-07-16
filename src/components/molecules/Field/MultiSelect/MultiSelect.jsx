import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { FormGroup } from 'atoms'

const MultiSelect = ({ id, name, value, async, onChange, options, ...rest }) => {
  const SelectComponent = async ? Select.Async : Select

  if (options && Array.isArray(options) && options.length > 0 && typeof options[0] !== 'object') {
    options = options.reduce((arr, option) => {
      const value = typeof option === 'object' ? (option.value || option.id) : option
      const text = typeof option === 'object' ? (option.text || option.name) : option

      return [ ...arr, { label: text, value } ]
    }, [])
  }

  return (
    <FormGroup id={id} {...rest}>
      <SelectComponent
        id={id}
        multi
        backspaceRemoves
        value={value || []}
        onChange={(value) => onChange({ target: { name, value } })}
        options={options}
        {...rest}
      />
    </FormGroup>
  )
}

export default MultiSelect
