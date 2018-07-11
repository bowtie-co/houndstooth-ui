import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import DateTime from './DateTime'
import 'react-datetime/css/react-datetime.css'
import Select from 'react-select'
import { endsWith } from '@bowtie/utils'

const DateTimeInputConfiguration = (props) => {
  const { type, onTypeChange } = props
  return (
    <div className='time-select' >
      <Select
        value={type}
        onChange={onTypeChange}
        clearable={false}
        options={[
          { value: 'date', label: 'date', selected: (type === 'date') },
          { value: 'time', label: 'time', selected: (type === 'time') },
          { value: 'datetime', label: 'datetime', selected: (type === 'datetime') }
        ]}
      />
      <DateTime {...props} />
    </div >
  )
}

export default compose(
  withState('type', 'changeType', ({ name }) => {
    if (endsWith(name, ['_date', '_on'])) return 'date'
    if (endsWith(name, ['_time', '_at'])) return 'time'

    return 'datetime'
  }),
  withHandlers({
    onTypeChange: ({ changeType }) => (type) => changeType(type.value),
    onTimeChange: ({ onChange }) => (event) => {
      const time = event.format('hh:mm A')
      onChange({ target: { value: time } })
    },
    onDateChange: ({ onChange }) => (event) => {
      const date = event.format('MM/DD/YYYY')
      onChange({ target: { value: date } })
    },
    onDateTimeChange: ({ onChange }) => (event) => {
      const datetime = event.format('MM/DD/YYYY hh:mm A')
      onChange({ target: { value: datetime } })
    }
  })
)(DateTimeInputConfiguration)
