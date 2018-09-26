
import { compose } from 'recompose'
import { withEither } from '@bowtie/react-utils'
import { ItemForm, EmptyState } from './ItemForm'

const emptyStateConditionFn = ({ match, activeItem }) => !match.params.item || !activeItem['fields']

export default compose(
  withEither(emptyStateConditionFn, EmptyState)
)(ItemForm)
