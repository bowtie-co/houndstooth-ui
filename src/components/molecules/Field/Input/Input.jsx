import React from 'react'
import { Input as InputRS } from 'reactstrap'
import {
  FormGroup
} from '../../../atoms'

const Input = ({ id, ...rest }) => {
  return (
    <FormGroup {...rest}>
      <InputRS className='form-control' id={id} {...rest} />
    </FormGroup>
  )
}

export default Input
