import { compose, withHandlers, withState, withProps, withPropsOnChange } from 'recompose'
import { endsWith } from '@bowtie/utils'
import DateTimeSelect from './DateTimeSelect'
import DateTimeInput from './DateTimeInput'
import TimeInput from './TimeInput'
import DateInput from './DateInput'

export default compose(
  withState('type', 'changeType', ({ name }) => {
    if (endsWith(name, ['_date', '_on'])) return 'date'
    if (endsWith(name, ['_time', '_at'])) return 'time'
    return 'datetime'
  }),
  withProps(() => ({
    format: {
      date: 'MM/DD/YYYY',
      time: 'hh:mm A',
      datetime: 'MM/DD/YYYY hh:mm A'
    }
  })),
  withHandlers({
    onTypeChange: ({ changeType }) => (type) => changeType(type.value),
    onDateTimeChange: ({ onChange, format, type }) => (event) => onChange({ target: { value: event.format(format[type]) } })
  }),
  withPropsOnChange([ 'type' ], ({ type }) => {
    if (type === 'date') return { component: DateInput }
    if (type === 'time') return { component: TimeInput }
    if (type === 'datetime') return { component: DateTimeInput }
  })
)(DateTimeSelect)
