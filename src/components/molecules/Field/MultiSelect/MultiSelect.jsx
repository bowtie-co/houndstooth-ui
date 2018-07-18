import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { FormGroup } from 'atoms'

const MultiSelect = ({ id, name, value, async, onChange, options, ...rest }) => {
  const { setFormData, setStagedFileUploads, stagedFileUploads, fileUploads, ...sanitizedProps } = rest

  const SelectComponent = async ? Select.Async : Select

  if (options && Array.isArray(options) && options.length > 0 && typeof options[0] !== 'object') {
    options = options.reduce((arr, option) => {
      const value = typeof option === 'object' ? (option.value || option.id) : option
      const text = typeof option === 'object' ? (option.text || option.name) : option

      return [ ...arr, { label: text, value } ]
    }, [])
  }

  return (
    <FormGroup id={id} {...sanitizedProps}>
      <SelectComponent
        id={id}
        multi
        backspaceRemoves
        value={value || []}
        onChange={(value) => onChange({ target: { name, value } })}
        options={options}
        {...sanitizedProps}
      />
    </FormGroup>
  )
}

MultiSelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  async: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array
}

export default MultiSelect
