
import { compose } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import ItemForm from './ItemForm'

const nullConditionFn = ({ match, activeItem }) => !match.params.item || !activeItem['fields']

export default compose(
  withMaybe(nullConditionFn)
)(ItemForm)
