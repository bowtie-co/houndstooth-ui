import React from 'react'
import { Input } from 'reactstrap'
import { FormGroup } from '../../../atoms'

const Checkbox = ({ id, value, onChange, ...rest }) => {
  return (
    <FormGroup className='marLeft' {...rest}>
      <Input id={id} type='checkbox' checked={!!value} onClick={() => onChange({ target: { value: !value } })} {...rest} />
    </FormGroup>
  )
}

export default Checkbox
