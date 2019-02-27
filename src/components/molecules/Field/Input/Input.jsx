import React from 'react'
import { Input as InputRS } from 'reactstrap'
import {
  FormGroup
} from 'atoms'

const Input = (props) => {
  const { value, edited, className = '', cleanObjectsFromDom, ...rest } = props
  const sanitizedProps = cleanObjectsFromDom(rest)
  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <InputRS value={value || ''} {...sanitizedProps} />
    </FormGroup>
  )
}

export default Input
