import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withState } from 'recompose'

import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import { FormGroup } from 'atoms'

const DatePickerField = (props) => {
  const { value, name, onChange, focused, setFocused, ...rest } = props
  return (
    <FormGroup floatLabel {...rest}>
      <SingleDatePicker
        date={value ? moment(value) : ''} // momentPropTypes.momentObj or null
        placeholder={'MM/DD/YYYY'}
        onDateChange={(event) => onChange({ target: { value: event ? event.format('MM/DD/YYYY') : event } })} // PropTypes.func.isRequired
        focused={focused} // PropTypes.bool
        onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
        id={Date.now()} // PropTypes.string.isRequired,
        isOutsideRange={() => false}
        regular
        block
      />
    </FormGroup>
  )
}

DatePickerField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
}
export default withState('focused', 'setFocused', false)(DatePickerField)
