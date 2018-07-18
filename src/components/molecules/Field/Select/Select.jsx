import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import { FormGroup } from 'atoms'

const Select = ({ id, options, ...rest }) => {
  const { setFormData, setStagedFileUploads, stagedFileUploads, fileUploads, ...sanitizedProps } = rest

  const optionElements = options && options.map((option, index) => {
    const value = typeof option === 'object' ? (option.value || option.id) : option
    const text = typeof option === 'object' ? (option.text || option.name) : option

    return <option key={`opt-${index}-${value}`} value={value}>{text}</option>
  })

  return (
    <FormGroup id={id} {...sanitizedProps}>
      <Input
        id={id}
        {...sanitizedProps}
      >
        <option value=''>- Select -</option>
        {optionElements}
      </Input>
    </FormGroup>
  )
}

Select.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
}

export default Select
