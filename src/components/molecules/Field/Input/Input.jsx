import React from 'react'
import { Input as InputRS } from 'reactstrap'
import {
  FormGroup
} from 'atoms'

const Input = (props) => {
  const { value, edited, className = '', ...rest } = props
  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <InputRS value={value || ''} {...rest} />
    </FormGroup>
  )
}

export default Input
