// Containers should include all logic that enhances a component
// this includes any reduce methods, recompose, or middleware.

import { compose } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { endsWith } from '@bowtie/utils'
import { withFormatting } from 'helpers'
import Input from './Input'
import Select from './Select'
import Checkbox from './Checkbox'
import ColorPicker from './ColorPicker'
import FileUpload from './FileUpload'
import MultiSelect from './MultiSelect'
import Radio from './Radio'
import PhoneInput from './PhoneInput'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import ImageUpload from './ImageUpload'
import TextArea from './TextArea'

// const buttonCondition = ({ type }) => type === 'button' || type === 'submit'

// const nullConditionFn = ({ name }) => !name;

const isFileConditionFn = ({ type, name }) => endsWith(name, '_path') || type === 'file'
const isColorConditionFn = ({ type, name }) => [ 'color' ].includes(name) || endsWith(name, '_color') || type === 'color'
const checkboxCondition = ({ type, name, value }) => typeof value === 'boolean' || endsWith(name, '_boolean') || type === 'checkbox'
const radioCondition = ({ type }) => type === 'radio'
const selectCondition = ({ type }) => type === 'select'
const multiSelectCondition = ({ type, value }) => (Array.isArray(value) && (value.length === 0 || typeof value[0] === 'string')) || type === 'multiselect'
const phoneCondition = ({ type }) => type === 'phone'
const datePickerCondition = ({ type, name }) => [ 'date' ].includes(name) || endsWith(name, ['_date', '_on']) || type === 'datepicker' || type === 'date'
const timePickerCondition = ({ type, name }) => [ 'time' ].includes(name) || endsWith(name, ['_time', '_at']) || type === 'timepicker' || type === 'time'
const imageUploadCondition = ({ type }) => type === 'image'
const textAreaCondition = ({ type, name }) => [ 'text', 'content', 'body' ].includes(name) || endsWith(name, ['_body', '_textarea']) || type === 'text' || type === 'textarea'

export default compose(
  withFormatting,
  withEither(selectCondition, Select),
  withEither(checkboxCondition, Checkbox),
  withEither(multiSelectCondition, MultiSelect),
  withEither(radioCondition, Radio),
  withEither(isColorConditionFn, ColorPicker),
  withEither(isFileConditionFn, FileUpload),
  withEither(phoneCondition, PhoneInput),
  withEither(datePickerCondition, DatePicker),
  withEither(timePickerCondition, TimePicker),
  withEither(imageUploadCondition, ImageUpload),
  withEither(textAreaCondition, TextArea)
)(Input)
