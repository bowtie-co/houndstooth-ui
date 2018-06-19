import React from 'react'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import { FormGroup } from '../../../atoms'
import 'rc-time-picker/assets/index.css'

const TimePickerField = ({ id, name, value, onChange, ...rest }) => {
  const selectedValue = typeof value === 'string' ? moment(value) : value

  return (
    <FormGroup id={id} {...rest}>
      <TimePicker
        showSecond={false}
        value={selectedValue ? moment.utc(selectedValue).local() : selectedValue}
        onChange={(value) => onChange({ target: { name, value } })}
        use12Hours
        allowEmpty
        {...rest}
      />
    </FormGroup>
  )
}

export default TimePickerField
