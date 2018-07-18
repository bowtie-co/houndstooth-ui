import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import { FormGroup } from 'atoms'

const Checkbox = ({ id, value, onChange, ...rest }) => {
  return (
    <FormGroup className='marLeft' {...rest}>
      <Input id={id} type='checkbox' checked={!!value} onChange={() => onChange({ target: { value: !value } })} {...rest} />
    </FormGroup>
  )
}

Checkbox.propTypes = {
  onChange: PropTypes.func
}

export default Checkbox
