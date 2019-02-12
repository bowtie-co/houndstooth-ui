import React from 'react'
import PropTypes from 'prop-types'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { FormGroup } from 'atoms'

const TimePickerField = (props) => {
  const { value, onDateTimeChange, onChange, ...rest } = props
  return (
    <FormGroup floatLabel {...rest}>
      <Datetime
        value={value || ''}
        inputProps={{ placeholder: rest['name'] }}
        timeFormat
        dateFormat={false}
        onChange={(event) => onChange({ target: { value: event ? event.format('hh:mm A') : event } })}
        {...rest}
      />
    </FormGroup>
  )
}

TimePickerField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onDateTimeChange: PropTypes.func
}

export default TimePickerField
