import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { FormGroup } from 'atoms'
import { selectLists } from 'lib'

const SelectBT = ({ col, options, async, name, onChange, value, list, className = '', edited, ...rest }) => {
  const SelectComponent = async ? Select.Async : Select
  const { valueKey, labelKey } = rest

  options = list ? selectLists[list] : options

  if (options && Array.isArray(options) && options.length > 0 && typeof options[0] !== 'object') {
    options = options.reduce((arr, option) => {
      const value = typeof option === 'object' ? option[valueKey] : option
      const text = typeof option === 'object' ? option[labelKey] : option

      return [...arr, { label: text, value }]
    }, [])
  }

  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <SelectComponent
        className={`select-min-width ${className}`}
        onChange={(data) => onChange({ target: { name, value: data ? data[valueKey || 'value'] : null } })}
        options={options}
        value={Array.isArray(value) ? value[0] : value}
        inputProps={{ autoComplete: 'nope' }}
        {...rest}
      />
    </FormGroup>
  )
}

export default SelectBT
