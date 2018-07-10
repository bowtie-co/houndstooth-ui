import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FormGroup } from '../../../atoms'
import 'react-datepicker/dist/react-datepicker.css'

const dateFormat = 'MM/DD/YYYY'

const allowedDateInputFormats = [
  'DDMMMMY',
  'MMMMDDY',
  'MMDDY',
  'DDMMY'
]

const DatePickerField = ({ id, col, value, onChange, name, onDateBlur, min = 90, max = 30, ...rest }) => {
  let selectedValue = typeof value === 'string' ? moment(value) : (value || null)

  if (selectedValue !== null && (!selectedValue._isAMomentObject || !selectedValue._isValid)) {
    selectedValue = null
  }
  console.log("selectedValue", selectedValue)
  return (
    <FormGroup id={id} {...rest}>
      <DatePicker
        id={id}
        className='form-control'
        selected={selectedValue}
        onChange={(date) => {
          name && onChange({ target: { name, value: date } })
        }}
        dateFormat={dateFormat}
        placeholderText={dateFormat}
        minDate={moment().subtract(min, 'year')}
        maxDate={moment().add(max, 'year')}
        showMonthDropdown
        showYearDropdown
        scrollableMonthYearDropdown
        dropdownMode='select'
        onBlur={(e) => {
          const parsedDate = moment(e.target.value, allowedDateInputFormats)
          onChange({ target: { name, value: parsedDate } })
        }}
        {...rest}
      />
    </FormGroup>
  )
}

export default DatePickerField
