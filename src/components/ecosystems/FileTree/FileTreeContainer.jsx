
import { compose } from 'recompose'
import { withMaybe } from '@bowtie/react-utils'
import FileTree from './FileTree'

const nullConditionFn = ({ dirList }) => dirList.length === 0

export default compose(
  withMaybe(nullConditionFn)

)(FileTree)
