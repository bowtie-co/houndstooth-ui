import React from 'react'
import PropTypes from 'prop-types'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { FormGroup } from 'atoms'

const DateInput = (props) => {
  const { value, name, onDateTimeChange, ...rest } = props
  console.log('====================================')
  console.log('date value:', value)
  console.log('====================================')
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

DateInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onDateTimeChange: PropTypes.func
}
export default DateInput
