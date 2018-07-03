
import { compose } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import Collections from './Collections'

const nullConditionFn = ({ collections }) => collections.length === 0

export default compose(
  withMaybe(nullConditionFn)

)(Collections)
