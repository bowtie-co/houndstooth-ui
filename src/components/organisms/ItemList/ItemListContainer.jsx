
import { compose } from 'recompose'
import { withMaybe, withEither } from '@bowtie/react-utils'
import ItemList, { EmptyState } from './ItemList'

const nullConditionFn = ({ items }) => !items
const emptyListConditionalFn = ({ items }) => items.length === 0

export default compose(
  withMaybe(nullConditionFn),
  withEither(emptyListConditionalFn, EmptyState)
)(ItemList)
