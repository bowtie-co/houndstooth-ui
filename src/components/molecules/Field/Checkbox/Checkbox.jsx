import React from 'react'
import { Input } from 'reactstrap'
import { FormGroup } from '../../../atoms'

const Checkbox = ({ id, ...rest }) => {
  return (
    <FormGroup className='marLeft' {...rest}>
      <Input id={id} type='checkbox' {...rest} />
    </FormGroup>
  )
}

export default Checkbox
