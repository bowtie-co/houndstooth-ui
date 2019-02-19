import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { FormGroup } from 'atoms'

const MultiSelect = ({ id, name, async, onChange, creatable, className = '', edited, value = [], ...rest }) => {
  const SelectComponent = async ? Select.Async : (creatable ? Select.Creatable : Select)
  return (
    <FormGroup id={id} className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <SelectComponent
        multi
        backspaceRemoves
        id={id}
        inputProps={{ autoComplete: 'nope' }}
        value={value}
        onChange={(v) => onChange({ target: { name, value: v.map(i => i.value) } })}
        {...rest}
      />
    </FormGroup>
  )
}

export default MultiSelect
