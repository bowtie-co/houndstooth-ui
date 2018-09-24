import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FormGroup } from 'atoms'
import 'react-datepicker/dist/react-datepicker.css'

const dateFormat = 'MM/DD/YYYY'

const allowedDateInputFormats = [
  'DDMMMMY',
  'MMMMDDY',
  'MMDDY',
  'DDMMY'
]

const DatePickerField = ({ col, selected, onChange, name, value, onDateBlur, min = 90, max = 30, edited, className = '', ...rest }) => {
  let selectedValue = typeof selected === 'string' ? moment(selected) : (selected || null)

  if (selectedValue !== null && (!selectedValue._isAMomentObject || !selectedValue._isValid)) {
    selectedValue = null
  }
  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <DatePicker
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
