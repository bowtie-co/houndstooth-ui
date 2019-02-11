import React from 'react'
import { Input as InputRS } from 'reactstrap'
import {
  FormGroup
} from 'atoms'

const TextArea = (props) => {
  const { value, edited, className = '', ...rest } = props
  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <InputRS rows='5' type='textarea' value={value || ''} {...rest} />
    </FormGroup>
  )
}

export default TextArea
