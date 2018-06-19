// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { 
  Input,
  Select,
  Button,
  Checkbox,
  DatePicker,
  TimePicker,
  MultiSelect,
  Radio,
  DocumentContainer 
} from './index'

const selectCondition = ({ type }) => type === 'select'
const buttonCondition = ({ type }) => type === 'button' || type === 'submit'
const checkboxCondition = ({ type }) => type === 'checkbox'
const datePickerCondition = ({ type }) => type === 'datepicker'
const timePickerCondition = ({ type }) => type === 'timepicker'
const multiSelectCondition = ({ type }) => type === 'multiselect'
const radioCondition = ({ type }) => type === 'radio'
const documentUploadCondition = ({ type }) => type === 'document'

export default compose(
  withEither(selectCondition, Select),
  withEither(buttonCondition, Button),
  withEither(checkboxCondition, Checkbox),
  withEither(datePickerCondition, DatePicker),
  withEither(timePickerCondition, TimePicker),
  withEither(multiSelectCondition, MultiSelect),
  withEither(radioCondition, Radio),
  withEither(documentUploadCondition, DocumentContainer)
)(Input)
