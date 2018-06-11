import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FormGroup, Label, FormText } from 'reactstrap'

const dateFormat = 'MM/DD/YYYY'

const allowedDateInputFormats = [
  'DDMMMMY',
  'MMMMDDY',
  'MMDDY',
  'DDMMY'
]

const DatePickerField = ({ id, label, col, validate, helper, errorMessage, selected, onChange, value, onDateBlur, min = 90, max = 30, ...props }) => {
  let selectedValue = typeof selected === 'string' ? moment(selected) : (selected || null)

  if (selectedValue !== null && (!selectedValue._isAMomentObject || !selectedValue._isValid)) {
    selectedValue = null
  }
  return (
    <FormGroup>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label for={id} className={`form-group has-float-label ${props.required ? 'required' : 'optional'}`}>
        <DatePicker
          id={id}
          className='form-control'
          selected={selectedValue}
          onChange={(date) => {
            props.name && onChange({ target: { name: props.name, value: date } })
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
            onChange({ target: { name: props.name, value: parsedDate } })
          }}
          {...props}
        />
        <span>{label}</span>
      </Label>
      <FormText>
        { errorMessage }
      </FormText>
    </FormGroup>
  )
}

export default DatePickerField
