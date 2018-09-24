import React from 'react'
import { Input } from 'reactstrap'
import { FormGroup } from 'atoms'

const Checkbox = (props) => {
  const { edited, className = '', ...rest } = props
  return (
    <FormGroup className={`marLeft ${className} ${edited ? 'success-highlight' : ''}`} check {...rest}>
      <Input type='checkbox' {...props} />
    </FormGroup>
  )
}

export default Checkbox
