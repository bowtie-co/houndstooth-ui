import React from 'react'
import { compose } from 'recompose'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import { withEither } from '@bowtie/react-utils'

const DateTimeInput = ({ field, fieldKey, onDateTimeChange }) =>
  <Datetime
    defaultValue={field || ''}
    inputProps={{ placeholder: fieldKey }}
    timeFormat
    dateFormat
    onChange={onDateTimeChange}
  />

const DateInput = ({ field, fieldKey, onDateChange }) =>
  <Datetime
    defaultValue={field || ''}
    inputProps={{ placeholder: fieldKey }}
    timeFormat={false}
    dateFormat
    onChange={onDateChange}
  />

const TimeInput = ({ field, fieldKey, onTimeChange }) =>
  <Datetime
    defaultValue={field || ''}
    inputProps={{ placeholder: fieldKey }}
    timeFormat
    dateFormat={false}
    onChange={onTimeChange}
  />

const isTimeConditionFn = (props) => props.type === 'time'
const isDateConditionFn = (props) => props.type === 'date'

export default compose(
  withEither(isTimeConditionFn, TimeInput),
  withEither(isDateConditionFn, DateInput)
)(DateTimeInput)
