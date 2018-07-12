import React from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { FormGroup } from '../../../atoms'

const DateInput = (props) => {
  const { value, name, onDateTimeChange, ...rest } = props
  return (
    <FormGroup floatLabel {...rest}>
      <Datetime
        defaultValue={value || ''}
        inputProps={{ placeholder: name }}
        timeFormat={false}
        dateFormat
        onChange={onDateTimeChange}
      />
    </FormGroup>
  )
}
export default DateInput
