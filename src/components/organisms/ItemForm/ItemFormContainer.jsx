
import { compose } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import ItemForm from './ItemForm'

const nullConditionFn = ({ defaultFields }) => Object.keys(defaultFields).length === 0

export default compose(
  withMaybe(nullConditionFn)
)(ItemForm)
