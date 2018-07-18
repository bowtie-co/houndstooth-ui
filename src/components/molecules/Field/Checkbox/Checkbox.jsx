import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import { FormGroup } from 'atoms'

const Checkbox = ({ id, value, onChange, ...rest }) => {
  const { setFormData, setStagedFileUploads, stagedFileUploads, fileUploads, ...sanitizedProps } = rest
  return (
    <FormGroup className='marLeft' {...sanitizedProps}>
      <Input id={id} type='checkbox' checked={!!value} onChange={() => onChange({ target: { value: !value } })} {...sanitizedProps} />
    </FormGroup>
  )
}

Checkbox.propTypes = {
  onChange: PropTypes.func
}

export default Checkbox
