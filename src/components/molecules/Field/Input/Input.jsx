import React from 'react'
import { Input as InputRS } from 'reactstrap'
import {
  FormGroup
} from '../../../atoms'

const Input = ({ id, value, ...rest }) => {
  return (
    <FormGroup floatLabel {...rest}>
      <InputRS value={value || ''} id={id} {...rest} />
    </FormGroup>
  )
}

export default Input
