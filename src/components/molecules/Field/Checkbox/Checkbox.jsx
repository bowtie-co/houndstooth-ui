import React from 'react'
import { Input } from 'reactstrap'
import { FormGroup } from 'atoms'

const Checkbox = (props) => {
  const { onChange, cleanObjectsFromDom, ...inputProps } = props
  const { edited, className = '', handleChange, value, ...rest } = props
  const sanitizedProps = cleanObjectsFromDom(inputProps)

  return (
    <FormGroup className={`marLeft ${className} ${edited ? 'success-highlight' : ''}`} check {...rest}>
      <Input type='checkbox' onChange={handleChange} checked={value} {...sanitizedProps} />
    </FormGroup>
  )
}

export default Checkbox
