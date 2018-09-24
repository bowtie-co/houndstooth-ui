import { compose } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import FormGroup from './FormGroup'
import SelectFormGroup from './SelectFormGroup'

const selectGroupConditionFn = ({ type }) => type === 'select' || type === 'multiselect'

export default compose(
  withEither(selectGroupConditionFn, SelectFormGroup)
)(FormGroup)
