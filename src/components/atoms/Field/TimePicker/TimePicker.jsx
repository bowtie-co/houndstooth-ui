import React from 'react'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import { Label } from 'reactstrap'
import 'rc-time-picker/assets/index.css'

const TimePickerField = ({ id, name, label, value, validate, helper, errorMessage, onChange, ...props }) => {
  const selectedValue = typeof value === 'string' ? moment(value) : value

  return (
    <div>
      {helper ? <p className='helpertext'>{helper}</p> : ''}
      <Label for={id}>
        <TimePicker
          showSecond={false}
          value={selectedValue ? moment.utc(selectedValue).local() : selectedValue}
          onChange={(value) => onChange({ target: { name, value } })}
          use12Hours
          allowEmpty
          {...props}
        />
        <span>{label}</span>
      </Label>
    </div>
  )
}

export default TimePickerField
